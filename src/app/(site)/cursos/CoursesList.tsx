'use client';

import { useState } from 'react';
import Button from '../../../components/Button';
import { getPaymentUrl } from '../../../lib/payments';

interface Course {
  title: string;
  description: string;
  price: string;
}

interface CoursesListProps {
  courses: Course[];
}

// Lista de cursos com modal de pagamento mock
export default function CoursesList({ courses }: CoursesListProps) {
  // Estado para controlar a abertura do modal
  const [modalOpen, setModalOpen] = useState(false);

  // Abre o modal de pagamento
  const handleBuy = () => {
    setModalOpen(true);
  };

  return (
    <>
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded bg-white p-6 text-center shadow-lg">
            <p className="mb-4">Pagamento em breve via Stripe Checkout/Payment Link.</p>
            <a href={getPaymentUrl()} className="hidden"></a>
            <Button onClick={() => setModalOpen(false)}>Fechar</Button>
          </div>
        </div>
      )}
    </>
  );
}
