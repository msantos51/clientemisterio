"""Endpoints relacionados com o formulário de contacto."""

import os
import smtplib
from email.message import EmailMessage

from fastapi import APIRouter, HTTPException, status

from schemas import ContactMessage

router = APIRouter()

# Endereço de suporte para onde as mensagens serão enviadas
SUPPORT_EMAIL = "clientemisterio.suporte@gmail.com"


def send_email(message: ContactMessage) -> None:
    """Envia a mensagem de contacto via SMTP."""
    host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASSWORD")

    body = (
        f"Nome: {message.name}\n"
        f"Email: {message.email}\n\n"
        f"Mensagem:\n{message.message}"
    )

    if not user or not password:
        # Caso não existam credenciais, apenas regista a mensagem e não tenta enviar
        print("SMTP credentials not configured; printing message:")
        print(body)
        return

    email_message = EmailMessage()
    email_message["From"] = user
    email_message["To"] = SUPPORT_EMAIL
    email_message["Subject"] = "Nova mensagem de contacto"
    email_message["Reply-To"] = message.email
    email_message.set_content(body)

    with smtplib.SMTP(host, port) as smtp:
        smtp.starttls()
        smtp.login(user, password)
        smtp.send_message(email_message)


@router.post("/contact", status_code=status.HTTP_204_NO_CONTENT)
def contact_endpoint(contact: ContactMessage) -> None:
    """Recebe dados do formulário de contacto e envia um e-mail."""
    try:
        send_email(contact)
    except Exception as exc:  # Retorna erro genérico em caso de falha
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error sending email: {exc}",
        )
    return None
