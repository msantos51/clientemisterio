from sqlalchemy import Column, Integer, String, Boolean, DateTime

# ✅ import absoluto (sem o ponto)
from database import Base


# Modelo que representa a tabela de utilizadores
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)   # identificador único
    name = Column(String, nullable=False)                # nome do utilizador
    email = Column(String, unique=True, index=True, nullable=False)  # e-mail
    password_hash = Column(String, nullable=False)       # hash da palavra-passe
    has_paid = Column(Boolean, default=False, nullable=False)  # indica se o curso foi pago
    is_confirmed = Column(Boolean, default=True, nullable=False)  # indica se o e-mail foi confirmado
    confirmation_token = Column(String, nullable=True)   # token temporário para confirmar conta
    confirmation_sent_at = Column(DateTime(timezone=True), nullable=True)  # data de envio do e-mail de confirmação
    reset_token = Column(String, nullable=True)          # token temporário para redefinição da palavra-passe
    reset_token_expires_at = Column(DateTime(timezone=True), nullable=True)  # expiração do token de redefinição
