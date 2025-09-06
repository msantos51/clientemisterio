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
    // Cabeçalho aderente ao topo com fundo preto e texto branco
    <header className="sticky top-0 z-50 bg-black text-white">
      {/* Contêiner com três colunas para alinhar os elementos */}
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center p-4 md:p-6">
        {/* Menu hambúrguer no lado esquerdo */}
        <details className="relative">
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
          {/* Lista de ligações exibida ao abrir o menu */}
          <nav className="absolute left-0 mt-2 flex flex-col space-y-2 bg-black p-4 shadow">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </details>

        {/* Logótipo central com ligação para a página inicial */}
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold" aria-label="Página inicial">
            Cliente Mistério
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
    </header>
  )
}

