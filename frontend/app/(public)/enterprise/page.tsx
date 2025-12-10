// Página "Enterprise" simplificada após remoções
import type { ReactNode } from "react"

// Componente reutilizável para caixas translúcidas
function TransparentBox({ children }: { children: ReactNode }) {
  // Caixa com fundo branco semitransparente e texto violeta
  return (
    <div className="rounded-lg bg-white/90 p-6 text-purple-700 shadow">
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
    "Divulgação de estudos e vagas para atrair candidatos qualificados rapidamente.",
  ]

  // Passos do processo de funcionamento
  const processSteps = [
    "Briefing → Diz-nos o perfil que precisas (localidades, prazos, requisitos).",
    "Matching → Selecionamos alunos certificados que encaixam no perfil.",
    "Entrega → Enviamos lista de candidatos qualificados para contacto/convite.",
    "Acompanhamento → Fechamos feedback e ajustamos perfis conforme os resultados.",
  ]

  // Contrapartidas pedidas às empresas
  const exchange = [
    "Divulgação do nosso curso (link/menção nas suas comunicações ou página de recrutamento).",
  ]

  // Compromissos e conformidade
  const commitments = [
    "RGPD: partilha de dados apenas com consentimento e para finalidade de recrutamento.",
    "Qualidade: todos os candidatos completaram o curso e conhecem boas práticas.",
    "Flexibilidade: sem exclusividade; modelo de colaboração ajustável ao seu processo.",
  ]

  return (
    // Secção principal centrada e com espaçamento inferior
    <section className="flex justify-center pb-20 text-purple-700">
      {/* Contentor com largura máxima e espaço vertical entre caixas */}
      <div className="max-w-3xl space-y-6">
        {/* Título principal e subtítulo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Empresas & Marcas</h1>
        </div>

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

        {/* Compromissos e conformidade */}
        <TransparentBox>
          <h2 className="text-2xl font-semibold mb-4">Compromissos e conformidade</h2>
          <BulletList items={commitments} />
        </TransparentBox>
      </div>
    </section>
  )
}
