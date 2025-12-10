// Página com informação detalhada sobre o curso
export default function CoursePage() {
  return (
    // Secção principal com conteúdos do curso sem espaço superior e texto violeta
    <section className="mx-auto max-w-5xl pb-20 text-justify text-purple-700">
      {/* Título principal da página */}
      <h2 className="text-3xl font-bold text-center">Sobre o curso</h2>

      {/* Parágrafos introdutórios sobre o curso */}
      <p className="mt-4">
        O Curso de Cliente Mistério foi criado para todos os que querem descobrir como funciona esta
        atividade e aprender a realizar avaliações profissionais de qualidade.
      </p>
      <p className="mt-4">
        Baseado em experiência prática em projetos reais em Portugal, o curso apresenta de forma
        simples e objetiva tudo o que precisa de saber para começar ou evoluir nesta área.
      </p>

      {/* Contêiner com divisão dos temas em caixas */}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* Caixa: O que vai aprender */}
        <div className="rounded-lg border border-purple-200 bg-white/90 p-6 shadow text-purple-800">
          <h3 className="text-xl font-semibold">O que vai aprender</h3>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>O que é um Cliente Mistério.</li>
            <li>Como começar a realizar avaliações.</li>
            <li>Como adquirir o máximo de produtos e rendimentos.</li>
          </ul>
        </div>

        {/* Caixa: Estrutura do curso */}
        <div className="rounded-lg border border-purple-200 bg-white/90 p-6 shadow text-purple-800">
          <h3 className="text-xl font-semibold">Estrutura do curso</h3>
          <p className="mt-4">
            O curso está organizado em módulos curtos e diretos, com exemplos práticos e questionários no
            final de cada tema, para consolidar os conhecimentos.
          </p>
        </div>

        {/* Caixa: Para quem é este curso */}
        <div className="rounded-lg border border-purple-200 bg-white/90 p-6 shadow text-purple-800">
          <h3 className="text-xl font-semibold">Para quem é este curso</h3>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>Pessoas que querem iniciar-se como Clientes Mistério.</li>
            <li>Profissionais que já atuam na área e querem aumentar os rendimentos.</li>
          </ul>
        </div>

        {/* Caixa: Benefícios do curso */}
        <div className="rounded-lg border border-purple-200 bg-white/90 p-6 shadow text-purple-800">
          <h3 className="text-xl font-semibold">Benefícios</h3>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>100% online, pode aprender ao seu ritmo.</li>
            <li>Acesso imediato após inscrição.</li>
            <li>Conteúdos claros e aplicáveis a situações reais.</li>
            <li>Certificado de conclusão.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
