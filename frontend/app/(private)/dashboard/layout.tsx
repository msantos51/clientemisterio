'use client'

// Layout do dashboard com menu lateral simplificado
import { ReactNode } from 'react'
import Link from 'next/link'
import { ProtectedClient } from '../../../components/ProtectedClient'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Renderiza o layout com o menu e o conteúdo principal
  return (
    <ProtectedClient>
      <div className="flex min-h-screen">
        {/* Menu lateral com as opções essenciais do dashboard */}
        <aside className="w-72 border-r border-white/30 bg-white/5 p-4">
          <nav className="space-y-6">
            {/* Ligações principais para gerir os dados do utilizador */}
            <div className="space-y-3">
              <Link
                href="/dashboard/personal"
                className="block rounded-full border border-white/40 px-4 py-2 text-center text-sm font-semibold uppercase text-white transition hover:bg-white/10"
              >
                Dados Pessoais
              </Link>
              <Link
                href="/dashboard/opportunities"
                className="block rounded-full border border-white/40 px-4 py-2 text-center text-sm font-semibold uppercase text-white transition hover:bg-white/10"
              >
                Oportunidades &amp; Carreira
              </Link>
            </div>

            {/* Menu dedicado à gestão de conta com botão destacado para eliminar */}
            <div className="rounded-lg border border-red-200/40 bg-red-500/10 p-4 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-red-100">Conta</h2>
              <p className="mt-2 text-sm text-red-50/80">
                Gestione as definições sensíveis da sua conta Cliente Mistério.
              </p>
              <Link
                href="/dashboard/account"
                className="mt-4 block rounded-full bg-white px-4 py-2 text-center text-sm font-bold uppercase text-[#EC6F66] transition hover:bg-white/90"
              >
                Apagar Conta
              </Link>
            </div>
          </nav>
        </aside>
        {/* Área principal onde o conteúdo das páginas é apresentado */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedClient>
  )
}
