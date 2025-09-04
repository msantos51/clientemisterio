// Layout raiz da aplicação
import './globals.css'
import { ReactNode } from 'react'
import { Navbar } from '../components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

export const metadata = {
  title: 'Sunny Sales',
  description: 'Vendedores de praia em tempo real',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="pt">
      <body className="min-h-screen bg-gray-50">
        <Navbar session={session} />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
