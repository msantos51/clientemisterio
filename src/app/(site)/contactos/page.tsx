
import type { Metadata } from 'next';
import Container from '../../../components/Container';
import SectionTitle from '../../../components/SectionTitle';
import ContactForm from './ContactForm';


export const metadata: Metadata = {
  title: 'Cliente Mistério | Contactos',
  description: 'Entre em contacto connosco através do formulário.',
};


// Página de contactos com formulário
export default function ContactPage() {

  return (
    <Container>
      <section className="py-16">
        <SectionTitle title="Contactos" subtitle="Envie-nos uma mensagem" />

        <ContactForm />


      </section>
    </Container>
  );
}
