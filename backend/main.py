"""Ponto de entrada principal da API Cliente Mistério."""

import os  # Lê variáveis de ambiente

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ imports absolutos
from database import Base, engine
from auth import router as auth_router

# (temporário até usares Alembic) criar tabelas no arranque
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"⚠️ Erro ao criar tabelas: {e}")

app = FastAPI(title="Cliente Mistério API")

# URL do frontend autorizada nas requisições CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://clientemisterio-frontend.onrender.com")

# CORS (ajusta o domínio do frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

# rotas de autenticação
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
