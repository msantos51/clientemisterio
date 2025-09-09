// Página "Enterprise" com todo o conteúdo solicitado
import type { ReactNode } from "react"

// Componente reutilizável para caixas translúcidas
function TransparentBox({ children }: { children: ReactNode }) {
  // Caixa com fundo branco semitransparente e texto branco
  return (
    <div className="bg-white/10 text-white p-6 rounded-lg backdrop-blur">
      {children}
    </div>
  )
}

// Componente reutilizável para listas com marcadores
function BulletList({ items }: { items: string[] }) {
  // Lista formatada com espaçamento entre elementos
  return (
    <ul className="list-disc ml-6 space-y-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function EnterprisePage() {
  // Lista de ofertas para empresas de estudos de mercado
  const offerings = [
    "Clientes Mistério formados e interessados na área (com certificação do nosso curso).",
    "Divulgação da sua empresa junto da nossa comunidade (site, newsletter e redes).",
    "Ponto de ligação entre as suas necessidades de recrutamento e os nossos alunos certificados.",
    "Listas por perfil (região, disponibilidade, mobilidade, experiência) para acelerar o recrutamento.",
    "Divulgação de estudos e vagas para atrair candidatos qualificados rapidamente."
  ]

  // Passos do processo de funcionamento
  const processSteps = [
    "Briefing → Diz-nos o perfil que precisas (localidades, prazos, requisitos).",
    "Matching → Selecionamos alunos certificados que encaixam no perfil.",
    "Entrega → Enviamos lista de candidatos qualificados para contacto/convite.",
    "Acompanhamento → Fechamos feedback e ajustamos perfis conforme os resultados."
  ]

  // Contrapartidas pedidas às empresas
  const exchange = [
    "Divulgação do nosso curso (link/menção nas suas comunicações ou página de recrutamento)."
  ]

  // Filtros disponíveis para perfis
  const profiles = [
    "Localização (distritos/concelhos)",
    "Disponibilidade (dias/horários)",
    "Mobilidade (viatura própria/TP)",
    "Experiência (iniciante/experiente)",
    "Segmentos (retalho, automóvel, restauração, serviços, etc.)"
  ]

  // Compromissos e conformidade
  const commitments = [
    "RGPD: partilha de dados apenas com consentimento e para finalidade de recrutamento.",
    "Qualidade: todos os candidatos completaram o curso e conhecem boas práticas.",
    "Flexibilidade: sem exclusividade; modelo de colaboração ajustável ao seu processo."
  ]

  // Botões de call-to-action
  const ctaButtons = [
    "Pedir lista de candidatos",
    "Agendar conversa de 15 min",
    "Divulgar um estudo / vaga"
  ]

  // Campos sugeridos para formulários
  const formFields = [
    "Nome e Empresa",
    "E-mail e Telefone",
    "Tipo de estudo / cliente",
    "Localidades e prazos",
    "Requisitos do perfil (idade, mobilidade, experiência, outros)",
    "Observações / NDA (opcional)"
  ]

  // Perguntas frequentes com respostas
  const faq = [
    {
      question: "Quanto custa?",
      answer:
        "A parceria é simples e flexível. Em contrapartida, pedimos a divulgação do nosso curso. Condições específicas podem ser combinadas caso a caso."
    },
    {
      question: "Têm cobertura nacional?",
      answer:
        "Sim, com foco em Portugal. Indicando os concelhos, ajustamos a lista ao território necessário."
    },
    {
      question: "Como garantem a qualidade?",
      answer:
        "Os candidatos concluíram o nosso curso e recebem instruções claras por estudo. Podemos recolher feedback pós-missão para melhoria contínua."
    },
    {
      question: "Em quanto tempo enviam perfis?",
      answer:
        "Normalmente 24–72h após recebermos o briefing com requisitos e localidades."
    }
  ]

  return (
    // Secção principal centrada e com espaçamento inferior
    <section className="flex justify-center pb-20 text-white">
      {/* Contentor com largura máxima e espaço vertical entre caixas */}
      <div className="max-w-3xl space-y-6">
        {/* Título principal e subtítulo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Empresas & Marcas</h1>
        </div>

        {/* Descrição inicial */}
        <TransparentBox>
          <p>
            Treinamos pessoas para serem Clientes Mistério e ligamo-las a empresas de estudos de mercado.
            Recebe perfis validados, motivados e prontos a executar avaliações — quando e onde precisa.
          </p>
        </TransparentBox>

        {/* O que oferecemos */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">O que oferecemos às empresas de estudos de mercado</h2>
          <BulletList items={offerings} />
        </TransparentBox>

        {/* Como funciona */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">Como funciona</h2>
          <BulletList items={processSteps} />
        </TransparentBox>

        {/* O que pedimos em troca */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">O que pedimos em troca</h2>
          <BulletList items={exchange} />
        </TransparentBox>

        {/* Perfis disponíveis */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">Perfis disponíveis (exemplos de filtros)</h2>
          <BulletList items={profiles} />
        </TransparentBox>

        {/* Compromissos e conformidade */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">Compromissos e conformidade</h2>
          <BulletList items={commitments} />
        </TransparentBox>

        {/* Call-to-Action */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">Call-to-Action</h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            {ctaButtons.map((label) => (
              <button
                key={label}
                className="bg-transparent border border-white px-4 py-2 rounded-md"
              >
                {label}
              </button>
            ))}
          </div>
        </TransparentBox>

        {/* Campos do formulário */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">Campos do formulário (sugestão)</h2>
          <BulletList items={formFields} />
        </TransparentBox>

        {/* FAQ rápido */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">FAQ rápido</h2>
          <ul className="space-y-4">
            {faq.map((item) => (
              <li key={item.question}>
                <p className="font-semibold">{item.question}</p>
                <p>{item.answer}</p>
              </li>
            ))}
          </ul>
        </TransparentBox>
      </div>
    </section>
  )
}

