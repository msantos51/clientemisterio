"""Ferramentas auxiliares para envio de e-mails via SMTP."""

import os
import smtplib
from email.message import EmailMessage
from typing import Iterable

# Lê configurações do servidor SMTP a partir de variáveis de ambiente
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


def _normalize_recipients(addresses: str | Iterable[str]) -> list[str]:
    """Garante que a lista de destinatários está normalizada num array de strings."""
    if isinstance(addresses, str):
        return [addresses]
    return [address for address in addresses if address]


def build_email_message(
    *, subject: str, body: str, to: str | Iterable[str], reply_to: str | None = None
) -> EmailMessage:
    """Cria a mensagem de e-mail com cabeçalhos básicos e corpo em texto simples."""
    recipients = _normalize_recipients(to)
    if not recipients:
        raise ValueError("É necessário fornecer pelo menos um destinatário.")

    message = EmailMessage()
    # Define remetente (usa o utilizador SMTP como origem principal)
    message["From"] = SMTP_USER or "no-reply@clientemisterio.com"
    message["To"] = ", ".join(recipients)
    message["Subject"] = subject
    if reply_to:
        message["Reply-To"] = reply_to
    message.set_content(body)
    return message


def send_email(
    *, subject: str, body: str, to: str | Iterable[str], reply_to: str | None = None
) -> None:
    """Envia um e-mail através do servidor SMTP configurado."""
    # Se não existirem credenciais configuradas, regista a mensagem e termina.
    if not SMTP_USER or not SMTP_PASSWORD:
        print("SMTP credentials not configured; skipping real send.")
        print(f"Subject: {subject}")
        print(body)
        return

    message = build_email_message(subject=subject, body=body, to=to, reply_to=reply_to)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
        # Estabelece ligação segura e autentica com o servidor
        smtp.starttls()
        smtp.login(SMTP_USER, SMTP_PASSWORD)
        smtp.send_message(message)
