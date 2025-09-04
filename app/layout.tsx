// Layout raiz da aplicação
import './globals.css'
import { ReactNode } from 'react'
import { Header } from '../components/Header'

export const metadata = {
  title: 'Cliente Mistério',
  description: 'Curso online de Cliente Mistério',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      {/* Corpo principal, o fundo em gradiente é aplicado via CSS global */}
      <body className="min-h-screen">
        {/* Cabeçalho presente em todas as páginas */}
        <Header />
        {/* Conteúdo específico de cada rota */}
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
