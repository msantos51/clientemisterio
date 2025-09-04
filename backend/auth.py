# auth.py
import os
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from .database import SessionLocal
from .models import User
from .schemas import UserCreate, UserRead, UserLogin

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
    # Cria uma nova sessão
    db = SessionLocal()
    try:
        # Entrega a sessão ao chamador
        yield db
    finally:
        # Fecha a sessão após utilização
        db.close()

# Função que cria um token JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    # Copia os dados para evitar alterações externas
    to_encode = data.copy()
    # Calcula o momento de expiração
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    # Adiciona o campo de expiração
    to_encode.update({"exp": expire})
    # Codifica os dados num token JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Rota que cria um novo utilizador
@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Verifica se já existe utilizador com o mesmo e-mail
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    # Gera o hash da palavra-passe
    hashed_password = pwd_context.hash(user_in.password)
    # Cria a instância do utilizador
    user = User(name=user_in.name, email=user_in.email, password_hash=hashed_password)
    # Adiciona e confirma o novo utilizador na base de dados
    db.add(user)
    db.commit()
    db.refresh(user)
    # Devolve o utilizador sem a palavra-passe
    return user

# Rota que valida as credenciais e devolve um token
@router.post("/login")
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    # Procura o utilizador pelo e-mail
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    # Verifica se a palavra-passe corresponde ao hash
    if not pwd_context.verify(user_in.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    # Gera o token de acesso com o ID do utilizador
    access_token = create_access_token({"sub": str(user.id)}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    # Devolve o token e o tipo
    return {"access_token": access_token, "token_type": "bearer"}
