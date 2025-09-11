'use client'

// Página principal do dashboard com o curso disponível
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/api'

export default function DashboardPage() {
  // Estado que indica se o utilizador já pagou (null durante o carregamento)
  const [hasPaid, setHasPaid] = useState<boolean | null>(null)

  // Ao montar o componente, obtém os dados do utilizador
  useEffect(() => {
    getCurrentUser()
      .then((user) => setHasPaid(user.has_paid))
      .catch(() => setHasPaid(false))
  }, [])

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
