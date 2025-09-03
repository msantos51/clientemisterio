'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '../../../lib/auth';

// Página de registo com formulário simples
export default function RegisterPage() {
  // Estado para email e password introduzidos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const router = useRouter();

  // Função chamada ao submeter o formulário
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Verifica se os campos estão preenchidos
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    // Tenta registar o utilizador e verifica duplicados
    const success = registerUser({ email, password });
    if (success) {
      router.push('/login');
    } else {
      setError('Email já registado');
    }
  }

  return (
    // Contêiner centralizado para o formulário
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h2 className="text-center text-2xl font-bold">Registo</h2>
        {/* Exibe mensagem de erro se existir */}
        {error && <p className="text-center text-red-500">{error}</p>}
        {/* Campo de email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border px-3 py-2"
        />
        {/* Campo de password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded border px-3 py-2"
        />
        {/* Botão de submissão */}
        <button
          type="submit"
          className="w-full rounded bg-accent py-2 font-bold text-white"
        >
          Criar conta
        </button>
        {/* Link para página de login */}
        <p className="text-center text-sm">
          Já tem conta?{' '}
          <Link href="/login" className="text-accent">
            Entre aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
