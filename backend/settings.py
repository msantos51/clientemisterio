"""Configuração global da aplicação."""

# Importa o módulo os para ler variáveis de ambiente
import os

# ────────────────────── Ambiente ──────────────────────
# Determina o ambiente atual, assumindo "dev" por omissão
# para facilitar o desenvolvimento local sem HTTPS.
ENV = os.getenv("ENV", "dev").lower()  # "dev" | "prod"
IS_DEV = ENV in {"dev", "development", "local"}

# ─────────────────── Segurança / Tokens ───────────────────
# Chave secreta utilizada para assinar os tokens JWT
SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_ME")
# Em produção, falhar cedo se a chave não estiver definida
if (not SECRET_KEY or SECRET_KEY == "CHANGE_ME") and not IS_DEV:
    raise RuntimeError("SECRET_KEY não definida nas variáveis de ambiente.")
# Em desenvolvimento, define uma chave de teste explícita
if IS_DEV and (not SECRET_KEY or SECRET_KEY == "CHANGE_ME"):
    SECRET_KEY = "DEV_ONLY__CHANGE_ME_IN_PROD"

# Algoritmo de assinatura JWT
ALGORITHM = "HS256"
# Duração do token em minutos
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# ────────────────────── Configuração Web ──────────────────────
# URL opcional do frontend para CORS
FRONTEND_URL = (os.getenv("FRONTEND_URL") or "").strip()
