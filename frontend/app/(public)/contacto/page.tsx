'use client'

// Página de contacto com formulário formatado como os restantes
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
    // Centraliza o formulário vertical e horizontalmente
    <section className="flex min-h-screen items-center justify-center pb-20">
      {/* Formulário com mesma formatação que login e registo */}
      <form onSubmit={handleSubmit} className="form-control">
        {/* Título do formulário */}
        <p className="title">Contacto</p>

        {/* Campo do nome */}
        <div className="input-field">
          <input
            type="text"
            name="name"
            className="input"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="label">Nome</label>
        </div>

        {/* Campo do email */}
        <div className="input-field">
          <input
            type="email"
            name="email"
            className="input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="label">Email</label>
        </div>

        {/* Campo da mensagem */}
        <div className="input-field">
          <textarea
            name="message"
            className="input"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <label className="label">Mensagem</label>
        </div>

        {/* Botão de submissão centrado dentro do formulário */}
        <button type="submit" className="join-button mt-8 self-center">
          Enviar
        </button>
      </form>
    </section>
  )
}

