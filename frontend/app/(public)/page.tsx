'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Página inicial com destaque para o curso disponível
export default function HomePage() {
  // Estado que indica se o utilizador está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Ao montar, verifica no localStorage se existe sessão ativa
  useEffect(() => {
    const session = localStorage.getItem('cm_session')
    try {
      const parsed = session ? JSON.parse(session) : null
      setIsLoggedIn(parsed?.loggedIn === true)
    } catch {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    // Container principal com espaçamento vertical de 1rem entre secções
    <main className="space-y-4">
      {/* Secção principal do curso com layout responsivo em duas colunas */}
      <section className="flex flex-col items-center gap-12 px-4 py-8 text-white md:flex-row md:items-center md:justify-between">
        {/* Bloco de texto limitado a 3xl para facilitar a leitura em ecrãs largos */}
        <div className="w-full max-w-3xl space-y-8 text-left md:max-w-xl">
          {/* Título principal com a fonte Saira Stencil One */}
          <h1 className="logo-font text-3xl font-bold leading-none md:text-7xl">
            <span className="block">CURSO</span>
            <span className="block">COMPLETO</span>
          </h1>

          {/* Mostra o preço antigo riscado e o preço atual */}
          <div className="flex items-baseline gap-2 text-2xl">
            <span className="line-through">59,99€</span>
            <span className="font-bold">34,99€</span>
          </div>

          {/* Frase descritiva colocada abaixo do título */}
          <p className="text-base">
            O preço do curso é recuperado logo nas primeiras avaliações.
          </p>

          {/* Botão de adesão direciona para registo ou dashboard conforme sessão */}
          <Link href={isLoggedIn ? '/dashboard' : '/inscrever-se'} className="btn self-start">
            Adere já!
          </Link>
        </div>

        {/* Imagem decorativa alinhada à direita para reforçar o tema tecnológico */}
        <div className="w-full max-w-2xl">
          <Image
            src="/images/20250924_1521_Líquido Roxo Flutuante_remix_01k5y1dwn5fh4b4z565bp0hmq2.png"
            alt="Livro aberto encostado a um computador portátil com iluminação néon"
            width={800}
            height={600}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
      </section>
    </main>
  )
}
