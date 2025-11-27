"""Funções e rotas relacionadas com autenticação de utilizadores."""

# Importa módulos padrão de tempo e utilitários
from datetime import datetime, timedelta, timezone
import secrets
from urllib.parse import urljoin

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
from email_utils import EmailDeliveryError, send_email
from models import User, AccountDeletionRequest
from schemas import (
    UserCreate,
    UserRead,
    UserLogin,
    UserUpdate,
    PaymentStatusUpdate,
    PasswordForgotRequest,
    PasswordResetRequest,
    AccountConfirmationRequest,
    ACCOUNT_DELETION_ALLOWED_STATUSES,
)

# Importa configuração partilhada
from settings import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ALGORITHM,
    IS_DEV,
    SECRET_KEY,
    FRONTEND_URL,
)

# ───────────────────────────── Router ─────────────────────────────
router = APIRouter(prefix="/auth", tags=["Auth"])

# Endereço de suporte utilizado para receber pedidos sensíveis
SUPPORT_EMAIL = "clientemisterio.suporte@gmail.com"

# ─────────────── Segurança / Configuração ─────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Instância do esquema OAuth2 para permitir "Authorize" na documentação
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token", auto_error=False)

# Tempo padrão de expiração do token de recuperação de password
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES = 60

# Conjunto de estados ativos que impedem novos pedidos de eliminação
ACTIVE_DELETION_STATUSES = ACCOUNT_DELETION_ALLOWED_STATUSES.intersection({"pending", "in_progress"})

# URL base do frontend utilizada para construir links enviados nos e-mails
_frontend_env = (FRONTEND_URL or "").strip()
FRONTEND_BASE_URL = _frontend_env.rstrip("/") if _frontend_env else "https://clientemisterio.com"

# Número máximo de bytes suportados pelo bcrypt (limite de segurança da biblioteca)
MAX_BCRYPT_PASSWORD_BYTES = 72


def generate_secure_token() -> str:
    """Gera um token aleatório seguro para confirmação ou redefinição."""
    return secrets.token_urlsafe(48)


def build_frontend_link(path: str) -> str:
    """Constrói um link absoluto para o frontend com base no caminho recebido."""
    return urljoin(f"{FRONTEND_BASE_URL}/", path.lstrip("/"))


def send_confirmation_email(user: User) -> None:
    """Envia o e-mail com o link de confirmação de conta."""
    confirmation_link = build_frontend_link(f"confirmar-conta/{user.confirmation_token}")
    subject = "Confirme a sua conta Cliente Mistério"
    body = (
        f"Olá {user.name},\n\n"
        "Obrigado por se registar na plataforma Cliente Mistério. "
        "Para ativar a sua conta, confirme o endereço de e-mail através do link seguinte:\n\n"
        f"{confirmation_link}\n\n"
        "Se não efetuou este registo, ignore esta mensagem."
    )
    send_email(subject=subject, body=body, to=user.email)


def send_password_reset_email(user: User) -> None:
    """Envia o e-mail com o link para redefinir a palavra-passe."""
    reset_link = build_frontend_link(f"entrar/redefinir-password/{user.reset_token}")
    subject = "Redefinição da palavra-passe Cliente Mistério"
    body = (
        f"Olá {user.name},\n\n"
        "Foi solicitado um pedido para redefinir a palavra-passe da sua conta. "
        "Caso tenha sido você, utilize o link abaixo nas próximas horas:\n\n"
        f"{reset_link}\n\n"
        "Se não reconhece este pedido, ignore este e-mail."
    )
    send_email(subject=subject, body=body, to=user.email)


def send_account_deletion_request_email(user: User) -> None:
    """Envia para o suporte o aviso de que o utilizador pediu para eliminar a conta."""

    body = (
        "Foi recebido um pedido para eliminar a conta de um utilizador.\n\n"
        f"ID do utilizador: {user.id}\n"
        f"Nome: {user.name}\n"
        f"Email: {user.email}\n"
    )

    send_email(
        subject="Pedido de eliminação de conta",
        body=body,
        to=SUPPORT_EMAIL,
    )


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
def ensure_password_length(password: str) -> None:
    """Garante que a palavra-passe não excede o limite de 72 bytes imposto pelo bcrypt."""

    # Converte para bytes UTF-8 para contabilizar corretamente acentos e caracteres especiais
    if len(password.encode("utf-8")) > MAX_BCRYPT_PASSWORD_BYTES:
        raise HTTPException(
            status_code=400,
            detail="Password demasiado longa (máximo 72 bytes). Reduza o tamanho ou simplifique caracteres acentuados.",
        )


