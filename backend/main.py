"""Ponto de entrada principal da API Cliente Mistério."""
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Imports do projeto (ajusta o path se necessário)
from database import Base, engine
from auth import router as auth_router

# ───────────────────────────── App ─────────────────────────────
app = FastAPI(title="Cliente Mistério API")

# (temporário até usares Alembic) criar tabelas no arranque
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"⚠️ Erro ao criar tabelas: {e}")

# ─────────────────────── CORS / Ambientes ───────────────────────
ENV = os.getenv("ENV", "prod").lower()  # "dev" | "prod"
IS_DEV = ENV in {"dev", "development", "local"}

# Domínio opcional vindo de ENV (ex.: FRONTEND_URL=https://app.meudominio.com)
FRONTEND_URL = (os.getenv("FRONTEND_URL") or "").strip()

# Lista base de origens permitidas (produção)
allowed_origins = [
    "https://clientemisterio.com",
    "https://www.clientemisterio.com",
]

# Se ainda precisares do front antigo no Render, mantém esta linha:
# allowed_origins.append("https://clientemisterio-frontend.onrender.com")

# Adiciona a FRONTEND_URL se definida
if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

# Em desenvolvimento, permitir localhost
if IS_DEV:
    allowed_origins.append("http://localhost:3000")

# Filtra vazios/duplicados
ALLOWED_ORIGINS = sorted({o for o in allowed_origins if o})

app.add_middleware(
    CORSMiddleware,
    # Domínios finais explícitos
    allow_origins=ALLOWED_ORIGINS,
    # Permitir qualquer preview do Vercel (ex.: https://<hash>.vercel.app)
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,            # necessário para cookies httponly
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────── Health ───────────────────────────
@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.get("/health")
def health():
    """Endpoint para verificação de vida utilizado pelo Render."""
    return {"ok": True}

# ─────────────────────── Rotas de autenticação ───────────────────────
# O router já tem prefixo "/auth" no próprio ficheiro; não repetir aqui.
app.include_router(auth_router, tags=["Auth"])
