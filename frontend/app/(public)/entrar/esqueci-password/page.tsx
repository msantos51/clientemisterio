'use client'

// Página para solicitar recuperação de password
import Link from 'next/link'
import { useState } from 'react'
import { requestPasswordReset } from '@/lib/api'

export default function ForgotPasswordPage() {
  // Estados para controlar email e mensagem de feedback
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState<{ text: string; tone: 'success' | 'error' } | null>(
    null,
  )
  const [submitting, setSubmitting] = useState(false)

  // Submete pedido de recuperação para a API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFeedback(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFeedback({ text: 'Introduza um email válido.', tone: 'error' })
      return
    }

    setSubmitting(true)
    try {
      const response = await requestPasswordReset({ email })
      setFeedback({ text: response.message, tone: 'success' })
      setEmail('')
    } catch (err: unknown) {
      if (err instanceof Error) setFeedback({ text: err.message, tone: 'error' })
      else setFeedback({ text: 'Erro ao solicitar recuperação.', tone: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center pb-20">
      <form onSubmit={handleSubmit} className="form-control">
        {/* Título do formulário */}
        <p className="title">Recuperar password</p>

        {/* Campo do email */}
        <div className="input-field">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label className="label">Email</label>
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

        {/* Botão de envio */}
        <button type="submit" className="btn mt-8 self-center" disabled={submitting}>
          {submitting ? 'A enviar...' : 'Enviar instruções'}
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
