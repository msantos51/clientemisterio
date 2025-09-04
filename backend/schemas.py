# schemas.py
from pydantic import BaseModel, EmailStr

# Esquema para os dados enviados no registo
class UserCreate(BaseModel):
    # Nome completo do utilizador
    name: str
    # E-mail do utilizador
    email: EmailStr
    # Palavra-passe em texto simples (será cifrada)
    password: str

# Esquema para os dados devolvidos ao cliente
class UserRead(BaseModel):
    # Identificador do utilizador
    id: int
    # Nome completo do utilizador
    name: str
    # E-mail do utilizador
    email: EmailStr

    class Config:
        # Permitir conversão a partir de objetos ORM
        from_attributes = True

# Esquema para os dados enviados no login
class UserLogin(BaseModel):
    # E-mail usado na autenticação
    email: EmailStr
    # Palavra-passe introduzida
    password: str
