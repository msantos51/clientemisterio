'use client'

// Cabeçalho com navegação principal
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Header() {
  // Estado para indicar se o utilizador está autenticado
  const [isLogged, setIsLogged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verifica a sessão armazenada no localStorage
    const session = localStorage.getItem('cm_session')
    if (session) {
      try {
        const parsed = JSON.parse(session)
        setIsLogged(parsed.loggedIn === true)
      } catch {
        setIsLogged(false)
      }
    }
  }, [])

  // Termina a sessão e redireciona para a página inicial
  const handleSignOut = () => {
    localStorage.removeItem('cm_session')
    setIsLogged(false)
    router.push('/')
  }

  return (
    <header className="bg-transparent">
      {/* Barra de navegação principal */}
      <nav className="container mx-auto flex items-center justify-between p-6 text-white">
        {/* Logótipo ou nome do curso */}
        <Link href="/" className="text-2xl font-bold">
          Cliente Mistério
        </Link>
        {/* Ligações de navegação */}
        <div className="hidden space-x-6 md:flex">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        {/* Ações à direita */}
        <div className="space-x-4">
          <Link
            href="/comprar"
            className="rounded bg-yellow-400 px-4 py-2 font-semibold text-purple-900"
          >
            Inscrever-se
          </Link>
          {isLogged ? (
            <button onClick={handleSignOut} className="px-4 py-2">
              Sair
            </button>
          ) : (
            <Link href="/entrar" className="px-4 py-2">
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
