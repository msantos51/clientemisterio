'use client'

// Página protegida que serve de dashboard do aluno
// Importa hooks e funções necessárias
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProtectedClient } from '../../../components/ProtectedClient'
import { getCurrentUser, updateUser } from '@/lib/api'

export default function DashboardPage() {
  // Estados para os dados do utilizador e mensagens
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // Ao montar a página, obtém a sessão e carrega os dados do utilizador
  useEffect(() => {
    const session = localStorage.getItem('cm_session')
    try {
      const parsed = session ? JSON.parse(session) : null
      if (parsed?.loggedIn) {
        getCurrentUser()
          .then((user) => {
            setName(user.name)
            setEmail(user.email)
          })
          .catch(() => setMessage('Erro ao carregar dados.'))
      } else {
        setMessage('Sessão inválida.')
      }
    } catch {
      setMessage('Sessão inválida.')
    }
  }, [])

  // Submete as alterações de perfil para a API
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    try {
      await updateUser({ name, email })
      setMessage('Dados atualizados com sucesso.')
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message)
      else setMessage('Erro ao atualizar dados.')
    }
  }

  return (
    <ProtectedClient>
      {/* Secção principal do dashboard sem margem superior */}
      <section className="pb-8">
        {/* Título principal do dashboard */}
        <h2 className="mb-4 text-center text-2xl font-bold">Curso Cliente Mistério</h2>
        {/* Frase motivacional para contextualizar o aluno */}
        <p className="mb-8 text-white">Explore o conteúdo interativo do curso.</p>

        {/* Link para a página de compra do curso */}
        <div className="mb-8 text-center">
          <Link
            href="/comprar"
            className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-white/80"
          >
            Comprar curso
          </Link>
        </div>

        {/* Contêiner responsivo com o iframe do curso em tamanho reduzido */}
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
              title="Curso Completo Cliente Mistério"
              frameBorder={0}
              width={800}
              height={450}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src="https://view.genially.com/68b97653b3a4717fa5a9e8b1"
              allowFullScreen
              scrolling="yes"
            />
          </div>
        </div>

        {/* Formulário para atualizar dados pessoais */}
        <h3 className="mt-8 text-xl font-bold">Atualizar dados pessoais</h3>
        <form onSubmit={handleUpdate} className="mt-4 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border border-white bg-black p-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-white bg-black p-2 text-white"
              required
            />
          </div>
          {message && <p className="text-sm text-red-600">{message}</p>}
          <button type="submit" className="join-button mt-2">
            Guardar
          </button>
        </form>
      </section>
    </ProtectedClient>
  )
}
