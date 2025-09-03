'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '../../../lib/auth';

// Página de login com formulário simples
export default function LoginPage() {
  // Estado para email e password introduzidos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para mensagens de erro
  const [error, setError] = useState('');
  const router = useRouter();

  // Função chamada ao submeter o formulário
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Garante que os campos foram preenchidos
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    // Verifica se as credenciais são válidas
    const success = loginUser({ email, password });
    if (success) {
      // Guarda o email do utilizador autenticado
      localStorage.setItem('currentUser', email);
      router.push('/');
    } else {
      setError('Credenciais inválidas');
    }
  }

  return (
    // Contêiner centralizado para o formulário
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h2 className="text-center text-2xl font-bold">Login</h2>
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
          Entrar
        </button>
        {/* Link para página de registo */}
        <p className="text-center text-sm">
          Não tem conta?{' '}
          <Link href="/register" className="text-accent">
            Registe-se
          </Link>
        </p>
      </form>
    </div>
  );
}
