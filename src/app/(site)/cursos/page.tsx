'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import Container from '../../../components/Container';
import SectionTitle from '../../../components/SectionTitle';
import Button from '../../../components/Button';
import { getPaymentUrl } from '../../../lib/payments';

export const metadata: Metadata = {
  title: 'Cliente Mistério | Cursos',
  description: 'Formações disponíveis para aspirantes a cliente mistério.',
};

interface Course {
  title: string;
  description: string;
  price: string;
}

const courses: Course[] = [
  { title: 'Curso Básico', description: 'Introdução ao cliente mistério.', price: '€49' },
  { title: 'Curso Avançado', description: 'Técnicas profissionais.', price: '€99' },
];

// Página de cursos com cards de inscrição
export default function CoursesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleBuy = () => {
    // Abre modal de pagamento (mock)
    setModalOpen(true);
  };

  return (
    <Container>
      <section className="py-16">
        <SectionTitle title="Cursos" subtitle="Aprenda a ser um cliente mistério" />
        <div className="grid gap-8 md:grid-cols-2">
          {courses.map((course, idx) => (
            <div key={idx} className="rounded border p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
              <p className="mb-4 text-gray-700">{course.description}</p>
              <p className="mb-4 font-bold">{course.price}</p>
              <Button onClick={handleBuy}>Comprar/Inscrever</Button>
            </div>
          ))}
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded bg-white p-6 text-center shadow-lg">
            <p className="mb-4">Pagamento em breve via Stripe Checkout/Payment Link.</p>
            <a href={getPaymentUrl()} className="hidden"></a>
            <Button onClick={() => setModalOpen(false)}>Fechar</Button>
          </div>
        </div>
      )}
    </Container>
  );
}
