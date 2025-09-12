'use client'

// Página para atualização de dados pessoais
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, updateUser } from '@/lib/api'

export default function PersonalPage() {
  // Estados para armazenar nome, email, password e mensagens de feedback
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  // Router para redirecionar em caso de sessão inválida
  const router = useRouter()

  // Ao carregar a página, obtém os dados atuais do utilizador
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setName(user.name)
        setEmail(user.email)
      })
      .catch(() => {
        // Se não for possível obter dados, remove sessão e redireciona
        localStorage.removeItem('cm_session')
        router.push('/entrar')
      })
  }, [router])

  // Envia as alterações para a API
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    try {
      // Prepara os dados a enviar (apenas nome e password)
      const data: { name: string; password?: string } = { name }
      if (password) data.password = password
      const updated = await updateUser(data)
      setName(updated.name)
      setMessage('Dados atualizados com sucesso.')
      setPassword('')
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message)
      else setMessage('Erro ao atualizar dados.')
    }
  }

  return (
    <section>
      {/* Título da secção */}
      <h3 className="text-xl font-bold">Dados pessoais</h3>
      {/* Formulário para alteração de nome e password */}
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
            // Campo apenas para visualização, não permite alterações
            disabled
            className="mt-1 w-full rounded border border-white bg-black p-2 text-white opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-white bg-black p-2 text-white"
          />
        </div>
        {message && <p className="text-sm text-red-600">{message}</p>}
        <button type="submit" className="join-button mt-2">
          Guardar
        </button>
      </form>
    </section>
  )
}
