'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// Página inicial dedicada à apresentação do painel inteligente
export default function HomePage() {
  // Estado que indica se o utilizador está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Ao montar, verifica no localStorage se existe sessão ativa
  useEffect(() => {
    const session = localStorage.getItem('cm_session')
    try {
      const parsed = session ? JSON.parse(session) : null
      setIsLoggedIn(parsed?.loggedIn === true)
    } catch {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    // Container principal com espaçamento uniforme
    <main className="flex justify-center">
      {/* Secção de destaque sem elementos visuais de fundo */}
      <section className="mx-auto w-full max-w-5xl rounded-3xl bg-white/10 px-6 py-12 text-white shadow-2xl backdrop-blur-md md:px-12">
        {/* Título principal do painel */}
        <h1 className="logo-font text-4xl font-bold leading-tight md:text-6xl">
          O painel inteligente para estudos e recrutamento
        </h1>

        {/* Subtítulo descritivo da plataforma */}
        <p className="mt-6 max-w-3xl text-lg leading-relaxed">
          Uma plataforma completa para segmentar perfis, gerir projetos e validar participantes num só lugar.
        </p>

        {/* Botão de chamada à ação ajustado ao estado do utilizador */}
        <div className="mt-10">
          <Link href={isLoggedIn ? '/dashboard' : '/inscrever-se'} className="btn">
            Explorar plataforma
          </Link>
        </div>
      </section>
    </main>
  )
}
