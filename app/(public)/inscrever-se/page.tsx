'use client'

// Página com formulário de registo para o curso
import { FormEvent, useState } from 'react'

export default function RegisterPage() {
  // Estado local para armazenar os dados do formulário
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Função chamada ao submeter o formulário
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // Aqui poderiam ser enviados os dados para a API
    alert(`Registo enviado para ${name} (${email})`)
    // Limpa os campos após envio
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      {/* Contentor do formulário */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow"
      >
        {/* Título do formulário */}
        <h2 className="text-center text-2xl font-bold">Registar no curso</h2>
        {/* Campo para o nome completo */}
        <input
          type="text"
          placeholder="Nome completo"
          className="w-full rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Campo para o e-mail */}
        <input
          type="email"
          placeholder="E-mail"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Campo para a palavra-passe */}
        <input
          type="password"
          placeholder="Palavra-passe"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full rounded bg-green-600 p-2 font-semibold text-white"
        >
          Registar
        </button>
      </form>
    </section>
  )
}
