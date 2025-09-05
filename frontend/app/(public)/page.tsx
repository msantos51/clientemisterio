import Link from 'next/link'

// Página inicial com título centralizado e botão de registo
export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      {/* Texto principal exibido no centro da página */}
      <h1 className="text-4xl font-bold">Curso Completo - Cliente Mistério</h1>
      {/* Botão que redireciona para a página de registo */}
      <Link
        href="/inscrever-se"
        className="mt-6 rounded bg-white px-8 py-3 font-medium text-[#b82c3c]"
      >
        Adere já
      </Link>
    </section>
  )
}
