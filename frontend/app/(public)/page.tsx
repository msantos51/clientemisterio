// Página inicial com design inspirado em landing pages modernas
import Link from 'next/link'
import { Faq } from '@/components/Faq'

export default function HomePage() {
  return (
    <>
      {/* Secção hero com cruz vermelha ao fundo e chamada para ação */}
      <section className="hero-cross flex items-center py-32">
        {/* Bloco de texto principal alinhado à esquerda */}
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-5xl font-bold text-red-900">Your Gateway to Market Success</h1>
          <p className="text-lg text-gray-700">
            Expansion shouldn&apos;t be guesswork. We guide companies into new markets with clear steps, reliable partners and measurable results.
          </p>
          <Link
            href="/contacto"
            className="inline-block rounded-full bg-red-700 px-8 py-3 font-semibold text-white"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      {/* Secção com características do curso */}
      <section className="mx-auto grid max-w-4xl gap-6 pb-20 text-center md:grid-cols-3">
        {/* Primeira característica */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4h18v16H3z" />
              <path d="M12 4v16" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">Curso completo</h3>
        </div>
        {/* Segunda característica */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21c1.5-4 5-4 6.5-4s5 0 6.5 4" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">Equipa experiente</h3>
        </div>
        {/* Terceira característica */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 00-9 4 6 6 0 019 4" />
              <path d="M6 8a6 6 0 019 4 6 6 0 01-9 4" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">Acesso vitalício</h3>
        </div>
      </section>

      {/* Secção de perguntas frequentes */}
      <Faq />
    </>
  )
}
