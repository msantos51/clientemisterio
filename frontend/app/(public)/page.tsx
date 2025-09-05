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
      <section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8 text-center md:flex-row md:gap-16 md:text-left">
        {/* Bloco esquerdo com o título principal e botão de adesão */}
        <div className="flex flex-col items-center justify-center space-y-8 md:items-start">
          <h1 className="text-4xl font-bold leading-none md:text-8xl">
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
        <div className="mt-8 flex justify-center md:mt-0">
          <div className="flex h-64 w-64 items-center justify-center border-2 border-white p-4 text-center md:h-80 md:w-80">
            <p>{phrases[index]}</p>
          </div>
        </div>
      </section>
      {/* Secção de perguntas frequentes */}
      <Faq />
    </main>
  )
}
