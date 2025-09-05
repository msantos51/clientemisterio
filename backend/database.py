"""Conexão e ferramentas de sessão para a base de dados PostgreSQL."""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# URL de ligação à base de dados
# Render define automaticamente a variável DATABASE_URL quando crias um serviço PostgreSQL.
# Localmente, cai no valor por omissão.
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
