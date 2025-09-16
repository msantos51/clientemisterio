'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'

// Palavra-chave que o utilizador precisa de escrever para confirmar a eliminação
const DELETE_KEYWORD = 'delete'

// Página de gestão da conta do utilizador
export default function AccountPage() {
  // Estado que controla se o modal de confirmação está visível
  const [isDeletePromptVisible, setIsDeletePromptVisible] = useState(false)
  // Estado que guarda o texto escrito pelo utilizador no campo de confirmação
  const [deleteInputValue, setDeleteInputValue] = useState('')
  // Estado que indica se estamos a processar a eliminação (para desativar botões)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  // Estado para mostrar feedback ao utilizador após a ação
  const [deleteFeedbackMessage, setDeleteFeedbackMessage] = useState('')

  // Validação que confirma se o utilizador escreveu corretamente a palavra-chave exigida
  const isDeleteKeywordValid = deleteInputValue.trim().toLowerCase() === DELETE_KEYWORD

  // Abre o fluxo de eliminação e limpa mensagens ou valores anteriores
  const handleOpenDeletePrompt = () => {
    setIsDeletePromptVisible(true)
    setDeleteInputValue('')
    setDeleteFeedbackMessage('')
  }

  // Fecha o fluxo de eliminação caso o utilizador desista
  const handleCancelDelete = () => {
    setIsDeletePromptVisible(false)
    setDeleteInputValue('')
  }

  // Atualiza o estado com o que o utilizador escreve no campo de confirmação
  const handleDeleteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeleteInputValue(event.target.value)
  }

  // Confirma a eliminação depois de o utilizador escrever a palavra correta
  const handleConfirmDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isDeleteKeywordValid) {
      return
    }

    try {
      setIsDeletingAccount(true)
      // Aqui será integrada a chamada real para apagar a conta quando a API estiver disponível
      setDeleteFeedbackMessage('Pedido de eliminação registado. Entraremos em contacto com mais detalhes.')
    } finally {
      setIsDeletingAccount(false)
      setIsDeletePromptVisible(false)
      setDeleteInputValue('')
    }
  }

  // Estrutura visual da página da conta com sessão e controlo de eliminação
  return (
    <section className="space-y-6">
      {/* Título da página */}
      <h3 className="text-xl font-bold">Conta</h3>

      {/* Secção de sessões ativas (placeholder) */}
      <div>
        <h4 className="font-semibold">Sessões ativas</h4>
        <p className="text-sm text-white/80">Funcionalidade em desenvolvimento.</p>
      </div>

      {/* Secção que gere o pedido de eliminação da conta */}
      <div className="space-y-3">
        <h4 className="font-semibold">Apagar conta</h4>
        <p className="text-sm text-white/80">
          Remove de forma permanente todos os dados associados à tua conta.
        </p>
        <button
          type="button"
          className="btn mt-2"
          onClick={handleOpenDeletePrompt}
          disabled={isDeletingAccount}
        >
          Apagar
        </button>

        {/* Formulário que obriga o utilizador a confirmar escrevendo "delete" */}
        {isDeletePromptVisible && (
          <form
            className="rounded-md border border-white/30 bg-white/10 p-4 text-sm"
            onSubmit={handleConfirmDelete}
          >
            <p className="mb-3 font-semibold text-red-200">
              A conta será apagada permanentemente.
            </p>
            <label className="mb-2 block font-medium text-white">
              Escreve <span className="font-semibold">delete</span> para confirmar:
            </label>
            <input
              type="text"
              value={deleteInputValue}
              onChange={handleDeleteInputChange}
              className="mb-3 w-full rounded-md border border-white/40 bg-white/20 p-2 text-white placeholder-white/60 focus:border-white focus:outline-none"
              placeholder={DELETE_KEYWORD}
              autoFocus
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                className="btn disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!isDeleteKeywordValid || isDeletingAccount}
              >
                {isDeletingAccount ? 'A apagar...' : 'Confirmar'}
              </button>
              <button
                type="button"
                className="rounded-full border border-white/60 px-5 py-2 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleCancelDelete}
                disabled={isDeletingAccount}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Mensagem final com feedback para o utilizador */}
        {deleteFeedbackMessage && (
          <p className="text-sm text-emerald-200">{deleteFeedbackMessage}</p>
        )}
      </div>
    </section>
  )
}
