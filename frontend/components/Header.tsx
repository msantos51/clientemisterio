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

// Logótipo reutilizável
const logo = (
  <Link href="/" aria-label="Página inicial">
    <span className="text-2xl font-bold">Cliente Mistério</span>
  </Link>
)

// Cabeçalho com navegação principal
export function Header() {
  return (
    // Cabeçalho aderente ao topo com fundo branco
    <header className="sticky top-0 z-50 bg-white">
      {/* Contêiner centralizado para o conteúdo do cabeçalho */}
      <div className="mx-auto max-w-6xl p-4 text-lg font-bold text-black md:p-6">
        {/* Navegação completa para ecrãs médios ou maiores */}
        <nav className="hidden items-center justify-between md:flex">
          {/* Logótipo no canto superior esquerdo */}
          <div className="flex flex-1 justify-start">{logo}</div>
          {/* Menu central */}
          <div className="flex flex-1 justify-center space-x-6">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          {/* Ícones à direita */}
          <div className="flex flex-1 items-center justify-end space-x-4">
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
        </nav>


        {/* Navegação mobile com menu expansível */}
        <details className="md:hidden">
          {/* Linha superior com logótipo e botão hambúrguer */}
          <summary className="flex cursor-pointer items-center justify-between list-none marker:content-none">
            {logo}

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

          {/* Lista de ligações apresentada quando o menu está aberto */}
          <div className="mt-4 flex flex-col items-center space-y-4">

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
      </div>
    </header>
  )
}

