# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# URL de ligação à base de dados (usada em Render; recolhida das variáveis de ambiente)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://user:password@localhost:5432/sunny_sales")

# Criação do motor da base de dados
engine = create_engine(DATABASE_URL)

# Criação da sessão para interações com a base de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para definição dos modelos
Base = declarative_base()
