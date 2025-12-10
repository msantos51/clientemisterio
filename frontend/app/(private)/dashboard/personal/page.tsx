'use client'

// Página para atualização de dados pessoais
import { useEffect, useState } from 'react'
import { getCurrentUser, updateUser } from '@/lib/api'
import PasswordInput from '@/components/PasswordInput'

type Feedback = { text: string; tone: 'success' | 'error' } | null

export default function PersonalPage() {
  // Estados para armazenar nome, email, passwords e mensagens de feedback
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [feedback, setFeedback] = useState<Feedback>(null)

  // Ao carregar a página, obtém os dados atuais do utilizador
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setName(user.name)
        setEmail(user.email)
      })
      .catch((err: unknown) => {
        // Mostra mensagem de erro sem redirecionar o utilizador
        if (err instanceof Error)
          setFeedback({ text: err.message, tone: 'error' })
        else setFeedback({ text: 'Erro ao obter dados do utilizador.', tone: 'error' })
      })
  }, [])

  // Envia as alterações para a API
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    try {
      const data: {
        name: string
        currentPassword?: string
        newPassword?: string
      } = { name }

      const wantsPasswordChange = currentPassword || newPassword

      if (wantsPasswordChange) {
        if (!currentPassword || !newPassword) {
          setFeedback({
            text: 'Para alterar a password indique a atual e a nova password.',
            tone: 'error',
          })
          return
        }
        if (newPassword.length < 6) {
          setFeedback({ text: 'A nova password deve ter pelo menos 6 caracteres.', tone: 'error' })
          return
        }
        data.currentPassword = currentPassword
        data.newPassword = newPassword
      }

      const updated = await updateUser(data)
      // Atualiza os estados com os dados devolvidos pela base de dados
      setName(updated.name)
      setEmail(updated.email)
      setFeedback({ text: 'Dados atualizados com sucesso.', tone: 'success' })
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: unknown) {
      if (err instanceof Error)
        setFeedback({ text: err.message, tone: 'error' })
      else setFeedback({ text: 'Erro ao atualizar dados.', tone: 'error' })
    }
  }

  return (
    <section>
      {/* Título da secção */}
      <h3 className="text-xl font-bold">Dados pessoais</h3>
      {/* Formulário para alteração de nome e password */}
      <form onSubmit={handleUpdate} className="mt-4 max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-700">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded border border-purple-300 bg-white p-2 text-purple-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-700">Email</label>
          <input
            type="email"
            value={email}
            // Campo apenas para visualização, não permite alterações
            disabled
            className="mt-1 w-full rounded border border-purple-300 bg-white p-2 text-purple-700 opacity-70"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-purple-700">Password atual</label>
          <PasswordInput
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full rounded border border-purple-300 bg-white p-2 text-purple-700"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-purple-700">Nova password</label>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full rounded border border-purple-300 bg-white p-2 text-purple-700"
          />
        </div>
        {feedback && (
          <p
            className={`text-sm ${
              feedback.tone === 'success' ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {feedback.text}
          </p>
        )}
        <button type="submit" className="btn mt-2">
          Guardar
        </button>
      </form>
    </section>
  )
}
