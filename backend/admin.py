"""Rotas administrativas para gerir pedidos sensíveis do Cliente Mistério."""

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Header, Query, status
from sqlalchemy.orm import Session

from auth import (
    get_db,
    get_current_admin,
    get_current_admin_optional,
    delete_user_account,
)
from models import AccountDeletionRequest, User
from schemas import (
    AccountDeletionRequestRead,
    AccountDeletionRequestAdminUpdate,
    ACCOUNT_DELETION_ALLOWED_STATUSES,
)
from settings import ADMIN_API_SECRET

# Conjunto de estados finais onde o pedido deixa de estar ativo
FINAL_DELETION_STATUSES = {"completed", "rejected"}
# Conjunto de estados ativos (com o pedido ainda em tratamento)
ACTIVE_DELETION_STATUSES = ACCOUNT_DELETION_ALLOWED_STATUSES - FINAL_DELETION_STATUSES

router = APIRouter(prefix="/admin", tags=["Admin"])


def ensure_deletion_permission(current_admin: User | None, admin_secret: str | None) -> None:
    """Permite eliminar contas com token de administrador ou com o cabeçalho secreto."""

    configured_secret = ADMIN_API_SECRET

    if current_admin is not None:
        return

    if configured_secret and admin_secret and admin_secret == configured_secret:
        return

    detail = (
        "É necessário token de administrador válido ou cabeçalho X-Admin-Secret correto"
        if configured_secret
        else "É necessário token de administrador válido"
    )

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


@router.get("/deletion-requests", response_model=list[AccountDeletionRequestRead])
def list_deletion_requests(
    status_filter: str | None = Query(
        default=None,
        alias="status",
        description="Filtra os pedidos pelo estado atual.",
    ),
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
) -> list[AccountDeletionRequestRead]:
    """Lista pedidos de eliminação ordenados do mais recente para o mais antigo."""

    # Dependência acima garante que apenas administradores acedem a esta rota
    _ = current_admin

    query = db.query(AccountDeletionRequest).order_by(AccountDeletionRequest.created_at.desc())

    if status_filter:
        if status_filter not in ACCOUNT_DELETION_ALLOWED_STATUSES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Estado inválido")
        query = query.filter(AccountDeletionRequest.status == status_filter)

    return query.all()


@router.get("/deletion-requests/{request_id}", response_model=AccountDeletionRequestRead)
def get_deletion_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
) -> AccountDeletionRequestRead:
    """Devolve os detalhes de um pedido de eliminação específico."""

    # Dependência garante acesso apenas a administradores
    _ = current_admin

    deletion_request = db.get(AccountDeletionRequest, request_id)
    if not deletion_request:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pedido não encontrado")

    return deletion_request


@router.put("/deletion-requests/{request_id}", response_model=AccountDeletionRequestRead)
def update_deletion_request(
    request_id: int,
    payload: AccountDeletionRequestAdminUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
) -> AccountDeletionRequestRead:
    """Atualiza estado, notas e, opcionalmente, elimina a conta associada."""

    deletion_request = db.get(AccountDeletionRequest, request_id)
    if not deletion_request:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pedido não encontrado")

    now = datetime.now(timezone.utc)

    # Atualiza notas quando fornecidas
    if payload.admin_notes is not None:
        cleaned_notes = payload.admin_notes.strip()
        deletion_request.admin_notes = cleaned_notes or None

    desired_status = payload.status

    if payload.delete_user:
        if payload.status is not None and payload.status != "completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Para eliminar a conta defina o estado como 'completed'.",
            )
        if deletion_request.user_id is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="A conta associada a este pedido já foi removida.",
            )
        # Elimina a conta do utilizador na mesma transação
        delete_user_account(db, deletion_request.user_id, commit=False)
        desired_status = "completed"
        deletion_request.processed_at = now
        deletion_request.processed_by_user_id = current_admin.id

    if desired_status is not None:
        if desired_status not in ACCOUNT_DELETION_ALLOWED_STATUSES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Estado inválido")

        deletion_request.status = desired_status

        if desired_status in FINAL_DELETION_STATUSES:
            # Marca o pedido como concluído e regista quem tratou
            deletion_request.processed_at = now
            deletion_request.processed_by_user_id = current_admin.id
        elif desired_status in ACTIVE_DELETION_STATUSES:
            # Reabre o pedido retirando informação de processamento
            deletion_request.processed_at = None
            deletion_request.processed_by_user_id = None

    db.add(deletion_request)
    db.commit()
    db.refresh(deletion_request)

    return deletion_request


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_by_id(
    user_id: int,
    admin_secret: str | None = Header(default=None, alias="X-Admin-Secret"),
    db: Session = Depends(get_db),
    current_admin: User | None = Depends(get_current_admin_optional),
) -> None:
    """Elimina definitivamente um utilizador específico através do respetivo ID."""

    ensure_deletion_permission(current_admin, admin_secret)

    delete_user_account(db, user_id)


@router.delete("/users/by-email/{email}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_by_email(
    email: str,
    admin_secret: str | None = Header(default=None, alias="X-Admin-Secret"),
    db: Session = Depends(get_db),
    current_admin: User | None = Depends(get_current_admin_optional),
) -> None:
    """Elimina definitivamente um utilizador com base no endereço de e-mail fornecido."""

    ensure_deletion_permission(current_admin, admin_secret)

    normalized_email = email.strip().lower()
    user = db.query(User).filter(User.email == normalized_email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Utilizador não encontrado")

    delete_user_account(db, user)
