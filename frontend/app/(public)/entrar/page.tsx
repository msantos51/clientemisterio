'use client'

// Página de login para alunos com formulário formatado
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/api'

export default function LoginPage() {
  // Estados que guardam os valores dos campos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // Regista na consola quando o componente é montado
  useEffect(() => {
    console.log('LoginPage mounted')
    console.log('API URL', process.env.NEXT_PUBLIC_API_URL)
  }, [])

  // Função chamada ao submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submitting login form') // Regista na consola que o formulário está a ser submetido
    setError('')

    // Validação mínima dos campos
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Email inválido.')
      return
    }

    try {
      await loginUser({ email, password })
      // Guarda apenas a flag de sessão autenticada
      localStorage.setItem('cm_session', JSON.stringify({ loggedIn: true }))
      // Notifica a aplicação que a sessão foi alterada
      window.dispatchEvent(new Event('cm-session'))
      // Redireciona para o dashboard do aluno
      router.push('/dashboard')
    } catch (err: unknown) {
      console.error('login error', err) // Regista o erro para depuração
      // Apresenta mensagem de erro devolvida pela API
      if (err instanceof Error) setError(err.message)
      else setError('Erro inesperado ao iniciar sessão.')
    }
  }

  return (
    // Centraliza o formulário vertical e horizontalmente
    <section className="flex min-h-screen items-center justify-center pb-20">
      <form onSubmit={handleSubmit} className="form-control">
        {/* Título do formulário */}
        <p className="title">Entrar</p>

        {/* Campo do email */}
        <div className="input-field">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" " // Espaço necessário para usar o seletor :placeholder-shown
            required
          />
          <label className="label">Email</label>
        </div>

        {/* Campo da palavra-passe */}
        <div className="input-field">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" " // Espaço necessário para usar o seletor :placeholder-shown
            required
          />
          <label className="label">Palavra-passe</label>
        </div>

        {/* Mensagem de erro, se existir */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Botão de submissão centrado dentro do formulário */}
        <button type="submit" className="btn mt-8 self-center">
          Entrar
        </button>
      </form>
    </section>
  )
}

