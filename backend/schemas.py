"""Esquemas Pydantic usados para validação de dados."""

import re
from pydantic import BaseModel, field_validator

# Expressão regular partilhada para validação de emails
EMAIL_PATTERN = re.compile(r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$")


def _validate_email(value: str) -> str:
    """Valida formato básico do e-mail utilizando o padrão partilhado."""
    if not EMAIL_PATTERN.match(value):
        raise ValueError("Invalid email format")
    return value


class UserCreate(BaseModel):
    """Dados recebidos aquando do registo de um novo utilizador."""

    # Nome completo do utilizador
    name: str
    # E-mail do utilizador
    email: str
    # Palavra-passe em texto simples (será cifrada)
    password: str

    @field_validator("email")
    def validate_email(cls, value: str) -> str:
        """Valida formato básico do e-mail."""
        return _validate_email(value)


class UserRead(BaseModel):
    """Dados devolvidos ao cliente após operações de utilizador."""

    # Identificador do utilizador
    id: int
    # Nome completo do utilizador
    name: str
    # E-mail do utilizador
    email: str
    # Indica se o utilizador já efetuou o pagamento do curso
    has_paid: bool
    # Indica se o e-mail do utilizador já foi confirmado
    is_confirmed: bool

    class Config:
        # Permitir conversão a partir de objetos ORM
        from_attributes = True


class UserLogin(BaseModel):
    """Dados recebidos aquando do login."""

    # E-mail usado na autenticação
    email: str
    # Palavra-passe introduzida
    password: str

    @field_validator("email")
    def validate_email(cls, value: str) -> str:
        """Valida formato básico do e-mail."""
        return _validate_email(value)


class UserUpdate(BaseModel):
    """Dados recebidos para atualizar o perfil do utilizador."""

    # Novo nome do utilizador (opcional)
    name: str | None = None
    # Novo e-mail do utilizador (opcional)
    email: str | None = None
    # Palavra-passe atual necessária para alteração (opcional)
    current_password: str | None = None
    # Nova palavra-passe pretendida (opcional)
    new_password: str | None = None

    @field_validator("email")
    def validate_email(cls, value: str | None) -> str | None:
        """Valida formato básico do e-mail quando fornecido."""
        if value is None:
            return value
        return _validate_email(value)

    @field_validator("new_password")
    def validate_new_password(cls, value: str | None) -> str | None:
        """Garante que a nova password tem pelo menos 6 caracteres."""
        if value is None:
            return value
        if len(value) < 6:
            raise ValueError("Password too short (>= 6)")
        return value


class PaymentStatusUpdate(BaseModel):
    """Dados para atualizar o estado de pagamento do utilizador."""

    # Indica se o utilizador já efetuou o pagamento do curso
    has_paid: bool


class ContactMessage(BaseModel):
    """Dados recebidos a partir do formulário de contacto."""

    # Nome de quem envia a mensagem
    name: str
    # Endereço de e-mail do remetente
    email: str
    # Conteúdo da mensagem
    message: str

    @field_validator("email")
    def validate_email(cls, value: str) -> str:
        """Valida formato básico do e-mail."""
        return _validate_email(value)


class PasswordForgotRequest(BaseModel):
    """Dados recebidos para iniciar a recuperação da palavra-passe."""

    # Endereço de e-mail associado à conta
    email: str

    @field_validator("email")
    def validate_email(cls, value: str) -> str:
        """Valida formato básico do e-mail."""
        return _validate_email(value)


class PasswordResetRequest(BaseModel):
    """Dados necessários para concluir a redefinição da palavra-passe."""

    # Token recebido por e-mail
    token: str
    # Nova palavra-passe escolhida
    new_password: str

    @field_validator("token")
    def validate_token(cls, value: str) -> str:
        """Garante que o token não vem vazio."""
        if not value.strip():
            raise ValueError("Token is required")
        return value

    @field_validator("new_password")
    def validate_new_password(cls, value: str) -> str:
        """Garante que a palavra-passe tem pelo menos 6 caracteres."""
        if len(value) < 6:
            raise ValueError("Password too short (>= 6)")
        return value


class AccountConfirmationRequest(BaseModel):
    """Dados necessários para confirmar uma conta recém-criada."""

    # Token de confirmação recebido no e-mail
    token: str

    @field_validator("token")
    def validate_token(cls, value: str) -> str:
        """Garante que o token não vem vazio."""
        if not value.strip():
            raise ValueError("Token is required")
        return value
