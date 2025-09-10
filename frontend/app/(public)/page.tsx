'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// Página inicial com título destacado e texto informativo
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

  // Lista de caixas a apresentar na secção informativa
  const features = [
    {
      icon: '🛡️',
      iconLabel: 'escudo',
      text:
        'Confiança na equipa: Criado por especialistas em estudos de mercado, com experiência real em Cliente Mistério em Portugal.',
    },
    {
      icon: '📱',
      iconLabel: 'telemóvel',
      text:
        'Flexibilidade total: 100% online — faz o curso no telemóvel, tablet ou computador, ao teu ritmo.',
    },
    {
      icon: '🚀',
      iconLabel: 'foguetão',
      text:
        'Resultados rápidos: Aprendizagem prática — módulos curtos, exemplos reais, checklists e quizzes para passares da teoria à ação.',
    },
  ]

  return (
    <main>
      {/* Secção inicial com título e botão de adesão */}
      <section className="flex flex-col items-center gap-8 text-center text-white">

        {/* Caixa branca translúcida que se ajusta ao tamanho do conteúdo */}
        <div className="w-fit rounded-lg bg-white/40 p-8">

          {/* Bloco com o título principal e botão de adesão */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Título principal com a fonte Saira Stencil One */}
            <h1 className="logo-font text-4xl font-bold leading-none md:text-8xl">
              <span className="block">CURSO</span>
              <span className="block">COMPLETO</span>
            </h1>
            {/* Frase descritiva colocada abaixo do título */}
            <p className="text-base">Avalia marcas, recebe dinheiro e acumula produtos.</p>

            {/* Botão de adesão direciona para registo ou dashboard conforme sessão */}
            <Link
              href={isLoggedIn ? '/dashboard' : '/inscrever-se'}
              className="join-button"
            >
              Adere já!
            </Link>
          </div>
        </div>
      </section>

      {/* Secção informativa com três caixas e símbolos associados */}
      <section className="mt-12 grid gap-6 p-4 text-black md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg bg-white/40 p-6 text-center"
          >
            {/* Símbolo representativo da característica */}
            <span
              role="img"
              aria-label={feature.iconLabel}
              className="mb-4 text-4xl"
            >
              {feature.icon}
            </span>
            {/* Texto descritivo da característica */}
            <p className="text-base">{feature.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
