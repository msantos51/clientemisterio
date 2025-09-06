import Link from 'next/link'
import Image from 'next/image'
import { Faq } from '@/components/Faq'

// Página inicial com título destacado e imagem
export default function HomePage() {
  return (
    <main>
      {/* Secção inicial com título e botão de adesão alinhada ao topo */}
      <section className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-16 md:text-left">
        {/* Bloco esquerdo com o título principal e botão de adesão */}
        <div className="flex flex-col items-center justify-center space-y-8 md:items-start">
          <h1 className="text-4xl font-bold leading-none md:text-8xl">
            <span className="block">CURSO</span>
            <span className="block">COMPLETO</span>
          </h1>
          <Link
            href="/inscrever-se"
            className="rounded bg-white px-10 py-4 font-bold text-[#fb4444]"
          >
            Adere já!
          </Link>
        </div>
        {/* Bloco direito com imagem abstrata branca */}
        <div className="mt-8 flex justify-center md:mt-0">
          <Image
            src="/abstract-white.svg"
            alt="Imagem abstrata branca"
            width={320}
            height={320}
            className="h-64 w-64 md:h-80 md:w-80"
          />
        </div>
      </section>
      {/* Secção de perguntas frequentes */}
      <Faq />
    </main>
  )
}

