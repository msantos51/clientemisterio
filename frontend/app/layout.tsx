import './globals.css'
import React from 'react'
import { Header } from '../components/Header'
import { CookieBar } from '../components/CookieBar'

// Metadados básicos da aplicação
export const metadata = {
  title: 'Cliente Mistério',
  description: 'Plataforma de curso para clientes mistério',
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
        {/* Estrutura principal com fundo gradiente e texto branco */}
        <div className="min-h-screen text-white">
          <Header /> {/* Cabeçalho exibido no topo */}

          <main className="mx-4 mb-8 mt-8 md:mx-8">{children}</main> {/* Conteúdo principal com margens */}
 main
          <CookieBar /> {/* Aviso de cookies obrigatório */}
        </div>
      </body>
    </html>
  )
}
