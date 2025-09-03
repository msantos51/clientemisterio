import Link from 'next/link';

// Cabeçalho fixo com navegação principal
export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-lg">
          CLIENTE MISTÉRIO
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-accent">
            INÍCIO
          </Link>
          <Link href="/cursos" className="hover:text-accent">
            CURSOS
          </Link>
          <Link href="/contactos" className="hover:text-accent">
            CONTACTOS
          </Link>
        </nav>
      </div>
    </header>
  );
}
