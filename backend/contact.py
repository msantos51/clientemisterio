"""Endpoints relacionados com o formulário de contacto."""

from fastapi import APIRouter, HTTPException, status

from email_utils import send_email
from schemas import ContactMessage

router = APIRouter()

# Endereço de suporte para onde as mensagens serão enviadas
SUPPORT_EMAIL = "clientemisterio.suporte@gmail.com"


def send_contact_email(message: ContactMessage) -> None:
    """Envia a mensagem de contacto usando o servidor SMTP configurado."""
    body = (
        f"Nome: {message.name}\n"
        f"Email: {message.email}\n\n"
        f"Mensagem:\n{message.message}"
    )

    send_email(
        subject="Nova mensagem de contacto",
        body=body,
        to=SUPPORT_EMAIL,
        reply_to=message.email,
    )


@router.post("/contact", status_code=status.HTTP_204_NO_CONTENT)
def contact_endpoint(contact: ContactMessage) -> None:
    """Recebe dados do formulário de contacto e envia um e-mail."""
    try:
        send_contact_email(contact)
    except Exception as exc:  # Retorna erro genérico em caso de falha
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error sending email: {exc}",
        )
    return None
