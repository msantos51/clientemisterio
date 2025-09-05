import Link from 'next/link'

// Cabeçalho com navegação principal
export function Header() {
  return (
    // Cabeçalho fixo com elementos distribuídos em três colunas
    <header className="fixed left-0 right-0 top-0">
      {/* Barra de navegação com texto do logótipo, menus centrais e ícones à direita */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6 text-white text-lg font-bold">
        {/* Texto do logótipo no canto superior esquerdo */}
        <div className="flex flex-1 justify-start">
          <Link href="/" aria-label="Página inicial">
            <span className="text-2xl font-bold">Cliente Mistério</span>
          </Link>
        </div>
        {/* Menus de navegação centrados */}
        <div className="flex flex-1 justify-center space-x-6">
          <Link href="/">Início</Link>
          <Link href="/curso">Curso</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/enterprise">Enterprise</Link>
        </div>
        {/* Ícones de login e pesquisa no canto superior direito */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/entrar" aria-label="Fazer login" className="inline-flex">
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
          </Link>
          <Link href="#" aria-label="Pesquisar" className="inline-flex">
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
          </Link>
        </div>
      </nav>
    </header>
  )
}

