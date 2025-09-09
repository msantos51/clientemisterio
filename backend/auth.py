# auth.py
import os
from datetime import datetime, timedelta, timezone

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Header,
    Request,
    Response,
    status,
)
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError

from database import SessionLocal
from models import User
from schemas import UserCreate, UserRead, UserLogin, UserUpdate

# ───────────────────────────── Router ─────────────────────────────
router = APIRouter(prefix="/auth", tags=["Auth"])

# ─────────────── Segurança / Configuração de ambiente ─────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ENV = os.getenv("ENV", "prod").lower()  # "dev" | "prod"
IS_DEV = ENV in {"dev", "development", "local"}

SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_ME")
# Em produção, falhar cedo se não estiver definida
if (not SECRET_KEY or SECRET_KEY == "CHANGE_ME") and not IS_DEV:
    raise RuntimeError("SECRET_KEY não definida nas variáveis de ambiente.")

# Em DEV, permite chave fallback explícita (apenas para testes)
if IS_DEV and (not SECRET_KEY or SECRET_KEY == "CHANGE_ME"):
    SECRET_KEY = "DEV_ONLY__CHANGE_ME_IN_PROD"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# ─────────────────────────── DB dependency ─────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ───────────────────────────── Helpers ─────────────────────────────
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

def extract_bearer(authorization: str | None) -> str | None:
    if authorization and authorization.lower().startswith("bearer "):
        return authorization.split(" ", 1)[1].strip()
    return None

def set_auth_cookie(response: Response, access_token: str, max_age_seconds: int) -> None:
    """
    Configura cookie cross-site em PROD e permissivo em DEV.
    - Em PROD: Secure + SameSite=None (requer HTTPS)
    - Em DEV:  Secure=False + SameSite=Lax (para localhost http)
    """
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=not IS_DEV,                          # True em PROD, False em DEV
        samesite="none" if not IS_DEV else "lax",   # None em PROD, Lax em DEV
        max_age=max_age_seconds,
        path="/",
    )

def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie("access_token", path="/")

# ───────────── Dependência de utilizador autenticado ──────────────
def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    authorization: str | None = Header(default=None),
) -> User:
    """
    Aceita token via:
      1) Header: Authorization: Bearer <token>
      2) Cookie: access_token
    """
    token = extract_bearer(authorization) or request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token não encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(token)
    user_id: str | None = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token sem subject",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.get(User, int(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Utilizador não existe",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# ───────────────────────────── Rotas ──────────────────────────────
@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Cria um novo utilizador.
    Regras:
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
def login(user_in: UserLogin, response: Response, db: Session = Depends(get_db)):
    """
    Valida credenciais e devolve:
    { access_token, token_type, expires_in }
    Também define cookie 'access_token' (httponly), se o frontend usar credentials: 'include'.
    """
    email = user_in.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": str(user.id)}, expires)

    # Cookie (opcional; só é útil se o frontend fizer fetch(..., credentials: 'include'))
    set_auth_cookie(response, access_token, max_age_seconds=int(expires.total_seconds()))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": int(expires.total_seconds()),
    }

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response):
    """Limpa o cookie de sessão (se estiveres a usar cookies)."""
    clear_auth_cookie(response)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

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
