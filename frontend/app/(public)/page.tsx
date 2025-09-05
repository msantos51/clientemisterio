'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Faq } from '@/components/Faq'

// Lista de frases a serem alternadas na caixa
const phrases = [
  'Recebe produtos gratuitos para experimentar',
  'Ganha dinheiro ao dar a tua opinião',
  'Testa serviços e marcas em primeira mão',
  'Ofertas exclusivas só para clientes mistério',
  'Ajuda as empresas a melhorar e é recompensado',
  'Transforma avaliações em oportunidades',
  'Participa em missões divertidas e pagas',
  'A tua opinião tem valor — e é paga por isso',
  'Experimenta antes de todos os outros',
  'Converte o teu tempo livre em recompensas',
]

// Página inicial com título destacado e caixa de frases rotativas
export default function HomePage() {
  // Índice da frase atual a ser mostrada
  const [index, setIndex] = useState(0)

  // Altera a frase a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      5000
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {/* Secção inicial com título e frases rotativas */}
      <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center gap-16">
        {/* Bloco esquerdo com o título principal e botão de adesão */}
        <div className="flex flex-col items-start justify-center space-y-8">
          <h1 className="text-8xl font-bold leading-none">
            <span className="block">CURSO</span>
            <span className="block">COMPLETO</span>
          </h1>
          <Link
            href="/inscrever-se"
            className="rounded bg-white px-10 py-4 font-bold text-[#b53de6]"
          >
            Adere já!
          </Link>
        </div>
        {/* Bloco direito com caixa que exibe frases rotativas */}
        <div className="flex justify-center">
          <div className="flex h-80 w-80 items-center justify-center border-2 border-white p-4 text-center">
            <p>{phrases[index]}</p>
          </div>
        </div>
      </section>
      {/* Secção de perguntas frequentes */}
      <Faq />
    </main>
  )
}
