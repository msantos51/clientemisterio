export default function AboutPage() {
  return (
    <section className="space-y-10">
      {/* Contém o conteúdo centrado e agrupado num único cartão. */}
      <div className="mx-auto w-full max-w-5xl space-y-10">
        {/* Cartão principal com o texto institucional atualizado. */}
        <article className="rounded-[32px] bg-[color:var(--surface)] p-8 shadow-[0_20px_50px_rgba(31,41,55,0.08)]">
          {/* Bloco de texto com a missão atual da plataforma sem módulo de votações. */}
          <div className="space-y-4">
            <h1 className="page-title">
              Sobre a <span className="text-[color:var(--primary)]">Cliente Mistério</span>
            </h1>
            <p className="text-base leading-7 text-justify text-zinc-600">
              A <span className="text-[color:var(--primary)]">Cliente Mistério</span> é uma
              plataforma focada em gestão de conta, comunicação com utilizadores e suporte digital
              de forma simples, acessível e transparente.
            </p>
            <p className="text-base leading-7 text-justify text-zinc-600">
              O objetivo é oferecer uma experiência clara para que cada pessoa consiga atualizar os
              seus dados, gerir segurança da conta e contactar a equipa sempre que necessário.
            </p>
            <p className="text-base leading-7 text-justify text-zinc-600">
              Mantemos uma abordagem centrada em privacidade, organização da informação e melhoria
              contínua da experiência de utilização.
            </p>
            <p className="text-base leading-7 text-justify font-semibold text-[color:var(--primary)]">
              Missão: simplificar a gestão da conta e fortalecer a relação com os utilizadores.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
