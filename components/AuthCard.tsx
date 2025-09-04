'use client'
// Cartão simples para formulários de autenticação
import { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export function AuthCard({ title, children }: Props) {
  return (
    <div className="mx-auto max-w-md rounded border bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>
      {children}
    </div>
  )
}
