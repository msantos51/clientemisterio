
import type { Metadata } from 'next';
import Container from '../../../components/Container';
import SectionTitle from '../../../components/SectionTitle';
import CoursesList from './CoursesList';


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
