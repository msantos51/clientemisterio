'use client';

import { useState } from 'react';
import Button from '../../../components/Button';

// Formulário de contacto com validação no cliente
export default function ContactForm() {
  // Estados para os campos e mensagens
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Trata a submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!name) errs.push('Nome obrigatório');
    if (!email) errs.push('Email obrigatório');
    if (!message) errs.push('Mensagem obrigatória');
    setErrors(errs);
    if (errs.length === 0) {
      console.log({ name, email, message });
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          aria-label="Nome"
          className="w-full rounded border p-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          className="w-full rounded border p-2"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem"
          aria-label="Mensagem"
          rows={5}
          className="w-full rounded border p-2"
        ></textarea>
        {errors.length > 0 && (
          <ul className="text-sm text-red-600">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}
        <Button type="submit">Enviar</Button>
      </form>
      {submitted && <p className="mt-4 text-green-600">Mensagem enviada com sucesso!</p>}
    </>
  );
}
