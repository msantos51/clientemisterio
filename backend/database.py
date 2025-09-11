"""Conexão e ferramentas de sessão para a base de dados PostgreSQL."""

import os
from sqlalchemy import create_engine, inspect, text
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


def ensure_has_paid_column() -> None:
    """Garante que a coluna "has_paid" existe na tabela de utilizadores."""

    # Inspeciona as colunas actuais da tabela
    inspector = inspect(engine)
    columns = {col["name"] for col in inspector.get_columns("users")}

    # Se a coluna não existir, adiciona-a com valor padrão
    if "has_paid" not in columns:
        with engine.begin() as connection:  # inicia transacção
            connection.execute(
                text(
                    "ALTER TABLE users ADD COLUMN IF NOT EXISTS has_paid BOOLEAN NOT NULL DEFAULT FALSE"
                )
            )
