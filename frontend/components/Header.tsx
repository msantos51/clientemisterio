import Link from 'next/link'

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

// Lista de ligações com ícones para ações rápidas
const iconLinks = [
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
]

// Cabeçalho principal do site
export function Header() {
  return (
    // Cabeçalho aderente ao topo com fundo transparente e texto branco
    <header className="sticky top-0 z-50 bg-transparent text-white">
      {/* Contêiner principal com espaçamento */}
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        {/* Linha superior com menu hambúrguer (apenas mobile), logótipo e ícones */}
        <div className="grid grid-cols-3 items-center">
          {/* Menu hambúrguer exibido apenas em dispositivos móveis */}
          <details className="relative md:hidden">
            {/* Ícone do menu que abre as ligações principais */}
            <summary className="flex cursor-pointer items-center justify-start list-none marker:content-none">
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
            {/* Lista de ligações exibida ao abrir o menu com fundo branco translúcido e texto branco */}
            <nav className="absolute left-0 mt-2 flex flex-col space-y-2 bg-white/40 p-4 text-white shadow">
              <MainLinks linkClass="hover:underline" />
            </nav>
          </details>

          {/* Logótipo central com texto 'CM' em branco e fonte Squarish Sans */}
          <div className="text-center">
            <Link
              href="/"
              className="text-3xl font-bold text-white logo-font"
              aria-label="Página inicial"
            >
              CM
            </Link>
          </div>

          {/* Ícones de pesquisa e perfil no lado direito */}
          <div className="flex items-center justify-end space-x-4">
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

        {/* Menu principal exibido horizontalmente abaixo do logótipo em ecrãs maiores */}
        <nav className="mt-4 hidden justify-center space-x-6 md:flex">
          <MainLinks linkClass="hover:underline" />
        </nav>
      </div>
    </header>
  )
}

