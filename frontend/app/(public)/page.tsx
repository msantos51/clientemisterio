import Link from 'next/link'

// Página inicial com título destacado e espaço para imagem ou vídeo
export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center gap-16">
      {/* Bloco esquerdo com o título principal e botão de adesão */}
      <div className="flex flex-col items-start justify-center space-y-8">
        <h1 className="text-8xl font-bold leading-none">
          <span className="block">CURSO</span>
          <span className="block">COMPLETO</span>
        </h1>
        <Link
          href="/inscrever-se"
          className="rounded bg-white px-10 py-4 font-medium text-[#b53de6]"
        >
          Adere já!
        </Link>
      </div>
      {/* Bloco direito com caixa vazia para imagem ou vídeo futuro */}
      <div className="flex justify-center">
        <div className="h-80 w-80 border-2 border-white" />
      </div>
    </section>
  )
}
