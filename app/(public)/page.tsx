// Página inicial com layout inspirado em plataforma de cursos
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Secção hero com título, descrição e chamada para ação */}
      <section className="flex flex-col items-center justify-center gap-10 py-20 text-center">
        {/* Bloco de texto principal */}
        <div className="max-w-xl text-center">
          <h1 className="text-5xl font-bold text-white">Curso Completo de Cliente Mistério</h1>
          <p className="mt-4 text-lg text-gray-200">
            Desenvolve competências com cursos e certificados de especialistas.
          </p>
          <div className="mt-8">
            <Link
              href="/inscrever-se"
              className="rounded bg-yellow-400 px-6 py-3 font-semibold text-purple-900"
            >
              Adere já
            </Link>
          </div>
        </div>
      </section>
      {/* Secção com características do curso */}
      <section className="mx-auto grid max-w-4xl gap-6 pb-20 text-center md:grid-cols-3">
        {/* Primeira característica */}
        <div className="rounded-lg bg-white/20 p-6 backdrop-blur">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
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
          <h3 className="mt-4 text-lg font-semibold text-white">Curso completo</h3>
          <p className="mt-2 text-gray-200">Mais de 60 aulas práticas.</p>
        </div>
        {/* Segunda característica */}
        <div className="rounded-lg bg-white/20 p-6 backdrop-blur">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
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
          <h3 className="mt-4 text-lg font-semibold text-white">Instrutores experientes</h3>
          <p className="mt-2 text-gray-200">Profissionais reconhecidos.</p>
        </div>
        {/* Terceira característica */}
        <div className="rounded-lg bg-white/20 p-6 backdrop-blur">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
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
          <h3 className="mt-4 text-lg font-semibold text-white">Acesso vitalício</h3>
          <p className="mt-2 text-gray-200">Estuda ao teu ritmo.</p>
        </div>
      </section>
    </>
  )
}
