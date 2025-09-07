import Link from 'next/link'
import { Faq } from '@/components/Faq'

// Página inicial com título destacado e texto informativo
export default function HomePage() {
  return (
    <main>
      {/* Secção inicial com título e botão de adesão */}
      <section className="mt-10 flex flex-col items-center gap-8 text-center text-white">
        {/* Bloco com o título principal e botão de adesão */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-4xl font-bold leading-none md:text-8xl">
            <span className="block">CURSO</span>
            <span className="block">COMPLETO</span>
          </h1>
          <Link
            href="/inscrever-se"
            className="rounded bg-[#F66400] px-10 py-4 font-bold text-white hover:bg-[#F66400]/80"
          >
            Adere já!
          </Link>
        </div>
      </section>
      {/* Secção de perguntas frequentes */}
      <Faq />
    </main>
  )
}

