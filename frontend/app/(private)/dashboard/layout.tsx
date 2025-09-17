'use client'

// Layout do dashboard com menu lateral simplificado
import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProtectedClient } from '../../../components/ProtectedClient'

// Lista com todas as secções disponíveis no menu lateral
const navigationItems = [
  { href: '/dashboard/personal', label: 'Dados Pessoas' },
  { href: '/dashboard/opportunities', label: 'Oportunidades & Carreira' },
  { href: '/dashboard/account', label: 'Conta' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Obtém a rota atual para destacar o item de menu correspondente
  const pathname = usePathname()

  // Renderiza o layout com o menu lateral e o conteúdo principal
  return (
    <ProtectedClient>
      <div className="flex min-h-screen">
        {/* Menu lateral com as opções essenciais do dashboard */}
        <aside className="w-72 border-r border-white/30 bg-white/5 p-4">
          <nav className="space-y-3">
            {/* Apresenta apenas os itens definidos na lista navigationItems */}
            {navigationItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-full border px-4 py-2 text-center text-sm font-semibold uppercase transition ${
                    isActive
                      ? 'border-white/80 bg-white/20 text-white'
                      : 'border-white/40 text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        {/* Área principal onde o conteúdo das páginas é apresentado */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedClient>
  )
}
