# main.py
from fastapi import FastAPI
from .database import Base, engine
from .auth import router as auth_router

"""Ponto de entrada principal da API Cliente Mistério."""
# Cria todas as tabelas na base de dados
Base.metadata.create_all(bind=engine)

# Instância principal da aplicação FastAPI
app = FastAPI(title="Cliente Mistério API")

# Inclui o router de autenticação na aplicação
app.include_router(auth_router)
