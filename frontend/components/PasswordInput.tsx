'use client'

import { useState, type InputHTMLAttributes } from 'react'

// Campo de palavra-passe com botão para mostrar ou esconder o valor
export default function PasswordInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  // Estado que controla se a palavra-passe está visível
  const [visible, setVisible] = useState(false)

  return (
    <>
      {/* Campo de entrada que alterna entre texto e palavra-passe */}
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className={className}
      />
      {/* Botão que permite mostrar ou esconder a palavra-passe */}
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-700"
        aria-label={visible ? 'Esconder palavra-passe' : 'Mostrar palavra-passe'}
      >
        {visible ? 'Ocultar' : 'Mostrar'}
      </button>
    </>
  )
}
