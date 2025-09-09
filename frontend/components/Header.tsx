'use client'

// Cabeçalho principal com navegação e ações de sessão
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api'

// Lista de ligações principais para o menu
const mainLinks = [
  { href: '/', label: 'Início' },
  { href: '/curso', label: 'Curso' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/faq', label: 'FAQs' },
  { href: '/enterprise', label: 'Enterprise' },
]

// Componente reutilizável que gera as ligações principais
function MainLinks({ linkClass }: { linkClass: string }) {
  return (
    <>
      {mainLinks.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
    </>
  )
}

// Ícone de pesquisa reutilizável
const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <circle cx="11" cy="11" r="8" />
    <line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Ícone de utilizador para o botão de login
const loginIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <circle cx="12" cy="8" r="4" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 20c0-4 4-6 8-6s8 2 8 6"
    />
  </svg>
)

// Cabeçalho principal do site
export function Header() {
  // Estado que indica se o utilizador está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // Router para redirecionar após logout
  const router = useRouter()

  // Verifica no localStorage se existe sessão ativa
  useEffect(() => {
    const session = localStorage.getItem('cm_session')
    try {
      const parsed = session ? JSON.parse(session) : null
      setIsLoggedIn(parsed?.loggedIn === true)
    } catch {
      setIsLoggedIn(false)
    }
  }, [])

  // Termina a sessão ao clicar no botão de logout
  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // ignora erros de rede
    } finally {
      localStorage.removeItem('cm_session')
      setIsLoggedIn(false)
      router.push('/')
    }
  }

  return (
    // Cabeçalho fixo no topo com fundo transparente e texto branco
    <header className="sticky top-0 z-50 bg-transparent text-white">
      {/* Contêiner com largura máxima e itens dispostos numa única linha */}
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
        {/* Logótipo com slogan, alinhado à esquerda */}
        <Link
          href="/"
          className="flex flex-col leading-none text-white"
          aria-label="Página inicial"
        >
          {/* Sigla principal do site */}
          <span className="logo-font text-5xl font-bold">CM</span>


        </Link>

        {/* Menu principal alinhado ao centro com links maiores, a negrito e espaçados */}
        <nav className="flex flex-1 justify-center space-x-8">
          <MainLinks linkClass="text-lg font-bold hover:underline" />
        </nav>

        {/* Área de ações no canto superior direito */}
        <div className="flex items-center space-x-4">
          {/* Link para pesquisa (não funcional) */}
          <Link href="#" aria-label="Pesquisar" className="inline-flex">
            {searchIcon}
          </Link>

          {isLoggedIn ? (
            // Botão de logout visível quando autenticado
            <button
              onClick={handleLogout}
              className="rounded bg-black px-4 py-1 text-white hover:bg-black/80"
            >
              Logout
            </button>
          ) : (
            // Ícone de login quando não autenticado
            <Link
              href="/entrar"
              aria-label="Fazer login"
              className="inline-flex"
            >
              {loginIcon}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

