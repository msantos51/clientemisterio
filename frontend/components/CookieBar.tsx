'use client'

import React, { useState, useEffect } from 'react'

// Barra de consentimento de cookies
export function CookieBar() {
  // Estado para verificar se o utilizador já aceitou os cookies
  const [accepted, setAccepted] = useState(true)

  useEffect(() => {
    // Verifica no localStorage se o consentimento já foi dado
    const stored = localStorage.getItem('cookie_accept')
    if (stored !== 'true') {
      setAccepted(false)
    }
  }, [])

  // Regista o consentimento e oculta a barra
  const handleAccept = () => {
    localStorage.setItem('cookie_accept', 'true')
    setAccepted(true)
  }

  if (accepted) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#b82c3c] p-4 text-center text-white">
      {/* Mensagem informativa sobre cookies */}
      <p className="mb-2">Usamos cookies para melhorar a experiência.</p>
      <button
        onClick={handleAccept}
        className="rounded border border-white px-4 py-2 font-bold text-white hover:bg-white/20"
      >
        Aceitar
      </button>
    </div>
  )
}
