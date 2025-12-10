// Página com link para o pagamento do curso
export default function BuyPage() {
  return (
    // Secção principal para compra do curso sem espaço superior
    <section className="pb-20 text-center">
      {/* Título da página */}
      <h2 className="text-3xl font-bold">Comprar curso</h2>
      {/* Explicação do processo de compra */}
      <p className="mt-4 text-purple-700">Pague com segurança através do Stripe.</p>
      {/* Link que abre o pagamento em nova aba */}
      <a
        href="https://buy.stripe.com/7sY7sE7Dk0XCc8L8vH4sE00"
        target="_blank"
        rel="noopener noreferrer"
        className="btn mt-8"
      >
        Comprar agora
      </a>
    </section>
  )
}
