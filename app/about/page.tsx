export default function AboutPage() {
  const courseAdvantages = [
    'Checklists práticos para não esqueceres detalhes',
    'Técnicas para pareceres um cliente normal (sem te denunciares)',
    'Relatórios claros e bem avaliados pelas empresas',
    'Estratégias para conseguir mais avaliações e aumentar o rendimento',
  ];

  return (
    <section className="space-y-10">
      {/* Mantém o conteúdo centralizado para melhor leitura em ecrãs largos. */}
      <div className="mx-auto w-full max-w-5xl space-y-10">
        {/* Cartão principal com a descrição do que é ser Cliente Mistério e o foco do curso. */}
        <article className="rounded-[32px] bg-[color:var(--surface)] p-8 shadow-[0_20px_50px_rgba(31,41,55,0.08)]">
          {/* Organiza o conteúdo em blocos com espaçamento consistente. */}
          <div className="space-y-4">
            <h1 className="page-title">
              Sobre a <span className="text-[color:var(--primary)]">Cliente Mistério</span>
            </h1>

            <p className="text-base leading-7 text-justify text-zinc-600">
              Um Cliente Mistério é um cliente “normal” contratado para avaliar serviços
              (atendimento, rapidez, qualidade e cumprimento de regras) e, ao mesmo tempo, gerar
              rendimento extra por cada avaliação realizada.
            </p>

            <p className="text-base leading-7 text-justify text-zinc-600">
              Quanto melhor e mais consistente fores, mais convites costumas receber para novas
              visitas e análises.
            </p>

            <p className="text-base leading-7 text-justify text-zinc-600">
              Neste curso, vais aprender do básico ao avançado como fazer visitas sem falhas,
              entregar relatórios profissionais e aumentar a tua taxa de aprovação para
              transformares isto num extra mensal realista.
            </p>

            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-semibold text-[color:var(--primary)]">Vantagens do curso</h2>

              {/* Lista os principais benefícios do curso com estrutura simples e reutilizável. */}
              <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-zinc-600">
                {courseAdvantages.map((advantage) => (
                  <li key={advantage}>{advantage}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
