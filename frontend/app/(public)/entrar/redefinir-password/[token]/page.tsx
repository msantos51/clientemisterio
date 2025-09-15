'use client'

// Página para definir nova password a partir do token enviado por email
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PasswordInput from '@/components/PasswordInput'
import { resetPassword } from '@/lib/api'

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  // Estados para controlar password, feedback e carregamento
  const [newPassword, setNewPassword] = useState('')
  const [feedback, setFeedback] = useState<{ text: string; tone: 'success' | 'error' } | null>(
    null,
  )
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  // Submete nova password para a API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFeedback(null)

    if (newPassword.length < 6) {
      setFeedback({ text: 'A password deve ter pelo menos 6 caracteres.', tone: 'error' })
      return
    }

    setSubmitting(true)
    try {
      const response = await resetPassword({ token: params.token, newPassword })
      setFeedback({ text: response.message, tone: 'success' })
      setNewPassword('')
      // Após alguns segundos redireciona para o login
      setTimeout(() => router.push('/entrar'), 1500)
    } catch (err: unknown) {
      if (err instanceof Error) setFeedback({ text: err.message, tone: 'error' })
      else setFeedback({ text: 'Erro ao redefinir password.', tone: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center pb-20">
      <form onSubmit={handleSubmit} className="form-control">
        {/* Título da página */}
        <p className="title">Definir nova password</p>

        {/* Campo da nova password */}
        <div className="input-field">
          <PasswordInput
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label className="label">Nova password</label>
        </div>

        {/* Mensagem de feedback */}
        {feedback && (
          <p
            className={`text-sm ${
              feedback.tone === 'success' ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {feedback.text}
          </p>
        )}

        {/* Botão de submissão */}
        <button type="submit" className="btn mt-8 self-center" disabled={submitting}>
          {submitting ? 'A atualizar...' : 'Guardar nova password'}
        </button>

        <div className="mt-4 text-center text-sm text-white">
          <Link href="/entrar" className="hover:underline">
            Voltar ao login
          </Link>
        </div>
      </form>
    </section>
  )
}
