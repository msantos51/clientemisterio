import './globals.css'
import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CookieBar } from '../components/CookieBar'

// Layout raiz com cabeçalho, rodapé e estilos globais
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {/* Estrutura principal com fundo gradiente roxo e texto branco */}
        <div className="min-h-screen text-white">
          <Header /> {/* Cabeçalho exibido no topo */}
          <main className="pt-20">{children}</main> {/* Conteúdo variável com espaçamento superior */}
          <Footer /> {/* Rodapé com informações adicionais */}
          <CookieBar /> {/* Aviso de cookies obrigatório */}
        </div>
      </body>
    </html>
  )
}
