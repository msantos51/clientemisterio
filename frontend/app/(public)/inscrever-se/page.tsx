'use client'

// Página com formulário de registo para o curso
import { FormEvent, useState } from 'react'
import { registerUser } from '@/lib/api'

export default function RegisterPage() {
  // Estado local para armazenar os dados do formulário
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Função chamada ao submeter o formulário
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    try {
      await registerUser({ name, email, password })
      alert(`Conta criada para ${name} (${email})`)
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
    // Centraliza o formulário horizontalmente sem espaço no topo
    <section className="flex justify-center pb-20">
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
            required
          />
          <label className="label">Email</label>
        </div>

        {/* Campo da palavra-passe */}
        <div className="input-field">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="label">Palavra-passe</label>
        </div>

        {/* Mensagem de erro, se existir */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Botão de submissão */}
        <button type="submit" className="submit-btn">
          Registar
        </button>
      </form>
    </section>
  )
}

