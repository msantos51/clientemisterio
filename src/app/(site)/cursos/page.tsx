import type { Metadata } from 'next';
import Container from '../../../components/Container';
import SectionTitle from '../../../components/SectionTitle';
import CoursesList from './CoursesList';

// Metadados para a página de cursos
export const metadata: Metadata = {
  title: 'Cliente Mistério | Cursos',
  description: 'Formações disponíveis para aspirantes a cliente mistério.',
};

// Interface que descreve cada curso
interface Course {
  title: string;
  description: string;
  price: string;
  slug?: string; // Identificador opcional para ligar à página do curso
}

// Lista de cursos apenas com a formação completa disponível
const courses: Course[] = [
  {
    title: 'Cliente Mistério Completo',
    description: 'Curso interativo disponibilizado via Genially.',
    price: 'Grátis',
    slug: 'cliente-misterio',
  },
];

// Página de cursos que fornece dados aos cards
export default function CoursesPage() {
  return (
    <Container>
      <section className="py-16">
        <SectionTitle title="Cursos" subtitle="Aprenda a ser um cliente mistério" />
        <CoursesList courses={courses} />
      </section>
    </Container>
  );
}
