'use client'

import Link from 'next/link'
import { useEffect, useState, type SVGProps } from 'react'

// Conjunto de palavras utilizadas no efeito de escrita do texto principal
const typingWords = ['dinheiro', 'produtos', 'ofertas', 'descontos'] as const



// Intervalo entre cada letra escrita em milissegundos
const TYPING_SPEED = 120

// Pausa antes de iniciar a próxima palavra em milissegundos
const TYPING_PAUSE = 1500

// Largura mínima do espaço reservado para evitar alterações bruscas no layout
const TYPING_PLACEHOLDER_MIN_WIDTH = `${Math.max(...typingWords.map((word) => word.length))}ch`

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

// Tipo que descreve cada bloco informativo apresentado na secção inferior
type Feature = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  label: string
  text: string
}

// Página inicial com título destacado e texto informativo
export default function HomePage() {
  // Estado que indica se o utilizador está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Estado que guarda o índice da palavra atual do efeito de escrita
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  // Estado que armazena a porção já escrita da palavra atual
  const [typedText, setTypedText] = useState('')

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

  // Controla o efeito de escrita letra a letra para o texto principal
  useEffect(() => {
    const currentWord = typingWords[currentWordIndex]

    if (typedText.length < currentWord.length) {
      const typingTimeout = window.setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1))
      }, TYPING_SPEED)

      return () => window.clearTimeout(typingTimeout)
    }

    const pauseTimeout = window.setTimeout(() => {
      setTypedText('')
      setCurrentWordIndex((previousIndex) => (previousIndex + 1) % typingWords.length)
    }, TYPING_PAUSE)

    return () => window.clearTimeout(pauseTimeout)
  }, [currentWordIndex, typedText])

  const features: Feature[] = [
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
          {/* Texto principal com efeito de escrita nas palavras finais */}
          <p className="font-bold text-center">
            Avalia marcas, recebe{' '}

            <span
              aria-live="polite"
              className="inline-block whitespace-nowrap align-baseline"
              style={{ minWidth: TYPING_PLACEHOLDER_MIN_WIDTH, textAlign: 'left' }}
            >
              {typedText}

            </span>
          </p>
          {/* Mensagem adicional apresentada logo abaixo */}
          <p className="mt-2 text-center">
            Há falta de clientes mistério certificados em Portugal, aproveita já!
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
      <section className="mx-auto mt-12 grid max-w-3xl gap-8 p-4 text-white md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="mx-auto flex w-full flex-col items-center rounded-lg bg-white/40 p-6 text-center"
          >
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

