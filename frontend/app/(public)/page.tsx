'use client'

import Link from 'next/link'
import { useEffect, useState, type SVGProps } from 'react'

// Ícone de escudo representado apenas com linhas brancas
function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2 4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6z"
      />
    </svg>
  )
}

// Ícone de telemóvel desenhado com traços brancos
function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path strokeLinecap="round" d="M11 18h2" />
    </svg>
  )
}

// Ícone de relógio com linhas brancas
function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  )
}

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
      Icon: ShieldIcon,
      label: 'escudo',
      text: 'Equipa experiente',
    },
    {
      Icon: PhoneIcon,
      label: 'telemóvel',
      text: '100% online',
    },
    {
      Icon: ClockIcon,
      label: 'relógio',
      text: 'Aprendizagem ao seu ritmo',
    },
  ]

  return (
    <main>
      {/* Secção introdutória com texto informativo sobre Cliente Mistério */}
      <section className="p-4">
        {/* Caixa branca translúcida contendo o texto explicativo */}
        <div className="mx-auto w-full max-w-3xl rounded-lg bg-white/40 p-8 text-center text-white">
          {/* Texto introdutório em negrito fornecido pelo utilizador */}
          <p className="font-bold">
            Avalia marcas, recebe dinheiro e acumula produtos — oportunidades abertas por falta de clientes mistério certificados em Portugal.
          </p>
        </div>
      </section>

      {/* Secção inicial com título e botão de adesão */}
      <section className="flex flex-col items-center gap-8 p-4 text-center text-white">
        {/* Caixa branca translúcida que se ajusta ao tamanho do conteúdo */}
        <div className="mx-auto w-full max-w-3xl rounded-lg bg-white/40 p-8">
          {/* Bloco com o título principal e botão de adesão */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Título principal com a fonte Saira Stencil One e tamanho ajustado */}
            <h1 className="logo-font text-3xl font-bold leading-none md:text-7xl">
              <span className="block">CURSO</span>
              <span className="block">COMPLETO</span>
            </h1>
            {/* Mostra o preço antigo riscado e o preço atual */}
            <div className="text-2xl">
              <span className="mr-2 line-through">59,99€</span>
              <span className="font-bold">34,99€</span>
            </div>
            {/* Frase descritiva colocada abaixo do título */}
            <p className="text-base">
              O preço do curso é recuperado logo nas primeiras avaliações.
            </p>

            {/* Botão de adesão direciona para registo ou dashboard conforme sessão */}
            <Link
              href={isLoggedIn ? '/dashboard' : '/inscrever-se'}
              className="btn"
            >
              Adere já!
            </Link>
          </div>
        </div>
      </section>

      {/* Secção informativa com três caixas e símbolos associados */}
      <section className="mx-auto mt-12 grid gap-8 p-4 text-white max-w-3xl md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="mx-auto flex w-full flex-col items-center rounded-lg bg-white/40 p-6 text-center"
          >
            {/* Símbolo representativo da característica */}
            <feature.Icon
              role="img"
              aria-label={feature.label}
              className="mb-4 h-12 w-12 text-white"
            />
            {/* Texto descritivo da característica */}
            <p className="text-base font-bold">{feature.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

