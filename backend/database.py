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
    """Garante que as colunas necessárias existem na tabela de utilizadores."""

    inspector = inspect(engine)
    if not inspector.has_table("users"):
        return

    columns = {col["name"] for col in inspector.get_columns("users")}

    statements: list[str] = []
    added_is_confirmed = False

    if "has_paid" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS has_paid BOOLEAN NOT NULL DEFAULT FALSE"
        )

    if "is_confirmed" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_confirmed BOOLEAN NOT NULL DEFAULT TRUE"
        )
        added_is_confirmed = True

    if "confirmation_token" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS confirmation_token TEXT"
        )

    if "confirmation_sent_at" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS confirmation_sent_at TIMESTAMPTZ"
        )

    if "reset_token" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT"
        )

    if "reset_token_expires_at" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires_at TIMESTAMPTZ"
        )

    if "is_admin" not in columns:
        statements.append(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE"
        )

    if statements:
        with engine.begin() as connection:  # inicia transacção
            for statement in statements:
                connection.execute(text(statement))

    if added_is_confirmed:
        with engine.begin() as connection:
            connection.execute(
                text("UPDATE users SET is_confirmed = TRUE WHERE is_confirmed IS NULL")
            )
