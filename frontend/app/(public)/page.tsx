import Link from 'next/link'

// Página inicial com dois blocos lado a lado: título e descrição
export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center">
      {/* Bloco esquerdo com o título principal */}
      <div className="flex w-1/2 justify-center">
        <h1 className="text-6xl font-bold">Curso Completo</h1>
      </div>
      {/* Bloco direito com a descrição e botão de registo */}
      <div className="w-1/2 px-8">
        <p className="text-xl">
          Baseado em experiência prática em projetos reais em Portugal, o curso apresenta de forma
          simples e objetiva tudo o que precisa de saber para começar ou evoluir nesta área.
        </p>
        <Link
          href="/inscrever-se"
          className="mt-6 inline-block rounded bg-white px-8 py-3 font-medium text-[#b82c3c]"
        >
          Adere já
        </Link>
      </div>
    </section>
  )
}
