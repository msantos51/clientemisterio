// Página com informação detalhada sobre o curso
export default function CoursePage() {
  return (
    // Secção principal com conteúdos do curso sem espaço superior
    <section className="mx-auto max-w-5xl pb-20 text-justify">
      {/* Título principal da página */}
      <h2 className="text-3xl font-bold">Sobre o curso</h2>

      {/* Parágrafos introdutórios sobre o curso */}
      <p className="mt-4 text-black">
        O Curso de Cliente Mistério foi criado para todos os que querem descobrir como funciona esta
        atividade e aprender a realizar avaliações profissionais de qualidade.
      </p>
      <p className="mt-4 text-black">
        Baseado em experiência prática em projetos reais em Portugal, o curso apresenta de forma
        simples e objetiva tudo o que precisa de saber para começar ou evoluir nesta área.
      </p>

      {/* Contêiner com divisão dos temas em caixas */}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* Caixa: O que vai aprender */}
        <div className="rounded-lg border bg-white/70 p-6 shadow">
          <h3 className="text-xl font-semibold">O que vai aprender</h3>
          <ul className="mt-4 list-disc list-inside text-black space-y-2">
            <li>O que é um Cliente Mistério e qual o seu papel.</li>
            <li>Como avaliar o atendimento, a experiência do cliente e o cumprimento de standards de serviço.</li>
            <li>Como realizar visitas de forma discreta e profissional.</li>
            <li>Como preencher relatórios detalhados e úteis para as empresas.</li>
          </ul>
        </div>

        {/* Caixa: Estrutura do curso */}
        <div className="rounded-lg border bg-white/70 p-6 shadow">
          <h3 className="text-xl font-semibold">Estrutura do curso</h3>
          <p className="mt-4 text-black">
            O curso está organizado em módulos curtos e diretos, com exemplos práticos e questionários no
            final de cada tema, para consolidar os conhecimentos.
          </p>
        </div>

        {/* Caixa: Para quem é este curso */}
        <div className="rounded-lg border bg-white/70 p-6 shadow">
          <h3 className="text-xl font-semibold">Para quem é este curso</h3>
          <ul className="mt-4 list-disc list-inside text-black space-y-2">
            <li>Pessoas que querem iniciar-se como Clientes Mistério.</li>
            <li>Profissionais que já atuam em áreas como comércio, hotelaria ou automóvel e pretendem melhorar a sua capacidade de análise.</li>
            <li>Empresas que desejam formar colaboradores nesta metodologia de avaliação.</li>
          </ul>
        </div>

        {/* Caixa: Benefícios do curso */}
        <div className="rounded-lg border bg-white/70 p-6 shadow">
          <h3 className="text-xl font-semibold">Benefícios</h3>
          <ul className="mt-4 list-disc list-inside text-black space-y-2">
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
