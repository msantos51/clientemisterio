'use client'
// Botão que termina a sessão do utilizador
import { signOut } from 'next-auth/react'
import { Button } from './Button'

export function SignOutButton() {
  return (
    <Button onClick={() => signOut()} type="button">
      Terminar sessão
    </Button>
  )
}
