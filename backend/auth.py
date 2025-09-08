# auth.py
import os
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError

from database import SessionLocal
from models import User
from schemas import UserCreate, UserRead, UserLogin, UserUpdate

router = APIRouter(prefix="/auth", tags=["auth"])

# ── Segurança / Config ─────────────────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_ME")
if not SECRET_KEY or SECRET_KEY == "CHANGE_ME":
    # Falhar cedo em produção evita tokens inválidos/iguais entre deploys
    raise RuntimeError("SECRET_KEY não definida nas variáveis de ambiente.")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")  # para extrair Bearer token

# ── DB dependency ──────────────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ── Helpers ───────────────────────────────────────────────────────────────────
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Dependência que retorna o utilizador autenticado (ou 401)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_access_token(token)
    user_id: str | None = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token sem subject",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).get(int(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Utilizador não existe",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# ── Rotas ─────────────────────────────────────────────────────────────────────
@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Cria um novo utilizador. Regras:
    - email em lowercase
    - password >= 6 chars
    - email único
    """
    email = user_in.email.strip().lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email já registado")

    if len(user_in.password) < 6:
        raise HTTPException(status_code=400, detail="Password demasiado curta (>= 6)")

    user = User(
        name=user_in.name.strip(),
        email=email,
        password_hash=get_password_hash(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login")
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    """
    Valida credenciais e devolve:
    { access_token, token_type, expires_in }
    """
    email = user_in.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(user_in.password, user.password_hash):
        # 401 para fluxo de auth com WWW-Authenticate
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": str(user.id)}, expires)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": int(expires.total_seconds()),
    }

@router.get("/me", response_model=UserRead)
def me(current_user: User = Depends(get_current_user)):
    """Devolve o utilizador atual (para validar sessão no frontend)."""
    return current_user


@router.put("/me", response_model=UserRead)
def update_me(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Atualiza os dados do utilizador autenticado."""

    # Atualiza o nome, se fornecido
    if user_in.name is not None:
        current_user.name = user_in.name.strip()

    # Atualiza o e-mail, se fornecido
    if user_in.email is not None:
        email = user_in.email.strip().lower()
        # Verifica se o novo e-mail já está em uso por outro utilizador
        if db.query(User).filter(User.email == email, User.id != current_user.id).first():
            raise HTTPException(status_code=400, detail="Email já registado")
        current_user.email = email

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
