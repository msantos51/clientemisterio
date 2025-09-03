import type { Metadata } from 'next';
import Container from '../../components/Container';
import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';
import FeatureCard from '../../components/FeatureCard';
import FAQ from '../../components/FAQ';

// Metadados de SEO e partilha
export const metadata: Metadata = {
  title: 'Cliente Mistério | Início',
  description: 'Seja pago para experimentar serviços e produtos.',
  openGraph: {
    title: 'Cliente Mistério',
    // Imagem de partilha genérica hospedada externamente
    images: ['https://via.placeholder.com/1200x630.png?text=Cliente+Misterio'],
  },
};

// Página inicial com herói, proposta de valor, funcionalidades e FAQ
export default function HomePage() {
  const faqItems = [
    { question: 'O que é um cliente mistério?', answer: 'Explicação breve sobre o papel de um cliente mistério.' },
    { question: 'Como começo?', answer: 'Inscreva-se nos nossos cursos e siga as orientações.' },
    { question: 'Quanto posso ganhar?', answer: 'Os ganhos variam conforme a experiência e as tarefas.' },
    { question: 'Preciso de experiência prévia?', answer: 'Não, fornecemos toda a formação necessária.' },
    { question: 'Como recebo os pagamentos?', answer: 'Pagamos por transferência bancária ou outros métodos a definir.' },
  ];

  return (
    <>
      <section className="flex h-[60vh] w-full items-center justify-center bg-gray-100 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold">Transforma a tua opinião em rendimento</h1>
          <p className="mx-auto max-w-xl text-lg text-gray-700">
            Seja pago para experimentar serviços e produtos. Descubra oportunidades como cliente mistério.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/cursos">
              <Button>ADIRA JÁ</Button>
            </a>
            <a href="#faq">
              <Button variant="secondary">COMECE JÁ!</Button>
            </a>
          </div>
        </div>
      </section>

      <Container>
        <section className="py-16">
          <SectionTitle title="Proposta de valor" />
          <p className="mx-auto max-w-2xl text-center text-gray-700">
            Ganhos potenciais variam desde valores iniciais modestos até rendimentos significativos para agentes experientes. Texto de exemplo editável.
          </p>
        </section>

        <section className="py-16">
          <SectionTitle title="Como funciona" />
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard title="Pagamentos" description="Receba por cada missão concluída." />
            <FeatureCard title="Deslocações" description="Viaje pela cidade a avaliar serviços." />
            <FeatureCard title="Em casa" description="Algumas tarefas podem ser feitas online." />
          </div>
        </section>

        <section id="faq" className="py-16">
          <SectionTitle title="FAQ" />
          <FAQ items={faqItems} />
        </section>
      </Container>
    </>
  );
}
