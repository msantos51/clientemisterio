import './globals.css'
import React from 'react'
import { Header } from '../components/Header'
import { CookieBar } from '../components/CookieBar'
import { BackgroundLines } from '../components/BackgroundLines'

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
        {/* Estrutura principal com linhas SVG no fundo */}
        <div className="relative min-h-screen">
          <BackgroundLines /> {/* Linhas decorativas atrás do conteúdo */}


          {/* Conteúdo acima das linhas SVG */}
          <div className="relative z-10">
            <Header /> {/* Cabeçalho exibido no topo */}

            {/* Conteúdo principal sem margem superior para encostar ao cabeçalho */}
            <main className="mx-4 mb-8 md:mx-8">{children}</main>

            <CookieBar /> {/* Aviso de cookies obrigatório */}
          </div>

        </div>
      </body>
    </html>
  )
}
