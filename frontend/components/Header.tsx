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
        {/* Ligações de navegação para as páginas principais */}
        <div className="space-x-6">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/enterprise">Enterprise</Link>
        </div>
      </nav>
    </header>
  )
}
