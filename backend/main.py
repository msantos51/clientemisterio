# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .auth import router as auth_router

"""Ponto de entrada principal da API Sunny Sales."""


# Cria todas as tabelas na base de dados
Base.metadata.create_all(bind=engine)

# Instância principal da aplicação FastAPI

app = FastAPI(title="Sunny Sales API")

# Middleware que permite pedidos de outras origens (necessário para comunicação com o frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Rota principal que confirma que a API está ativa
@app.get("/")
def read_root():
    # Devolve uma mensagem simples para indicar que o servidor está a funcionar
    return {"message": "API is running"}


# Inclui o router de autenticação na aplicação
app.include_router(auth_router)

