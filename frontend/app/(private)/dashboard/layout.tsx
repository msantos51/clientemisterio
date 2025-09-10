'use client'

// Layout do dashboard com menu lateral
import { ReactNode } from 'react'
import Link from 'next/link'
import { ProtectedClient } from '../../../components/ProtectedClient'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Renderiza o layout com o menu e o conteúdo principal
  return (
    <ProtectedClient>
      <div className="flex min-h-screen">
        {/* Menu lateral com as opções do dashboard */}
        <aside className="w-64 border-r border-white p-4">
          <nav className="space-y-4">
            <Link href="/dashboard/personal" className="block hover:underline">
              Dados Pessoais
            </Link>
            <Link href="/dashboard/account" className="block hover:underline">
              Conta
            </Link>
            <Link href="/dashboard/opportunities" className="block hover:underline">
              Oportunidades &amp; Carreira
            </Link>
          </nav>
        </aside>
        {/* Área principal onde o conteúdo das páginas é apresentado */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedClient>
  )
}
