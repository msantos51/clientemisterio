'use client'

// Página que confirma a conta usando o token enviado por email
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { confirmAccount } from '@/lib/api'

type Status = 'loading' | 'success' | 'error'

export default function ConfirmAccountPage({ params }: { params: { token: string } }) {
  // Estado para controlar a mensagem apresentada ao utilizador
  const [status, setStatus] = useState<Status>('loading')
  const [message, setMessage] = useState('A confirmar conta...')

  // Ao montar o componente tenta confirmar a conta
  useEffect(() => {
    confirmAccount(params.token)
      .then((user) => {
        setStatus('success')
        setMessage(
          `Conta confirmada com sucesso para ${user.name}. Já pode iniciar sessão na plataforma.`,
        )
      })
      .catch((err: unknown) => {
        setStatus('error')
        if (err instanceof Error) setMessage(err.message)
        else setMessage('Não foi possível confirmar a conta.')
      })
  }, [params.token])

  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-6 pb-20 text-center">
      <h1 className="text-2xl font-bold">Confirmação de conta</h1>
      <p className={`max-w-md ${status === 'error' ? 'text-red-600' : 'text-green-500'}`}>{message}</p>
      <Link href="/entrar" className="btn">
        Ir para login
      </Link>
    </section>
  )
}