def get_password_hash(password: str) -> str:
    """Gera o hash para a palavra-passe fornecida."""
    ensure_password_length(password)
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara palavra-passe em texto com o respetivo hash."""
    ensure_password_length(plain_password)
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Cria um token JWT com dados e tempo de expiração definidos."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Decodifica um token JWT e valida a assinatura e expiração."""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)) from exc


def get_user_by_email(db: Session, email: str) -> User | None:
    """Procura utilizador pelo e-mail em lowercase."""
    return db.query(User).filter(User.email == email.lower()).first()


def authenticate_credentials(db: Session, email: str, password: str) -> User:
    """Valida e devolve utilizador autenticado ou lança erro 400."""
    user = get_user_by_email(db, email)
    if user is None or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")

    if not user.is_confirmed:
        raise HTTPException(status_code=403, detail="Conta ainda não confirmada")

    return user


def create_login_response(user: User, response: Response) -> dict:
    """Gera token JWT + refresh cookie (se necessário)."""

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email}, expires_delta=access_token_expires
    )

    clear_auth_cookie(response)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=int(access_token_expires.total_seconds()),
        secure=not IS_DEV,
        samesite="lax",
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": int(access_token_expires.total_seconds()),
    }


def clear_auth_cookie(response: Response) -> None:
    """Remove cookie de autenticação (para logout)."""
    response.delete_cookie(key="access_token")


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    """Obtém utilizador autenticado a partir do token JWT."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if token is None:
        raise credentials_exception

    payload = decode_access_token(token)
    user_id: str | None = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception

    return user


def get_current_user_optional(
    db: Session = Depends(get_db), token: str | None = Depends(oauth2_scheme)
) -> User | None:
    """Obtém o utilizador autenticado se existir, caso contrário devolve None."""
    if token is None:
        return None
    try:
        return get_current_user(db, token)
    except HTTPException as exc:
        if exc.status_code == status.HTTP_401_UNAUTHORIZED:
            return None
        raise


def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """Garante que o utilizador autenticado tem privilégios de administrador."""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso reservado a administradores",
        )
    return current_user


def get_current_admin_optional(
    current_user: User | None = Depends(get_current_user_optional),
) -> User | None:
    """Permite acesso opcional e valida privilégios apenas quando o utilizador existe."""

    if current_user is None:
        return None

    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso reservado a administradores",
        )

    return current_user

# ───────────────────────────── Rotas ──────────────────────────────
@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Cria um novo utilizador.
    Regras:
      - email em lowercase
      - password >= 6 chars
      - email único
      - envio obrigatório de e-mail de confirmação
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
        is_confirmed=False,
        confirmation_token=generate_secure_token(),
        confirmation_sent_at=datetime.now(timezone.utc),
    )
    db.add(user)

    try:
        db.flush()
        send_confirmation_email(user)
    except EmailDeliveryError as exc:
        # Em caso de falha no envio cancela o registo para manter consistência
        db.rollback()
        print(f"Erro ao enviar email de confirmação: {exc}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Não foi possível enviar o e-mail de confirmação. Tente novamente mais tarde.",
        )
    except Exception as exc:  # garante rollback em erros inesperados
        db.rollback()
        print(f"Erro inesperado ao registar utilizador: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ocorreu um erro ao registar o utilizador.",
        )

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

    # Atualiza a palavra-passe apenas quando o pedido inclui ambos os campos
    if user_in.new_password is not None:
        if not user_in.current_password:
            raise HTTPException(
                status_code=400,
                detail="É necessário indicar a password atual para a alterar.",
            )
        if not verify_password(user_in.current_password, current_user.password_hash):
            raise HTTPException(status_code=400, detail="Password atual incorreta")
        current_user.password_hash = get_password_hash(user_in.new_password)

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/password/forgot")
def password_forgot(request_in: PasswordForgotRequest, db: Session = Depends(get_db)):
    """Recebe um email, gera token de recuperação e envia instruções."""
    user = get_user_by_email(db, request_in.email)
    if user is None:
        raise HTTPException(status_code=400, detail="Email não encontrado")

    user.reset_token = generate_secure_token()
    user.reset_token_expire_at = datetime.now(timezone.utc) + timedelta(
        minutes=PASSWORD_RESET_TOKEN_EXPIRE_MINUTES
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    send_password_reset_email(user)
    return {"message": "Instruções enviadas para o e-mail"}


@router.post("/password/reset")
def password_reset(request_in: PasswordResetRequest, db: Session = Depends(get_db)):
    """Valida token de recuperação e define nova password."""

    user = db.query(User).filter(User.reset_token == request_in.token).first()
    if user is None:
        raise HTTPException(status_code=400, detail="Token inválido")

    if user.reset_token_expire_at is None or user.reset_token_expire_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Token expirado")

    user.password_hash = get_password_hash(request_in.password)
    user.reset_token = None
    user.reset_token_expire_at = None

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Password atualizada"}


@router.post("/confirm")
def confirm_account(data: AccountConfirmationRequest, db: Session = Depends(get_db)):
    """Confirma a conta utilizando o token enviado por e-mail."""
    user = db.query(User).filter(User.confirmation_token == data.token).first()
    if user is None:
        raise HTTPException(status_code=400, detail="Token inválido")

    user.is_confirmed = True
    user.confirmation_token = None
    user.confirmed_at = datetime.now(timezone.utc)

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Conta confirmada"}


@router.get("/admin/users", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    """Lista todos os utilizadores (apenas para administradores)."""
    return db.query(User).all()


@router.put("/admin/users/{user_id}/payment-status")
def update_payment_status(
    user_id: int,
    data: PaymentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    """Atualiza estado do pagamento de um utilizador (apenas admin)."""

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")

    user.payment_status = data.payment_status
    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.get("/deletion/status")
def get_deletion_status(current_user: User = Depends(get_current_user)):
    """Devolve o estado atual do pedido de eliminação de conta."""

    request = (
        current_user.account_deletion_requests[-1]
        if current_user.account_deletion_requests
        else None
    )

    if request is None:
        return {"status": "none"}

    if request.status in ACTIVE_DELETION_STATUSES:
        return {"status": request.status}

    return {"status": "completed"}


@router.post("/deletion/request")
def request_account_deletion(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Cria um pedido de eliminação de conta e notifica o suporte."""

    if current_user.account_deletion_requests:
        last_request = current_user.account_deletion_requests[-1]
        if last_request.status in ACTIVE_DELETION_STATUSES:
            raise HTTPException(
                status_code=400,
                detail="Já existe um pedido de eliminação em processamento",
            )

    deletion_request = AccountDeletionRequest(user_id=current_user.id, status="pending")

    db.add(deletion_request)
    db.commit()
    db.refresh(deletion_request)

    send_account_deletion_request_email(current_user)

    return deletion_request


@router.post("/deletion/cancel")
def cancel_account_deletion(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Cancela o pedido de eliminação ativo, se existir."""

    if not current_user.account_deletion_requests:
        raise HTTPException(status_code=400, detail="Não existe pedido de eliminação para cancelar")

    last_request = current_user.account_deletion_requests[-1]
    if last_request.status not in ACTIVE_DELETION_STATUSES:
        raise HTTPException(status_code=400, detail="Não existe pedido de eliminação ativo")

    last_request.status = "cancelled"

    db.add(last_request)
    db.commit()
    db.refresh(last_request)

    return last_request


@router.put("/admin/deletion/{request_id}")
def update_account_deletion(
    request_id: int,
    data: PaymentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    """Atualiza estado de pedidos de eliminação de conta (apenas admin)."""

    deletion_request = db.query(AccountDeletionRequest).filter(AccountDeletionRequest.id == request_id).first()
    if deletion_request is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")

    deletion_request.status = data.payment_status

    db.add(deletion_request)
    db.commit()
    db.refresh(deletion_request)

    return deletion_request
