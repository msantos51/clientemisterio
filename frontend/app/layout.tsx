import './globals.css'
import React from 'react'
import { Header } from '../components/Header'
import { CookieBar } from '../components/CookieBar'

// Metadados básicos da aplicação
export const metadata = {
  title: 'Cliente Mistério',
  description: 'Plataforma de curso para clientes mistério',
  // definir o favicon para evitar pedidos de /favicon.ico inexistente
  icons: {
    icon: '/logo.svg',
  },
}

// Meta tag de viewport para adaptação mobile
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Layout raiz com cabeçalho e estilos globais
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {/* Estrutura principal sem elementos decorativos */}
        <div className="min-h-screen">
          {/* Cabeçalho exibido no topo */}
          <Header />

          {/* Conteúdo principal sem margem superior para encostar ao cabeçalho */}
          <main className="mx-4 mb-8 md:mx-8">{children}</main>

          {/* Aviso de cookies obrigatório */}
          <CookieBar />
        </div>
      </body>
    </html>
  )
}
