import Link from 'next/link';

// Cabeçalho fixo com navegação principal
export default function Header() {
  return (
    // Cabeçalho fixo transparente no topo da página
    <header className="fixed top-0 z-50 w-full bg-transparent">
      {/* Contêiner centralizado com espaçamento interno */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logotipo com texto branco */}
        <Link href="/" className="font-bold text-lg text-white">
          CLIENTE MISTÉRIO
        </Link>
        {/* Navegação principal com itens em branco e realce azul ao passar o rato */}
        <nav className="space-x-4 text-white">
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
