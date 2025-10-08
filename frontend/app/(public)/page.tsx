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
      {/* Secção principal do curso alinhada com o cabeçalho e responsiva em duas colunas */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 py-8 text-white md:flex-row md:items-center md:justify-between md:px-6">
        {/* Bloco de texto alinhado com o cabeçalho e largura controlada para leitura confortável */}
        <div className="w-full max-w-3xl space-y-8 text-left md:flex-1 md:max-w-xl">
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

        {/* Imagem decorativa dimensionada para igualar a largura da coluna de texto */}
        <div className="flex w-full justify-center md:flex-1 md:max-w-xl">
          <Image
            src="/images/20250925_1000_Figura Peluda com Laptop_remix_01k601k0d4ekgapmarhdhhrh26.png"
            alt="Livro aberto encostado a um computador portátil com iluminação néon"
            width={1200}
            height={1200}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
      </section>
    </main>
  )
}
