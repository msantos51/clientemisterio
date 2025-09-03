import type { Metadata } from 'next';
import Container from '../../../components/Container';

export const metadata: Metadata = {
  title: 'Cliente Mistério | Termos e Condições',
  description: 'Termos e condições (placeholder).',
};

// Página placeholder para termos e condições
export default function TermsPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-4 text-3xl font-bold">Termos e Condições</h1>
        <p>Conteúdo em construção.</p>
      </section>
    </Container>
  );
}
