"""Ponto de entrada principal da API Cliente Mistério."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Imports do projeto (ajusta o path se necessário)
from database import Base, engine, ensure_has_paid_column
from auth import router as auth_router
from contact import router as contact_router
from admin import router as admin_router

# Importa configuração partilhada
from settings import FRONTEND_URL, IS_DEV

# ───────────────────────────── App ─────────────────────────────
app = FastAPI(title="Cliente Mistério API")

# (temporário até usares Alembic) criar tabelas no arranque
try:
    Base.metadata.create_all(bind=engine)  # cria tabelas se não existirem
    ensure_has_paid_column()  # garante colunas adicionais em falta
except Exception as e:
    print(f"⚠️ Erro ao criar tabelas: {e}")

# ─────────────────────── CORS / Ambientes ───────────────────────
# Lista base de origens permitidas (produção)
allowed_origins = [
    "https://clientemisterio.com",
    "https://www.clientemisterio.com",
    # Domínio de produção alojado no Vercel
    "https://clientemisterio.vercel.app",
    # Domínio legado alojado no Render (mantido para compatibilidade)
    "https://clientemisterio-frontend.onrender.com",
]

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

# ──────────── Rota principal para verificação rápida ────────────
@app.get("/")
def read_root():
    return {"message": "API is running"}

# ─────────────────────── Rotas de autenticação ───────────────────────
# O router já tem prefixo "/auth" no próprio ficheiro; não repetir aqui.
app.include_router(auth_router, tags=["Auth"])

# ─────────────────────── Rotas administrativas ───────────────────────
# Permite gerir pedidos internos como pedidos de eliminação de conta
app.include_router(admin_router, tags=["Admin"])

# ───────────────────────── Rotas de contacto ─────────────────────────
# Lida com mensagens enviadas através do formulário de contacto
app.include_router(contact_router, tags=["Contact"])
