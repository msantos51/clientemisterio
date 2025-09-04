'use client'

// Página de login simples para alunos
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  // Estados que guardam os valores dos campos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // Função chamada ao submeter o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validação mínima dos campos
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Email inválido.')
      return
    }

    // Guarda a sessão no localStorage
    localStorage.setItem('cm_session', JSON.stringify({ email, loggedIn: true }))

    // Redireciona para a área do aluno
    router.push('/aluno')
  }

  return (
    <section className="mx-auto max-w-md">
      <h2 className="mb-4 text-center text-2xl font-bold">Entrar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border px-3 py-2"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Palavra-passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </section>
  )
}
