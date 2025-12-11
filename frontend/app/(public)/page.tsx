'use client'

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

    // Container principal que aplica o fundo em toda a página
    <main
      className="flex min-h-screen w-full flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/banner_3.jpg')" }}
    >
      {/* Secção de destaque com cartão claro para legibilidade sobre o fundo */}
      <section className="mx-auto mt-6 w-full max-w-5xl rounded-3xl bg-white/90 px-6 py-12 text-center text-purple-700 shadow-2xl backdrop-blur-md md:mt-10 md:px-12">

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

    </main>
  )
}
