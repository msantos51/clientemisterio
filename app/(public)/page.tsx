// Página inicial com apresentação do curso
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="py-20 text-center">
      {/* Título principal do site */}
      <h1 className="text-4xl font-bold">Curso Cliente Mistério</h1>
      {/* Descrição breve do curso */}
      <p className="mt-4 text-gray-600">Aprenda a avaliar serviços como um cliente oculto.</p>
      {/* Botões de chamada para ação */}
      <div className="mt-8 space-x-4">
        <Link href="/comprar" className="rounded bg-blue-600 px-4 py-2 text-white">
          Comprar curso
        </Link>
        <Link href="/entrar" className="rounded bg-gray-200 px-4 py-2">
          Entrar
        </Link>
      </div>
    </section>
  )
}
