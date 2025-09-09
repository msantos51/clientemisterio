'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// Página inicial com título destacado e texto informativo
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
    <main>
      {/* Secção inicial com título e botão de adesão */}
      <section className="flex flex-col items-center gap-8 text-center text-white">

        {/* Caixa branca translúcida que se ajusta ao tamanho do conteúdo */}
        <div className="w-fit rounded-lg bg-white/40 p-8">

          {/* Bloco com o título principal e botão de adesão */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Título principal com a fonte Saira Stencil One */}
            <h1 className="logo-font text-4xl font-bold leading-none md:text-8xl">
              <span className="block">CURSO</span>
              <span className="block">COMPLETO</span>
            </h1>

            {/* Botão de adesão direciona para registo ou dashboard conforme sessão */}
            <Link
              href={isLoggedIn ? '/dashboard' : '/inscrever-se'}
              className="join-button"
            >
              Adere já!
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
