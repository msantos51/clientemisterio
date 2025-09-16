"""Funções e rotas relacionadas com autenticação de utilizadores."""

# Importa módulos padrão de tempo
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
from email_utils import send_email
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


def delete_user_account(db: Session, user: User | int, *, commit: bool = True) -> None:
    """Remove definitivamente a conta do utilizador e confirma a operação na base de dados."""

    # Aceita o objeto completo ou apenas o identificador numérico
    instance = user if isinstance(user, User) else db.get(User, int(user))

    if not instance:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Utilizador não encontrado")

    # Desassocia pedidos de eliminação para manter o histórico após remover a conta
    db.query(AccountDeletionRequest).filter(AccountDeletionRequest.user_id == instance.id).update(
        {"user_id": None},
        synchronize_session=False,
    )

    db.delete(instance)

    if commit:
        db.commit()
    else:
        db.flush()


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
    if not user.is_confirmed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Conta ainda não confirmada. Verifique o e-mail de confirmação.",
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

    if not user.is_confirmed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Conta ainda não confirmada. Verifique o e-mail enviado no registo.",
        )

    return user


def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """Garante que o utilizador autenticado tem privilégios de administrador."""
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
    except Exception as exc:  # em caso de falha no envio cancela o registo
        db.rollback()
        print(f"Erro ao enviar email de confirmação: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível enviar o e-mail de confirmação. Tente novamente.",
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


@router.put("/me/payment", response_model=UserRead)
def update_my_payment_status(
    payment_in: PaymentStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Atualiza o estado de pagamento do utilizador autenticado."""
    # Define o novo estado de pagamento com base na informação recebida
    current_user.has_paid = payment_in.has_paid

    # Guarda a alteração na base de dados
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/me/delete-request", status_code=status.HTTP_202_ACCEPTED)
def request_account_deletion(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    """Regista o pedido de eliminação de conta e notifica o suporte."""

    # Verifica se o utilizador já tem um pedido ativo
    existing_request = (
        db.query(AccountDeletionRequest)
        .filter(
            AccountDeletionRequest.user_id == current_user.id,
            AccountDeletionRequest.status.in_(ACTIVE_DELETION_STATUSES),
        )
        .first()
    )
    if existing_request:
        return {
            "message": "Já existe um pedido de eliminação em análise. Receberá novidades em breve."
        }

    deletion_request = AccountDeletionRequest(
        user_id=current_user.id,
        user_id_snapshot=current_user.id,
        user_name_snapshot=current_user.name.strip(),
        user_email_snapshot=current_user.email.strip(),
    )
    db.add(deletion_request)

    try:
        db.flush()
        send_account_deletion_request_email(current_user)
    except Exception as exc:
        db.rollback()
        print(f"Erro ao enviar email de eliminação: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível enviar o pedido de eliminação. Tente novamente mais tarde.",
        ) from exc

    db.commit()
    db.refresh(deletion_request)

    return {"message": "Pedido de eliminação registado. Entraremos em contacto em breve."}



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


@router.post("/password/forgot", status_code=status.HTTP_202_ACCEPTED)
def request_password_reset(
    payload: PasswordForgotRequest, db: Session = Depends(get_db)
) -> dict[str, str]:
    """Gera um token de redefinição e envia o respetivo e-mail."""
    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()

    if user and user.is_confirmed:
        user.reset_token = generate_secure_token()
        user.reset_token_expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=PASSWORD_RESET_TOKEN_EXPIRE_MINUTES
        )
        db.add(user)
        db.commit()
        try:
            send_password_reset_email(user)
        except Exception as exc:
            print(f"Erro ao enviar email de recuperação: {exc}")
            # Mesmo que o envio falhe, mantém o token para permitir nova tentativa

    # Resposta neutra para evitar divulgar existência da conta
    return {"message": "Se o email existir, receberá instruções para redefinir a password."}


@router.post("/password/reset")
def reset_password(
    payload: PasswordResetRequest, db: Session = Depends(get_db)
) -> dict[str, str]:
    """Valida o token recebido e atualiza a palavra-passe do utilizador."""
    user = db.query(User).filter(User.reset_token == payload.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Token inválido")

    if not user.reset_token_expires_at:
        raise HTTPException(status_code=400, detail="Token inválido")

    if user.reset_token_expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Token expirado")

    user.password_hash = get_password_hash(payload.new_password)
    user.reset_token = None
    user.reset_token_expires_at = None
    db.add(user)
    db.commit()
    return {"message": "Password atualizada com sucesso."}


@router.post("/confirm", response_model=UserRead)
def confirm_account(
    payload: AccountConfirmationRequest, db: Session = Depends(get_db)
):
    """Confirma a conta associada ao token enviado por e-mail."""
    token = payload.token.strip()
    user = db.query(User).filter(User.confirmation_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Token inválido")

    user.is_confirmed = True
    user.confirmation_token = None
    user.confirmation_sent_at = None
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
