import React from 'react'

// Rodapé simples exibindo direitos autorais
export function Footer() {
  return (
    <footer className="bg-gray-100 p-4 text-center text-gray-600">
      {/* Texto de direitos autorais com o ano atual */}
      <p>&copy; {new Date().getFullYear()} Cliente Mistério. Todos os direitos reservados.</p>
    </footer>
  )
}
