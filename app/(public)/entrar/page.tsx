'use client'
// Página de login para utilizadores
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '../../../lib/zodResolver'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginInput } from '../../../lib/validators'
import { AuthCard } from '../../../components/AuthCard'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginInput) => {
    setError('')
    const res = await signIn('credentials', { ...data, redirect: false })
    if (res?.error) setError('Credenciais inválidas.')
    else router.push('/dashboard')
  }

  return (
    <AuthCard title="Entrar">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Palavra-passe"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          Entrar
        </Button>
      </form>
    </AuthCard>
  )
}
