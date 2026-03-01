import Image from 'next/image';

export default function AboutPage() {
  const courseAdvantages = [
    'Checklists práticos para não esqueceres detalhes',
    'Técnicas para pareceres um cliente normal (sem te denunciares)',
    'Relatórios claros e bem avaliados pelas empresas',
    'Estratégias para conseguir mais avaliações e aumentar o rendimento',
  ];

  const highlightMetrics = [
    { value: '4', label: 'Vantagens principais do curso' },
    { value: '100%', label: 'Foco em aplicação prática no terreno' },
  ];

  return (
    <section className="space-y-12 pb-4">
      {/* Cria o bloco principal com duas colunas para aproximar o layout ao design de referência. */}
      <article className="mx-auto grid w-full max-w-6xl gap-8 rounded-[34px] bg-white p-8 shadow-[0_22px_55px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-12">
        {/* Mantém toda a informação atual do site, com hierarquia visual e pormenores vermelhos. */}
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            Sobre a Cliente Mistério
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-zinc-900 lg:text-5xl">
            Aprende a atuar como cliente real com método e consistência.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-zinc-600">
            Um Cliente Mistério é um cliente “normal” contratado para avaliar serviços
            (atendimento, rapidez, qualidade e cumprimento de regras) e, ao mesmo tempo, gerar
            rendimento extra por cada avaliação realizada.
          </p>

          <p className="max-w-2xl text-base leading-7 text-zinc-600">
            Quanto melhor e mais consistente fores, mais convites costumas receber para novas
            visitas e análises.
          </p>

          <p className="max-w-2xl text-base leading-7 text-zinc-600">
            Neste curso, vais aprender do básico ao avançado como fazer visitas sem falhas,
            entregar relatórios profissionais e aumentar a tua taxa de aprovação para
            transformares isto num extra mensal realista.
          </p>

          {/* Exibe métricas curtas para reforçar visualmente os benefícios sem alterar conteúdo. */}
          <div className="grid gap-3 sm:grid-cols-2">
            {highlightMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3"
              >
                <p className="text-2xl font-bold text-red-700">{metric.value}</p>
                <p className="text-sm font-medium text-zinc-700">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usa imagem existente do projeto para manter coerência com os recursos atuais. */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[28px] border-2 border-red-200" />
          <div className="relative overflow-hidden rounded-[28px] border border-red-100 bg-white p-3 shadow-[0_20px_40px_rgba(220,38,38,0.16)]">
            <Image
              src="/images/IMG_2622.png"
              alt="Formação de cliente mistério"
              width={900}
              height={1200}
              className="h-[430px] w-full rounded-2xl object-cover"
              priority
            />
            <div className="absolute bottom-8 left-8 rounded-xl bg-white/95 px-4 py-3 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Curso estruturado
              </p>
              <p className="text-sm font-medium text-zinc-700">
                Do básico ao avançado com foco em resultados reais.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Recria a secção de cartões com destaque vermelho para as vantagens atuais do curso. */}
      <article className="mx-auto w-full max-w-6xl rounded-[34px] bg-zinc-50 p-8 lg:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-zinc-900 lg:text-4xl">Vantagens do curso</h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Estrutura prática para melhorares a qualidade das avaliações e aumentares o teu
            rendimento com consistência.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {courseAdvantages.map((advantage, index) => (
            <li
              key={advantage}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_16px_28px_rgba(220,38,38,0.14)]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                  {index + 1}
                </span>
                <p className="text-base leading-7 text-zinc-700">{advantage}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
