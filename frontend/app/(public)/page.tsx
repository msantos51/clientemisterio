import Link from 'next/link'

// Página inicial com título destacado e texto informativo
export default function HomePage() {
  return (
    <main>
      {/* Secção inicial com título e botão de adesão */}
      <section className="mt-10 flex flex-col items-center gap-8 text-center text-white">

        {/* Caixa branca translúcida que se ajusta ao tamanho do conteúdo */}
        <div className="w-fit rounded-lg bg-white/40 p-8">

          {/* Bloco com o título principal e botão de adesão */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <h1 className="text-4xl font-bold leading-none md:text-8xl">
              <span className="block">CURSO</span>
              <span className="block">COMPLETO</span>
            </h1>
            {/* Botão de chamada para a página de registo */}
            <Link href="/inscrever-se" className="block">
              <button type="button" className="join-button">
                Adere já!
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

