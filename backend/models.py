from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship

from database import Base


# ───────────────────────────── User ─────────────────────────────
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    has_paid = Column(Boolean, default=False, nullable=False)
    is_confirmed = Column(Boolean, default=True, nullable=False)
    confirmation_token = Column(String, nullable=True)
    confirmation_sent_at = Column(DateTime(timezone=True), nullable=True)
    reset_token = Column(String, nullable=True)
    reset_token_expires_at = Column(DateTime(timezone=True), nullable=True)
    is_admin = Column(Boolean, default=False, nullable=False)

    # Pedidos FEITOS por este utilizador (usa a FK: AccountDeletionRequest.user_id)
    deletion_requests = relationship(
        "AccountDeletionRequest",
        back_populates="user",
        foreign_keys="AccountDeletionRequest.user_id",   # 👈 remove a ambiguidade
        passive_deletes=True,
        lazy="selectin",
    )

    # Pedidos PROCESSADOS por este utilizador (admin) (usa a FK: AccountDeletionRequest.processed_by_user_id)
    processed_deletion_requests = relationship(
        "AccountDeletionRequest",
        back_populates="processed_by",
        foreign_keys="AccountDeletionRequest.processed_by_user_id",  # 👈 relação distinta
        passive_deletes=True,
        lazy="selectin",
    )


# ─────────────── AccountDeletionRequest ───────────────
class AccountDeletionRequest(Base):
    __tablename__ = "account_deletion_requests"

    id = Column(Integer, primary_key=True, index=True)
    # pode ficar a NULL após eliminação do user (manténs o snapshot)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    user_id_snapshot = Column(Integer, nullable=False)
    user_name_snapshot = Column(String, nullable=False)
    user_email_snapshot = Column(String, nullable=False)

    status = Column(String, nullable=False, default="pending")
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    processed_at = Column(DateTime(timezone=True), nullable=True)

    processed_by_user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    admin_notes = Column(Text, nullable=True)

    # Quem FEZ o pedido
    user = relationship(
        "User",
        back_populates="deletion_requests",
        foreign_keys=[user_id],
        lazy="selectin",
    )

    # Quem PROCESSOU o pedido (admin)
    processed_by = relationship(
        "User",
        back_populates="processed_deletion_requests",
        foreign_keys=[processed_by_user_id],
        lazy="selectin",
    )
