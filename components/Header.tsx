'use client'

// Cabeçalho com navegação principal
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Header() {
  // Estado para verificar se o utilizador está autenticado
  const [isLogged, setIsLogged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Lê a sessão guardada no localStorage
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

  // Remove a sessão e volta à página inicial
  const handleSignOut = () => {
    localStorage.removeItem('cm_session')
    setIsLogged(false)
    router.push('/')
  }

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold">
          Cliente Mistério
        </Link>
        <div className="space-x-4">
          <Link href="/">Início</Link>
          <Link href="/aluno">Conteúdo do Curso</Link>
          <Link href="/comprar">Comprar</Link>
          {isLogged ? (
            <button onClick={handleSignOut}>Sair</button>
          ) : (
            <Link href="/entrar">Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  )
}
