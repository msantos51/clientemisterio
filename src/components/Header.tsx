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
        <nav className="flex items-center space-x-4 text-white">
          <Link href="/" className="hover:text-accent">
            INÍCIO
          </Link>
          <Link href="/cursos" className="hover:text-accent">
            CURSOS
          </Link>
          <Link href="/contactos" className="hover:text-accent">
            CONTACTOS
          </Link>
          {/* Ícone para aceder ao ecrã de login */}
          <Link href="/login" className="hover:text-accent">
            {/* Ícone de utilizador simples */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              {/* Cabeça do utilizador */}
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              {/* Corpo do utilizador */}
              <path d="M12 14c-3.33 0-6 2.69-6 6h12c0-3.31-2.67-6-6-6z" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
