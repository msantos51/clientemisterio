import Link from 'next/link';

// Rodapé com informação legal e links úteis
export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="mb-4 text-sm text-gray-600">
          © {new Date().getFullYear()} Cliente Mistério. Todos os direitos reservados.
        </p>
        <div className="mb-4 flex justify-center space-x-4">
          {/* Ícones de métodos de pagamento (placeholders) */}
          <svg className="h-6 w-10" role="img" aria-label="Pagamento 1">
            <rect width="100%" height="100%" fill="#e5e7eb" />
          </svg>
          <svg className="h-6 w-10" role="img" aria-label="Pagamento 2">
            <rect width="100%" height="100%" fill="#e5e7eb" />
          </svg>
          <svg className="h-6 w-10" role="img" aria-label="Pagamento 3">
            <rect width="100%" height="100%" fill="#e5e7eb" />
          </svg>
        </div>
        <div className="mb-4">
          <Link href="https://instagram.com" className="text-accent hover:underline">
            Instagram
          </Link>
        </div>
        <div className="space-x-4 text-sm">
          <Link href="/termos" className="hover:underline">
            Termos
          </Link>
          <Link href="/politica-privacidade" className="hover:underline">
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
