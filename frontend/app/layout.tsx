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
      <head>
        {/* Pré-conexão às fontes do Google para maior desempenho */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Carregamento da fonte "Saira Stencil One" */}
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Estrutura principal sem elementos decorativos */}
        <div className="min-h-screen">
          {/* Cabeçalho exibido no topo */}
          <Header />

          {/* Conteúdo principal com margem superior uniforme em todas as páginas */}
          <main className="mx-4 mb-8 mt-8 md:mx-8">{children}</main>

          {/* Aviso de cookies obrigatório */}
          <CookieBar />
        </div>
      </body>
    </html>
  )
}
