# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

"""Conexão e ferramentas de sessão para a base de dados PostgreSQL."""

# URL de ligação à base de dados; por omissão, utiliza uma instância local
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://user:password@localhost:5432/cliente_misterio",
)

# Cria o motor da base de dados
engine = create_engine(DATABASE_URL)

# Cria a sessão para interações com a base de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para definição dos modelos ORM
Base = declarative_base()
