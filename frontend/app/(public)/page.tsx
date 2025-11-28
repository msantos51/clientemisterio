'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Página inicial dedicada à apresentação do painel inteligente
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
    // Container principal com espaçamento uniforme
    <main className="flex min-h-screen flex-col items-center">

      {/* Secção de destaque sem elementos visuais de fundo, com conteúdo centralizado */}
      <section className="mx-auto w-full max-w-5xl rounded-3xl bg-white/10 px-6 py-12 text-white text-center shadow-2xl backdrop-blur-md md:px-12">
        {/* Título principal atualizado da plataforma, centrado horizontalmente */}

        <h1 className="logo-font text-4xl font-bold leading-tight md:text-6xl">
          A plataforma inteligente para recolha e gestão de estudos
        </h1>


        {/* Subtítulo descritivo da plataforma, centrado e com largura máxima controlada */}
        <p className="mt-6 mx-auto max-w-3xl text-lg leading-relaxed">
          Recrutamento, formação e execução de projetos num só lugar — para empresas e avaliadores
        </p>

        {/* Conjunto de botões de chamada à ação alinhados e centralizados, com ordem solicitada */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={isLoggedIn ? '/dashboard' : '/inscrever-se'} className="btn btn-outline">
            Sou Cliente Mistério
          </Link>
          <Link href="/enterprise" className="btn">
            Sou Empresa

          </Link>
        </div>
      </section>

      {/* Faixa inferior com as ilustrações alinhadas, reforçando visualmente a proposta */}
      <section className="mt-auto w-full bg-gradient-to-t from-white/10 via-white/5 to-transparent px-4 py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-8">
          <Image
            src="/images/undraw_presentation_4ik4.svg"
            alt="Ilustração de apresentação"
            width={360}
            height={240}
            className="max-w-full drop-shadow-2xl"
            priority
          />
          <Image
            src="/images/undraw_referral_ihsd.svg"
            alt="Ilustração de referência"
            width={360}
            height={240}
            className="max-w-full drop-shadow-2xl"
            priority
          />
          <Image
            src="/images/undraw_visual-data_1eya.svg"
            alt="Ilustração de dados visuais"
            width={360}
            height={240}
            className="max-w-full drop-shadow-2xl"
            priority
          />
        </div>
      </section>
    </main>
  )
}
