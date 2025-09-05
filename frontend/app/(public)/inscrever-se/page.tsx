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
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <section className="mx-auto max-w-md">
      <h2 className="mb-2 text-center text-2xl font-bold">Inscrever-se</h2>
      {/* Frase de orientação para o utilizador */}
      <p className="mb-6 text-center text-gray-600">
        Crie a sua conta para aceder ao curso.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Nome completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Palavra-passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Registar
        </button>
      </form>
    </section>
  )
}

