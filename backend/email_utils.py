"""Ferramentas auxiliares para envio de e-mails via SMTP."""

import os
import smtplib
import ssl
from email.message import EmailMessage
from typing import Iterable


class EmailDeliveryError(Exception):
    """Erro personalizado para sinalizar falhas no envio de e-mails."""


def _get_env_flag(name: str, default: bool = False) -> bool:
    """Converte variáveis de ambiente em booleanos de forma tolerante."""
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _get_smtp_port() -> int:
    """Lê o porto SMTP garantindo que é um inteiro válido."""
    raw_port = os.getenv("SMTP_PORT", "587").strip()
    try:
        return int(raw_port)
    except ValueError as exc:
        raise EmailDeliveryError("Valor inválido para SMTP_PORT; defina um número inteiro.") from exc


# Lê configurações do servidor SMTP a partir de variáveis de ambiente.
# As predefinições assumem o serviço Brevo (smtp-relay.brevo.com)
# para evitar depender de contas Gmail com políticas de segurança restritivas.
SMTP_HOST = os.getenv("SMTP_HOST", "smtp-relay.brevo.com").strip()
SMTP_PORT = _get_smtp_port()
SMTP_USER = (os.getenv("SMTP_USER") or "").strip()
SMTP_PASSWORD = (os.getenv("SMTP_PASSWORD") or "").strip()
SMTP_FROM = (os.getenv("SMTP_FROM") or SMTP_USER or "no-reply@clientemisterio.com").strip()
SMTP_USE_SSL = _get_env_flag("SMTP_USE_SSL", False)
SMTP_USE_TLS = _get_env_flag("SMTP_USE_TLS", True)
SMTP_TIMEOUT = int(os.getenv("SMTP_TIMEOUT", "10"))


def _ensure_configuration() -> None:
    """Valida a configuração necessária para envio de e-mails."""
    if not SMTP_HOST:
        raise EmailDeliveryError("Configuração SMTP incompleta: falta o host do servidor.")
    if not SMTP_PORT:
        raise EmailDeliveryError("Configuração SMTP incompleta: falta o porto do servidor.")
    if not SMTP_USER or not SMTP_PASSWORD:
        raise EmailDeliveryError("Credenciais SMTP não configuradas (SMTP_USER/SMTP_PASSWORD).")
    if SMTP_USE_SSL and SMTP_USE_TLS:
        raise EmailDeliveryError("Configuração SMTP inválida: ative apenas SSL ou TLS, não ambos.")


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
    message["From"] = SMTP_FROM
    message["To"] = ", ".join(recipients)
    message["Subject"] = subject
    if reply_to:
        message["Reply-To"] = reply_to
    message.set_content(body)
    return message


def _open_smtp_connection() -> smtplib.SMTP:
    """Cria a ligação SMTP com suporte a SSL ou STARTTLS consoante configuração."""
    context = ssl.create_default_context()

    if SMTP_USE_SSL:
        smtp_client: smtplib.SMTP = smtplib.SMTP_SSL(
            SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT, context=context
        )
    else:
        smtp_client = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT)

    smtp_client.ehlo()

    if SMTP_USE_TLS and not SMTP_USE_SSL:
        smtp_client.starttls(context=context)
        smtp_client.ehlo()

    smtp_client.login(SMTP_USER, SMTP_PASSWORD)
    return smtp_client


def send_email(
    *, subject: str, body: str, to: str | Iterable[str], reply_to: str | None = None
) -> None:
    """Envia um e-mail através do servidor SMTP configurado."""
    _ensure_configuration()
    message = build_email_message(subject=subject, body=body, to=to, reply_to=reply_to)

    try:
        with _open_smtp_connection() as smtp:
            smtp.send_message(message)
    except (smtplib.SMTPException, OSError) as exc:
        # Converte qualquer falha de rede ou SMTP num erro controlado
        raise EmailDeliveryError(
            "Falha ao entregar o e-mail através do servidor SMTP: "
            f"{exc.__class__.__name__}: {exc}"
        ) from exc
