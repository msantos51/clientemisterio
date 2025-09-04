'use client'

// Página protegida que mostra o conteúdo do curso
// Importa o componente que protege a página
import { ProtectedClient } from '../../../components/ProtectedClient'

export default function StudentPage() {
  return (
    <ProtectedClient>
      <section className="py-8">
        {/* Título da página para o aluno */}
        <h2 className="mb-4 text-center text-2xl font-bold">Curso Cliente Mistério</h2>
        {/* Frase motivacional para o aluno */}
        <p className="mb-8 text-center text-gray-600">Explore o conteúdo interativo do curso.</p>
        {/* Iframe com o conteúdo do Genially */}
        <iframe
          src="https://view.genially.com/68b97653b3a4717fa5a9e8b1"
          style={{ width: '100%', height: '80vh', border: 0 }}
          allowFullScreen
        />
      </section>
    </ProtectedClient>
  )
}
