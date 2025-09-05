'use client'

// Página de contacto com formulário básico
import { useState } from 'react'

export default function ContactPage() {
  // Estado do formulário para armazenar os valores dos campos
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  // Atualiza o estado quando o utilizador altera um campo
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Envia o formulário e limpa os campos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mensagem enviada!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="mx-auto max-w-xl py-20">
      {/* Formulário de contacto */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded border border-white bg-transparent p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded border border-white bg-transparent p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white">Mensagem</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full rounded border border-white bg-transparent p-2 text-white"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="rounded border border-white px-6 py-2 font-semibold text-white hover:bg-white/20"
        >
          Enviar
        </button>
      </form>
    </section>
  )
}
