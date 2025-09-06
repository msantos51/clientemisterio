import Link from 'next/link'
import { Faq } from '@/components/Faq'

// Página inicial com título destacado e texto informativo
export default function HomePage() {
  return (
    <main>
      {/* Secção inicial com título, botão de adesão e margem superior */}
      <section className="mt-10 flex flex-col items-center gap-8 text-center md:flex-row md:gap-16 md:text-left">
        {/* Bloco esquerdo com o título principal e botão de adesão */}
        <div className="flex flex-col items-center justify-center space-y-8 md:items-start">
          <h1 className="text-4xl font-bold leading-none md:text-8xl">
            <span className="block">CURSO</span>
            <span className="block">COMPLETO</span>
          </h1>
          <Link
            href="/inscrever-se"
            className="rounded bg-black px-10 py-4 font-bold text-white hover:bg-black/80"
          >
            Adere já!
          </Link>
        </div>
        {/* Bloco direito com frase promocional e botão para empresas */}
        <div className="mt-8 flex flex-col items-center space-y-4 bg-black p-4 text-white md:mt-0 md:items-start">
          {/* Frase promocional apresentada em destaque com fundo preto */}
          <p className="text-2xl font-bold md:text-4xl">
            É uma empresa de estudos de mercado? Temos parcerias para lhe trazer clientes mistério formados &rarr;
          </p>
          {/* Botão invertido com fundo branco e texto preto */}
          <Link
            href="/enterprise"
            className="rounded bg-white px-10 py-4 font-bold text-black hover:bg-white/80"
          >
            Saiba mais
          </Link>
        </div>
      </section>
      {/* Secção de perguntas frequentes */}
      <Faq />
    </main>
  )
}

