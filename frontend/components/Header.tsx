'use client'

import { useState } from 'react'
import Link from 'next/link'

// Cabeçalho com navegação principal
export function Header() {
  // Estado para controlar a abertura do menu mobile
  const [menuOpen, setMenuOpen] = useState(false)

  // Função para fechar o menu após navegar para uma página
  const closeMenu = () => setMenuOpen(false)

  return (
    // Cabeçalho fixo com elementos distribuídos em três colunas
    <header className="fixed left-0 right-0 top-0">
      {/* Barra de navegação com logótipo, menus e ícones */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4 text-white text-lg font-bold md:p-6">
        {/* Texto do logótipo no canto superior esquerdo */}
        <div className="flex flex-1 justify-start">
          <Link href="/" aria-label="Página inicial">
            <span className="text-2xl font-bold">Cliente Mistério</span>
          </Link>
        </div>
        {/* Menus visíveis apenas em ecrãs médios para cima */}
        <div className="hidden flex-1 justify-center space-x-6 md:flex">
          <Link href="/">Início</Link>
          <Link href="/curso">Curso</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/enterprise">Enterprise</Link>
        </div>
        {/* Ícones à direita visíveis apenas em ecrãs médios para cima */}
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <Link href="/entrar" aria-label="Fazer login" className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <circle cx="12" cy="8" r="4" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 20c0-4 4-6 8-6s8 2 8 6"
              />
            </svg>
          </Link>
          <Link href="#" aria-label="Pesquisar" className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <circle cx="11" cy="11" r="8" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {/* Botão hamburger para abrir o menu em mobile */}
        <button
          className="inline-flex md:hidden"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Menu mobile mostrado quando o botão é clicado */}
      {menuOpen && (
        <div className="flex flex-col items-center space-y-4 bg-white/10 p-4 text-lg font-bold text-white md:hidden">
          <Link href="/" onClick={closeMenu}>Início</Link>
          <Link href="/curso" onClick={closeMenu}>Curso</Link>
          <Link href="/contacto" onClick={closeMenu}>Contacto</Link>
          <Link href="/enterprise" onClick={closeMenu}>Enterprise</Link>
          <div className="flex space-x-4">
            <Link href="/entrar" aria-label="Fazer login" className="inline-flex" onClick={closeMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <circle cx="12" cy="8" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 20c0-4 4-6 8-6s8 2 8 6"
                />
              </svg>
            </Link>
            <Link href="#" aria-label="Pesquisar" className="inline-flex" onClick={closeMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <circle cx="11" cy="11" r="8" />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

