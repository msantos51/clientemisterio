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
    // Cabeçalho fixo no topo com fundo transparente e texto branco
    <header className="sticky top-0 z-50 bg-transparent text-white">
      {/* Contêiner com largura máxima e itens dispostos numa única linha */}
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
        {/* Logótipo alinhado à esquerda */}
        <Link
          href="/"
          className="text-5xl font-bold text-white logo-font"
          aria-label="Página inicial"
        >
          CM
        </Link>

        {/* Menu principal alinhado ao centro */}
        <nav className="flex flex-1 justify-center space-x-6">
          <MainLinks linkClass="hover:underline" />
        </nav>

        {/* Ícones de pesquisa e perfil alinhados à direita */}
        <div className="flex items-center space-x-4">
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

