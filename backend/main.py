"""Ponto de entrada principal da API Cliente Mistério."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ imports absolutos (sem o ponto)
from database import Base, engine
from auth import router as auth_router

# (opcional, mas comum) criar tabelas no arranque
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cliente Mistério API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API is running"}

app.include_router(auth_router)
