from sqlalchemy import Column, Integer, String

# ✅ import absoluto (sem o ponto)
from database import Base


# Modelo que representa a tabela de utilizadores
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)   # identificador único
    name = Column(String, nullable=False)                # nome do utilizador
    email = Column(String, unique=True, index=True, nullable=False)  # e-mail
    password_hash = Column(String, nullable=False)       # hash da palavra-passe
