// Página Sobre Nós com descrição detalhada da plataforma
export default function AboutUsPage() {
  return (
    // Secção centralizada com largura controlada para facilitar leitura
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 pb-20 pt-16 text-white md:pt-24">
      {/* Título principal da página */}
      <h1 className="logo-font text-4xl font-bold md:text-5xl">Sobre Nós</h1>

      {/* Primeiro parágrafo que apresenta a missão da plataforma */}
      <p className="text-lg leading-relaxed">
        Somos uma plataforma que liga empresas a avaliadores qualificados, facilitando todo o processo de estudos, auditorias e
        mystery shopping. Reunimos num só espaço recrutamento, formação, gestão de projetos e oportunidades reais para quem quer
        participar em avaliações.
      </p>

      {/* Segundo parágrafo que destaca o apoio dado às empresas e avaliadores */}
      <p className="text-lg leading-relaxed">
        Ajudamos empresas a obter insights rápidos e fiáveis, e damos aos avaliadores as ferramentas necessárias para realizarem
        um trabalho profissional e de qualidade.
      </p>

      {/* Parágrafo final que reforça os valores da marca */}
      <p className="text-lg leading-relaxed">
        Simples, transparente e eficiente — é assim que trabalhamos.
      </p>
    </section>
  )
}

