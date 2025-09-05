import Link from 'next/link'

// Cabeçalho com navegação principal
export function Header() {
  return (
    <header className="bg-gray-100">
      {/* Barra de navegação principal */}
      <nav className="container mx-auto flex items-center justify-between p-6 text-gray-800">
        {/* Logótipo ou nome do site */}
        <Link href="/" className="text-3xl font-bold text-red-700">
          Cliente Mistério
        </Link>
        {/* Ligações de navegação */}
        <div className="hidden space-x-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#philosophy">Philosophy</Link>
          <Link href="#development">Development</Link>
          <Link href="#career">Career</Link>
          <Link href="/contacto">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
