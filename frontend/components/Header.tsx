import Link from 'next/link'

// Lista de ligações principais para o menu
const mainLinks = [
  { href: '/', label: 'Início' },
  { href: '/curso', label: 'Curso' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/enterprise', label: 'Enterprise' },
]

// Lista de ligações com ícones para ações rápidas
const iconLinks = [
  {
    href: '/entrar',
    label: 'Fazer login',
    icon: (
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
    ),
  },
  {
    href: '#',
    label: 'Pesquisar',
    icon: (
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
    ),
  },
]

// Cabeçalho com navegação principal
export function Header() {
  return (
    // Cabeçalho fixo com fundo vermelho
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#fb4444]">
      {/* Barra de navegação principal */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4 text-lg font-bold text-white md:p-6">
        {/* Logótipo no canto superior esquerdo */}
        <div className="flex flex-1 justify-start">
          <Link href="/" aria-label="Página inicial">
            <span className="text-2xl font-bold">Cliente Mistério</span>
          </Link>
        </div>

        {/* Menu central visível apenas em ecrãs médios para cima */}
        <div className="hidden flex-1 justify-center space-x-6 md:flex">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Ícones à direita visíveis apenas em ecrãs médios para cima */}
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          {iconLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="inline-flex"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Menu mobile utilizando <details> para dispensar JavaScript */}
        <details className="md:hidden">
          {/* Botão que abre ou fecha o menu */}
          <summary
            aria-label="Abrir menu"
            className="cursor-pointer list-none marker:content-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>
          {/* Conteúdo do menu apresentado quando aberto */}
          <div className="absolute left-0 right-0 top-full flex w-full flex-col items-center space-y-4 bg-[#fb4444] p-4 text-lg font-bold text-white">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-4">
              {iconLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  className="inline-flex"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </details>
      </nav>
    </header>
  )
}

