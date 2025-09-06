// Página com link para o pagamento do curso
export default function BuyPage() {
  return (
    // Secção principal para compra do curso sem espaço superior
    <section className="pb-20 text-center">
      {/* Título da página */}
      <h2 className="text-3xl font-bold">Comprar curso</h2>
      {/* Explicação do processo de compra */}
      <p className="mt-4 text-black">Pague com segurança através do Stripe.</p>
      {/* Link que abre o pagamento em nova aba */}
      <a
        href="https://stripe.com/pagar/SEU_LINK"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded bg-black px-4 py-2 text-white hover:bg-black/80"
      >
        Comprar agora
      </a>
    </section>
  )
}
