"""Esquemas Pydantic usados para validação de dados."""

import re
from pydantic import BaseModel, field_validator


class UserCreate(BaseModel):
    """Dados recebidos aquando do registo de um novo utilizador."""

    # Nome completo do utilizador
    name: str
    # E-mail do utilizador
    email: str
    # Palavra-passe em texto simples (será cifrada)
    password: str

    @field_validator("email")
    def validate_email(cls, v: str) -> str:
        """Valida formato básico do e-mail."""
        pattern = r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$"
        if not re.match(pattern, v):
            raise ValueError("Invalid email format")
        return v


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
    def validate_email(cls, v: str) -> str:
        """Valida formato básico do e-mail."""
        pattern = r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$"
        if not re.match(pattern, v):
            raise ValueError("Invalid email format")
        return v


class UserUpdate(BaseModel):
    """Dados recebidos para atualizar o perfil do utilizador."""

    # Novo nome do utilizador (opcional)
    name: str | None = None
    # Novo e-mail do utilizador (opcional)
    email: str | None = None

    @field_validator("email")
    def validate_email(cls, v: str | None) -> str | None:
        """Valida formato básico do e-mail quando fornecido."""
        if v is None:
            return v
        pattern = r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$"
        if not re.match(pattern, v):
            raise ValueError("Invalid email format")
        return v


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
    def validate_email(cls, v: str) -> str:
        """Valida formato básico do e-mail."""
        pattern = r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$"
        if not re.match(pattern, v):
            raise ValueError("Invalid email format")
        return v
