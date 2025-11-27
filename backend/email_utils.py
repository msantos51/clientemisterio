"""Ferramentas auxiliares para envio de e-mails via SMTP."""

import os
import smtplib
import ssl
import time
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

# Define o remetente apresentado nos e-mails, priorizando uma variável dedicada ou,
# na ausência de um valor válido, utilizando um endereço neutro do domínio.
_raw_from = (os.getenv("SMTP_FROM") or "").strip()
SMTP_FROM = _raw_from or (SMTP_USER if "@" in SMTP_USER else "no-reply@clientemisterio.com")

# Configura opções de transporte para o servidor SMTP.
SMTP_USE_SSL = _get_env_flag("SMTP_USE_SSL", False)
SMTP_USE_TLS = _get_env_flag("SMTP_USE_TLS", True)

def _get_positive_int(name: str, default: int, minimum: int = 1) -> int:
    """Lê um inteiro positivo de uma variável de ambiente, aplicando um mínimo aceitável."""

    raw_value = os.getenv(name, str(default)).strip()
    try:
        value = int(raw_value)
    except ValueError as exc:
        raise EmailDeliveryError(f"Valor inválido para {name}; defina um número inteiro.") from exc

    if value < minimum:
        raise EmailDeliveryError(
            f"O valor de {name} deve ser pelo menos {minimum}; recebido {value}."
        )

    return value


# Tempo-limite aumentado para tolerar latências em serviços externos como o Brevo.
SMTP_TIMEOUT = _get_positive_int("SMTP_TIMEOUT", default=60, minimum=5)

# Número máximo de tentativas para envio de e-mail em caso de falhas transitórias.
SMTP_MAX_RETRIES = _get_positive_int("SMTP_MAX_RETRIES", default=2, minimum=1)


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


def _send_message_with_retry(message: EmailMessage) -> None:
    """Tenta enviar a mensagem com tentativas adicionais para mitigar timeouts transitórios."""

    last_error: Exception | None = None

    for attempt in range(1, SMTP_MAX_RETRIES + 1):
        try:
            with _open_smtp_connection() as smtp:
                smtp.send_message(message)
            return
        except (smtplib.SMTPException, OSError, TimeoutError) as exc:
            last_error = exc

            # Atraso incremental simples para dar oportunidade à rede/serviço recuperar
            if attempt < SMTP_MAX_RETRIES:
                time.sleep(attempt * 2)

    # Se todas as tentativas falharem, converte a última exceção num erro controlado
    error_name = last_error.__class__.__name__ if last_error else "ErroDesconhecido"
    raise EmailDeliveryError(
        "Falha ao entregar o e-mail através do servidor SMTP: "
        f"{error_name}: {last_error}"
    ) from last_error


def send_email(
    *, subject: str, body: str, to: str | Iterable[str], reply_to: str | None = None
) -> None:
    """Envia um e-mail através do servidor SMTP configurado."""
    _ensure_configuration()
    message = build_email_message(subject=subject, body=body, to=to, reply_to=reply_to)
    _send_message_with_retry(message)
