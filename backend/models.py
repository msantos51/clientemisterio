# models.py
from sqlalchemy import Column, Integer, String
from database import Base

# Modelo que representa a tabela de utilizadores
class User(Base):
    # Nome da tabela na base de dados
    __tablename__ = "users"

    # Coluna: identificador único do utilizador
    id = Column(Integer, primary_key=True, index=True)
    # Coluna: nome do utilizador
    name = Column(String, nullable=False)
    # Coluna: e-mail do utilizador
    email = Column(String, unique=True, index=True, nullable=False)
    # Coluna: hash da palavra-passe do utilizador
    password_hash = Column(String, nullable=False)
