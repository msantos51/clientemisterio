import Link from 'next/link'

// Cabeçalho com navegação principal
export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 bg-[#b82c3c]">
      {/* Barra de navegação principal */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6 text-white">
        {/* Nome do site no canto superior esquerdo */}
        <Link href="/" className="text-2xl font-bold">
          Cliente Mistério
        </Link>
        {/* Ligações de navegação para as páginas principais e ícone de perfil */}
        <div className="flex items-center space-x-6">
          <Link href="/">Início</Link>
          <Link href="/curso">Curso</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/enterprise">Enterprise</Link>
          {/* Ícone de perfil que redireciona para a página de login */}
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
        </div>
      </nav>
    </header>
  )
}

