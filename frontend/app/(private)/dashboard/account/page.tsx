'use client'

// Página que permite ao utilizador iniciar o processo de eliminação da conta
import { FormEvent, useState } from 'react'
import { requestAccountDeletion } from '@/lib/api'

export default function AccountSettingsPage() {
  // Controla a visibilidade do formulário de confirmação
  const [isConfirming, setIsConfirming] = useState(false)
  // Guarda o texto escrito pelo utilizador no campo de confirmação
  const [confirmationValue, setConfirmationValue] = useState('')
  // Indica se o pedido está a ser enviado para o backend
  const [submitting, setSubmitting] = useState(false)
  // Guarda mensagens de sucesso ou erro para apresentar ao utilizador
  const [feedback, setFeedback] = useState<
    { type: 'success' | 'error'; message: string } | null
  >(null)
  // Após um pedido bem-sucedido, evita que o utilizador repita a operação
  const [requestCompleted, setRequestCompleted] = useState(false)
  // Memoriza se o texto de confirmação corresponde ao valor esperado
  const isConfirmationValid = confirmationValue.trim().toLowerCase() === 'delete'

  // Mostra o formulário de confirmação quando o utilizador clica em "Apagar Conta"
  const handleShowConfirmation = () => {
    setIsConfirming(true)
    setFeedback(null)
    setConfirmationValue('')
  }

  // Submete o pedido ao backend garantindo que a palavra "delete" foi escrita
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (confirmationValue.trim().toLowerCase() !== 'delete') {
      setFeedback({ type: 'error', message: 'Para confirmar escreva exatamente "delete".' })
      return
    }

    setSubmitting(true)
    setFeedback(null)

    try {
      const response = await requestAccountDeletion()
      setFeedback({ type: 'success', message: response.message })
      setRequestCompleted(true)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao enviar o pedido. Tente novamente mais tarde.'
      setFeedback({ type: 'error', message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6">
      {/* Cabeçalho informativo sobre a secção de conta */}
      <header>
        <h1 className="text-3xl font-bold">Gestão da Conta</h1>
        <p className="mt-2 text-sm text-white/80">
          Nesta área pode solicitar a eliminação definitiva da sua conta Cliente Mistério. Após a
          confirmação será enviada uma notificação automática para a nossa equipa de suporte.
        </p>
      </header>

      {/* Cartão com aviso principal sobre as consequências da eliminação */}
      <div className="rounded-2xl border border-red-200/60 bg-red-500/10 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-red-50">Apagar Conta</h2>
        <p className="mt-4 text-sm text-red-50/90">
          Se prosseguir com a eliminação, a sua conta e todos os dados associados serão apagados de
          forma permanente. Este processo não pode ser revertido e requer confirmação manual pela
          equipa de suporte.
        </p>

        {/* Mensagem de feedback em caso de sucesso ou erro */}
        {feedback && (
          <div
            role="alert"
            className={`mt-4 rounded-lg border px-4 py-3 text-sm font-semibold ${
              feedback.type === 'success'
                ? 'border-emerald-300/60 bg-emerald-500/10 text-emerald-50'
                : 'border-red-300/60 bg-red-500/10 text-red-50'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Mostra o botão inicial enquanto o formulário não foi revelado */}
        {!isConfirming && !requestCompleted && (
          <button
            type="button"
            onClick={handleShowConfirmation}
            className="btn mt-6"
          >
            Apagar Conta
          </button>
        )}

        {/* Formulário de confirmação apresentado após clicar no botão */}
        {isConfirming && !requestCompleted && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <p className="text-sm text-red-50/80">
              Para confirmar que compreende as consequências desta ação escreva{' '}
              <span className="font-bold">delete</span> na caixa abaixo e de seguida carregue em{' '}
              <span className="font-bold">Confirmar eliminação</span>.
            </p>
            <input
              type="text"
              value={confirmationValue}
              onChange={(event) => {
                setConfirmationValue(event.target.value)
                if (feedback?.type === 'error') {
                  setFeedback(null)
                }
              }}
              placeholder="Escreva delete para confirmar"
              className="w-full rounded-lg border border-red-200/60 bg-white/20 px-4 py-2 text-base font-semibold text-white placeholder:text-red-100/70 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="btn"
              disabled={submitting || !isConfirmationValid}
            >
              {submitting ? 'A enviar pedido...' : 'Confirmar eliminação'}
            </button>
          </form>
        )}

        {/* Informação final após submissão bem-sucedida */}
        {requestCompleted && (
          <p className="mt-6 text-sm text-emerald-50/80">
            Recebemos o seu pedido e a nossa equipa foi notificada automaticamente através do e-mail
            clientemisterio.suporte@gmail.com. Em breve entraremos em contacto para concluir o
            processo.
          </p>
        )}
      </div>
    </section>
  )
}
