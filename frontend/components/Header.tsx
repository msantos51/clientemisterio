'use client'

// Cabeçalho principal com navegação e ações de sessão
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { logout } from '@/lib/api'

// Lista de ligações principais para o menu
const mainLinks = [
  { href: '/', label: 'Início' },
  { href: '/curso', label: 'Cursos e Formação' },
  { href: '/sobre-nos', label: 'Sobre Nós' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/faq', label: 'FAQs' },
  { href: '/enterprise', label: 'Enterprise' },
]

// Componente reutilizável que gera as ligações principais
// Recebe classe de estilo e ação opcional ao clicar
function MainLinks({
  linkClass,
  onClick,
}: {
  linkClass: string
  onClick?: () => void
}) {
  return (
    <>
      {mainLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={linkClass}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

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

// Ícone do menu hambúrguer exibido em ecrãs pequenos
const menuIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

// Ícone de fechar menu utilizado quando o menu móvel está aberto
const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Cabeçalho principal do site
export function Header() {
  // Estado que indica se o utilizador está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // Estado que controla a visibilidade do menu móvel
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Router para redirecionar após logout
  const router = useRouter()
  // Caminho atual para ocultar botões em páginas específicas
  const pathname = usePathname()

  // Função que verifica a sessão no localStorage
  const checkSession = () => {
    const session = localStorage.getItem('cm_session')
    try {
      const parsed = session ? JSON.parse(session) : null
      setIsLoggedIn(parsed?.loggedIn === true)
    } catch {
      setIsLoggedIn(false)
    }
  }

  // Verifica sessão inicial e ouve alterações através de evento personalizado
  useEffect(() => {
    checkSession()
    const handleSessionEvent = () => checkSession()
    window.addEventListener('cm-session', handleSessionEvent)
    return () => window.removeEventListener('cm-session', handleSessionEvent)
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
      // Dispara evento para informar outros componentes da alteração
      window.dispatchEvent(new Event('cm-session'))
      router.push('/')
    }
  }

  return (
    // Cabeçalho fixo no topo com fundo transparente e texto branco
    <header className="sticky top-0 z-50 bg-transparent text-white">
      {/* Contêiner a toda a largura para posicionar o logótipo à esquerda e ações à direita */}
      <div className="relative flex w-full items-center justify-between p-4 md:p-6">
        {/* Agrupamento do logótipo e das ligações principais alinhado ao canto superior esquerdo */}
        <div className="flex items-center gap-8">
          {/* Logótipo com slogan, alinhado à esquerda do ecrã */}
          <Link
            href="/"
            className="flex flex-col leading-none text-white"
            aria-label="Página inicial"
          >
            {/* Sigla principal do site */}
            <span className="logo-font text-5xl font-bold">CM</span>
          </Link>

          {/* Menu principal alinhado imediatamente após o logótipo */}
          <nav className="hidden flex-nowrap items-center gap-8 whitespace-nowrap md:flex">
            <MainLinks linkClass="text-lg font-bold hover:underline" />
          </nav>
        </div>

        {/* Área de ações posicionada no canto superior direito do cabeçalho */}
        <div className="flex flex-shrink-0 items-center gap-4 md:gap-6">
          {isLoggedIn ? (
            <>
              {/* Liga o aluno ao dashboard pessoal quando não está já lá */}
              {pathname !== '/dashboard' && (
                <Link href="/dashboard" className="btn">
                  Área Pessoal
                </Link>
              )}
              {/* Botão de logout visível quando autenticado */}
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </>
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
          {/* Botão que abre ou fecha o menu móvel, visível apenas em ecrãs pequenos */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="btn md:hidden"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? closeIcon : menuIcon}
          </button>
        </div>

        {/* Menu móvel apresentado abaixo do cabeçalho quando ativo */}
        {isMenuOpen && (
          <>
            {/* Área transparente que permite fechar o menu ao clicar fora */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu móvel com fundo branco translúcido */}
            <nav className="absolute left-0 top-full z-50 w-full bg-white/80 text-black md:hidden">
              <div className="flex flex-col items-center space-y-4 p-4">
                <MainLinks
                  linkClass="text-lg font-bold hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

