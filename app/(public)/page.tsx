// Página inicial com apresentação do curso
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <section className="py-20 text-center">
        {/* Título principal do site */}
        <h1 className="text-4xl font-bold text-white">Curso Cliente Mistério</h1>
        {/* Descrição breve do curso */}
        <p className="mt-4 text-gray-200">Aprenda a avaliar serviços como um cliente oculto.</p>
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
      {/* Secção com informações detalhadas do curso */}
      <section className="mx-auto mt-12 max-w-2xl text-left text-white">
        <h2 className="text-2xl font-semibold">Informações do Curso</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>5 módulos com exemplos práticos</li>
          <li>Acesso durante 12 meses</li>
          <li>Certificado de conclusão</li>
        </ul>
      </section>
    </>
  )
}
