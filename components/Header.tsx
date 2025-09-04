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
    // Cabeçalho transparente sem barra branca
    <header className="bg-transparent">
      {/* Navegação principal com texto branco */}
      <nav className="container mx-auto flex items-center justify-between p-4 text-white">
        {/* Título e pequena descrição do curso */}
        <div className="flex flex-col">
          <Link href="/" className="font-bold">
            Cliente Mistério
          </Link>
          <span className="text-sm">Curso online de avaliação de serviços</span>
        </div>
        {/* Ligações de navegação para páginas principais */}
        <div className="space-x-4">
          <Link href="/">Início</Link>
          <Link href="/aluno">Conteúdo do Curso</Link>
          <Link href="/comprar">Comprar</Link>
          {isLogged ? (
            // Botão de saída quando o utilizador está autenticado
            <button onClick={handleSignOut}>Sair</button>
          ) : (
            // Link para a página de entrada quando não autenticado
            <Link href="/entrar">Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  )
}
