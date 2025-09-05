import './globals.css'
import React from 'react'
import { Header } from '../components/Header'
import { CookieBar } from '../components/CookieBar'

// Layout raiz com cabeçalho e estilos globais
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {/* Estrutura principal com fundo gradiente e texto branco */}
        <div className="min-h-screen text-white">
          <Header /> {/* Cabeçalho exibido no topo */}
          <main className="pt-20">{children}</main> {/* Conteúdo variável com espaçamento superior */}
          <CookieBar /> {/* Aviso de cookies obrigatório */}
        </div>
      </body>
    </html>
  )
}
