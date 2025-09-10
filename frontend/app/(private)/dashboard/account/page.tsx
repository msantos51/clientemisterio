'use client'

// Página de gestão da conta do utilizador
export default function AccountPage() {
  // Secções para sessões ativas e apagar conta
  return (
    <section className="space-y-6">
      {/* Título da página */}
      <h3 className="text-xl font-bold">Conta</h3>

      {/* Secção de sessões ativas (placeholder) */}
      <div>
        <h4 className="font-semibold">Sessões ativas</h4>
        <p className="text-sm text-white/80">Funcionalidade em desenvolvimento.</p>
      </div>

      {/* Secção para apagar a conta (placeholder) */}
      <div>
        <h4 className="font-semibold">Apagar conta</h4>
        <button className="join-button mt-2">Apagar</button>
      </div>
    </section>
  )
}
