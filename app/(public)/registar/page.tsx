'use client'
// Página de registo de novos utilizadores
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '../../../lib/zodResolver'
import { useRouter } from 'next/navigation'
import { registerSchema, type RegisterInput } from '../../../lib/validators'

import { AuthCard } from '../../../components/AuthCard'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterInput) => {
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.status === 201) {
      router.push('/entrar?registered=1')
    } else {
      const json = await res.json()
      setError(json.message || 'Erro inesperado.')
    }
  }

  return (
    <AuthCard title="Registar">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Nome" error={errors.name?.message} {...register('name')} />
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
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4"
            {...register('terms')}
          />
          <label htmlFor="terms" className="text-sm">
            Aceito os termos…
          </label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          Registar
        </Button>
      </form>
    </AuthCard>
  )
}
