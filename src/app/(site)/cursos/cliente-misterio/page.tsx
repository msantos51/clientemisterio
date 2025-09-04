import Container from '../../../../components/Container';
import SectionTitle from '../../../../components/SectionTitle';

// Página que apresenta o curso incorporado via Genially
export default function MysteryClientCoursePage() {
  return (
    <Container>
      <section className="py-16">
        {/* Título da página do curso */}
        <SectionTitle title="Curso Completo Cliente Mistério" />
        {/* Contém o iframe responsivo para o curso */}
        <div style={{ width: '100%' }}>
          {/* Wrapper responsável pela proporção 16:9 */}
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              paddingTop: 0,
              height: 0,
            }}
          >
            {/* Iframe que incorpora o curso criado no Genially */}
            <iframe
              title="Curso Completo Cliente Mistério"
              src="https://view.genially.com/68b97653b3a4717fa5a9e8b1"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              frameBorder="0"
              allowFullScreen
              scrolling="yes"
            ></iframe>
          </div>
        </div>
      </section>
    </Container>
  );
}

