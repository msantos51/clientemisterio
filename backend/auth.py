# auth.py
import os
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt

# ✅ imports absolutos (sem o ponto)
from database import SessionLocal
from models import User
from schemas import UserCreate, UserRead, UserLogin

# Router que agrupa as rotas de autenticação
router = APIRouter(prefix="/auth", tags=["auth"])

# Contexto usado para gerar e validar hashes de palavra-passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Chave secreta usada para assinar os tokens (definida em variáveis de ambiente)
SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_ME")
# Algoritmo utilizado para assinar os tokens
ALGORITHM = "HS256"
# Duração padrão dos tokens de acesso
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Dependência que fornece uma sessão de base de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Função que cria um token JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Rota que cria um novo utilizador
@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user_in.password)
    user = User(name=user_in.name, email=user_in.email, password_hash=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Rota que valida as credenciais e devolve um token
@router.post("/login")
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not pwd_context.verify(user_in.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        {"sub": str(user.id)},
        timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "token_type": "bearer"}
