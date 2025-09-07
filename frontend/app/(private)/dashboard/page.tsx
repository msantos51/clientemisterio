'use client'

// Página protegida que funciona como dashboard do aluno
// Importa o componente que protege a página
import { ProtectedClient } from '../../../components/ProtectedClient'

export default function DashboardPage() {
  return (
    <ProtectedClient>
      {/* Secção principal do dashboard sem margem superior */}
      <section className="pb-8">
        {/* Título principal do dashboard */}
        <h2 className="mb-4 text-center text-2xl font-bold">Curso Cliente Mistério</h2>
        {/* Frase motivacional para contextualizar o aluno */}
        <p className="mb-8 text-black">Explore o conteúdo interativo do curso.</p>
        {/* Contêiner responsivo com o iframe do curso dentro de uma caixa laranja translúcida */}
        <div
          className="rounded-lg bg-[#ee692e]/20 p-4"
          style={{ width: '100%' }}
        >
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              paddingTop: 0,
              height: 0,
            }}
          >
            <iframe
              title="Curso Completo Cliente Mistério"
              frameBorder={0}
              width={1200}
              height={675}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src="https://view.genially.com/68b97653b3a4717fa5a9e8b1"
              allowFullScreen
              scrolling="yes"
            />
          </div>
        </div>
      </section>
    </ProtectedClient>
  )
}
