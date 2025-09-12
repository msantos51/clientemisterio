'use client'

// Página principal do dashboard com o curso disponível
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCurrentUser, updatePaymentStatus } from '@/lib/api'

export default function DashboardPage() {
  // Estado que indica se o utilizador já pagou
  // Inicializa com o valor guardado no localStorage, se existir
  const [hasPaid, setHasPaid] = useState<boolean | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('has_paid') === 'true' ? true : null
    }
    return null
  })
  // Permite aceder aos parâmetros da query string
  const searchParams = useSearchParams()

  // Ao montar o componente, obtém os dados do utilizador
  useEffect(() => {
    const success = searchParams.get('success')
    const action =
      success === 'true'
        ? updatePaymentStatus({ has_paid: true })
        : getCurrentUser()

    action
      .then((user) => {
        setHasPaid(user.has_paid)
        // Guarda no localStorage para que o curso fique disponível no futuro
        if (user.has_paid) {
          localStorage.setItem('has_paid', 'true')
        }
      })
      .catch(() => {
        // Em caso de erro (ex.: sessão expirada), usa o valor persistido
        if (localStorage.getItem('has_paid') === 'true') {
          setHasPaid(true)
        } else {
          setHasPaid(false)
        }
      })
  }, [searchParams])

  // Enquanto verifica o pagamento, mostra mensagem simples
  if (hasPaid === null) {
    return <p className="text-center">A carregar...</p>
  }

  // Apresenta o curso ou o botão de compra consoante o estado de pagamento
  return (
    <section className="pb-8">
      {/* Título do curso */}
      <h2 className="mb-4 text-center text-2xl font-bold">Curso Cliente Mistério</h2>

      {/* Se o curso não tiver sido pago, mostra botão de compra */}
      {!hasPaid && (
        <div className="mb-8 text-center">
          <a
            href="https://buy.stripe.com/7sY7sE7Dk0XCc8L8vH4sE00"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-white/80"
          >
            Comprar curso
          </a>
        </div>
      )}

      {/* Se o curso tiver sido pago, mostra o iframe do Genially */}
      {hasPaid && (
        <div
          className="mx-auto w-full max-w-3xl rounded-lg p-4"
          style={{ backgroundColor: 'rgba(238, 105, 46, 0.25)' }}
        >
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              paddingTop: 0,
              height: 0,
            }}
          >
            <iframe
              title="CURSO COMPLETO - CLIENTE MISTÉRIO"
              frameBorder={0}
              width={1200}
              height={675}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src="https://view.genially.com/68c2fc398c5abdf14fbb9cb7"
              allowFullScreen
              scrolling="yes"
            />
          </div>
        </div>
      )}
    </section>
  )
}
