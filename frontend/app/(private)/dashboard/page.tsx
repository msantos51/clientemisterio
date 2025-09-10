'use client'

// Página principal do dashboard com o curso disponível
import Link from 'next/link'

export default function DashboardPage() {
  // Apresenta o curso e opção de compra
  return (
    <section className="pb-8">
      {/* Título do curso */}
      <h2 className="mb-4 text-center text-2xl font-bold">Curso Cliente Mistério</h2>

      {/* Botão para compra do curso */}
      <div className="mb-8 text-center">
        <Link
          href="/comprar"
          className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-white/80"
        >
          Comprar curso
        </Link>
      </div>

      {/* Contêiner responsivo com o iframe do curso */}
      <div
        className="mx-auto w-full max-w-3xl rounded-lg p-4"
        style={{ backgroundColor: 'rgba(238, 105, 46, 0.25)' }}
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            paddingTop: 0,
            height: 0,
          }}
        >
          <iframe
            title="Curso Completo Cliente Mistério"
            frameBorder={0}
            width={800}
            height={450}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            src="https://view.genially.com/68b97653b3a4717fa5a9e8b1"
            allowFullScreen
            scrolling="yes"
          />
        </div>
      </div>
    </section>
  )
}
