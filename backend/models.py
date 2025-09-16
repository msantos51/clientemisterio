from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship

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
    is_admin = Column(Boolean, default=False, nullable=False)  # indica se o utilizador é administrador

    # Relacionamento com pedidos de eliminação efetuados pelo utilizador (sem eliminar registos históricos)
    deletion_requests = relationship(
        "AccountDeletionRequest",
        back_populates="user",
        passive_deletes=True,
    )


# Modelo que guarda pedidos de eliminação de conta
class AccountDeletionRequest(Base):
    __tablename__ = "account_deletion_requests"

    id = Column(Integer, primary_key=True, index=True)  # identificador único do pedido
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)  # FK (pode ficar a NULL após eliminação)
    user_id_snapshot = Column(Integer, nullable=False)  # identificador do utilizador no momento do pedido
    user_name_snapshot = Column(String, nullable=False)  # nome registado no momento do pedido
    user_email_snapshot = Column(String, nullable=False)  # e-mail registado no momento do pedido
    status = Column(String, nullable=False, default="pending")  # estado atual do pedido
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )  # instante em que o pedido foi criado
    processed_at = Column(DateTime(timezone=True), nullable=True)  # instante em que o pedido foi tratado
    processed_by_user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )  # administrador responsável
    admin_notes = Column(Text, nullable=True)  # notas internas sobre o pedido

    # Relacionamento com o utilizador que fez o pedido
    user = relationship("User", back_populates="deletion_requests", foreign_keys=[user_id])
    # Relacionamento com o administrador que tratou o pedido
    processed_by = relationship("User", foreign_keys=[processed_by_user_id])
