"""Funções e rotas relacionadas com autenticação de utilizadores."""

# Importa módulos padrão de sistema e tempo
import os
from datetime import datetime, timedelta, timezone

# Importa classes e funções do FastAPI para gerir requests e respostas
from fastapi import (
    APIRouter,
    Depends,
    Form,
    HTTPException,
    Header,
    Request,
    Response,
    status,
)
# Importa sessão do SQLAlchemy para interações com a base de dados
from sqlalchemy.orm import Session
# Importa utilitário de hashing de palavras-passe
from passlib.context import CryptContext
# Importa biblioteca para criação e validação de tokens JWT
from jose import jwt, JWTError

# Importa classe de segurança do FastAPI para suporte a OAuth2
from fastapi.security import OAuth2PasswordBearer

# Importa utilitários e modelos internos
from database import SessionLocal
from models import User
from schemas import (
    UserCreate,
    UserRead,
    UserLogin,
    UserUpdate,
    PaymentStatusUpdate,
)

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

# Instância do esquema OAuth2 para permitir "Authorize" na documentação
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token", auto_error=False)


class OAuth2EmailRequestForm:
    """Formulário OAuth2 que utiliza o campo 'email' em vez de 'username'."""

    def __init__(
        self,
        email: str = Form(...),
        password: str = Form(...),
        scope: str = Form(""),
        client_id: str | None = Form(None),
        client_secret: str | None = Form(None),
    ) -> None:
        # Email do utilizador
        self.email = email
        # Palavra-passe do utilizador
        self.password = password
        # Escopos separados por espaço
        self.scopes = scope.split()
        # Identificador opcional do cliente OAuth
        self.client_id = client_id
        # Segredo opcional do cliente OAuth
        self.client_secret = client_secret


# ─────────────────────────── DB dependency ─────────────────────────
def get_db():
    """Cria e fornece uma sessão de base de dados por request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ───────────────────────────── Helpers ─────────────────────────────
def get_password_hash(password: str) -> str:
    """Gera o hash para a palavra-passe fornecida."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara palavra-passe em texto com o respetivo hash."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Cria um token JWT com dados e tempo de expiração definidos."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict:
    """Decodifica e valida um token JWT retornando o payload."""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

def extract_bearer(authorization: str | None) -> str | None:
    """Extrai o token do cabeçalho Authorization se for do tipo Bearer."""
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
    """Remove o cookie de autenticação do cliente."""
    response.delete_cookie("access_token", path="/")


def authenticate_credentials(db: Session, email: str, password: str) -> User:
    """Valida credenciais e devolve o utilizador autenticado."""
    email = email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def create_login_response(user: User, response: Response) -> dict:
    """Gera token e configura cookie para o utilizador autenticado."""
    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": str(user.id)}, expires)
    set_auth_cookie(response, access_token, max_age_seconds=int(expires.total_seconds()))
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": int(expires.total_seconds()),
    }

# ───────────── Dependência de utilizador autenticado ──────────────
def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    authorization: str | None = Header(default=None),
    token: str | None = Depends(oauth2_scheme),
) -> User:
    """
    Aceita token via:
      1) Header: Authorization: Bearer <token>
      2) Cookie: access_token
    """
    token = token or extract_bearer(authorization) or request.cookies.get("access_token")
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
    user = authenticate_credentials(db, user_in.email, user_in.password)
    return create_login_response(user, response)


@router.post("/token")
def login_token(
    response: Response,

    form_data: OAuth2EmailRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """Recebe email e password e devolve token para uso nas rotas protegidas."""
    user = authenticate_credentials(db, form_data.email, form_data.password)

    return create_login_response(user, response)

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


@router.put("/users/{user_id}/payment", response_model=UserRead)
def update_payment_status(
    user_id: int,
    payment_in: PaymentStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Altera manualmente o estado de pagamento de um utilizador."""
    # Procura o utilizador pelo identificador fornecido
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")

    # Atualiza o campo de pagamento com o novo valor
    user.has_paid = payment_in.has_paid

    # Guarda a alteração na base de dados
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
