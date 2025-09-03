import type { Metadata } from 'next';
import Container from '../../../components/Container';

export const metadata: Metadata = {
  title: 'Cliente Mistério | Política de Privacidade',
  description: 'Política de privacidade (placeholder).',
};

// Página placeholder para política de privacidade
export default function PrivacyPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-4 text-3xl font-bold">Política de Privacidade</h1>
        <p>Conteúdo em construção.</p>
      </section>
    </Container>
  );
}
