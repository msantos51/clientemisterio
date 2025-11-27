'use client'

// Página com formulário de registo para o curso
import { FormEvent, useState } from 'react'
import { registerUser } from '@/lib/api'
import PasswordInput from '@/components/PasswordInput'

export default function RegisterPage() {
  // Estado local para armazenar os dados do formulário
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Função chamada ao submeter o formulário
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    try {
      await registerUser({ name, email, password })
      setSuccess('Conta criada com sucesso. Já pode iniciar sessão com os dados de registo.')
      setName('')
      setEmail('')
      setPassword('')
    } catch (err: unknown) {
      // Guarda a mensagem detalhada devolvida pelo backend
      if (err instanceof Error) setError(err.message)
      else setError('Erro inesperado ao registar.')
    }
  }

  return (
    // Centraliza o formulário vertical e horizontalmente
    <section className="flex min-h-screen items-center justify-center pb-20">
      <form onSubmit={handleSubmit} className="form-control">
        {/* Título do formulário */}
        <p className="title">Inscrever-se</p>

        {/* Campo do nome completo */}
        <div className="input-field">
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" " // Espaço necessário para usar o seletor :placeholder-shown
            required
          />
          <label className="label">Nome completo</label>
        </div>

        {/* Campo do email */}
        <div className="input-field">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" " // Espaço necessário para usar o seletor :placeholder-shown
            required
          />
          <label className="label">Email</label>
        </div>

        {/* Campo da palavra-passe com botão para mostrar o valor */}
        <div className="input-field">
          <PasswordInput
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" " // Espaço necessário para usar o seletor :placeholder-shown
            required
          />
          <label className="label">Palavra-passe</label>
        </div>

        {/* Mensagens de feedback */}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        {/* Botão de submissão centrado dentro do formulário */}
        <button type="submit" className="btn mt-8 self-center">
          Registar-se
        </button>
      </form>
    </section>
  )
}
