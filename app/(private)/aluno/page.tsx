'use client'

// Página protegida que mostra o conteúdo do curso
// Importa o componente que protege a página
import { ProtectedClient } from '../../../components/ProtectedClient'

export default function StudentPage() {
  return (
    <ProtectedClient>
      <section className="py-8">
        {/* Iframe com o conteúdo do Genially */}
        <iframe
          src="https://view.genial.ly/SEU_GENIALLY_ID"
          style={{ width: '100%', height: '80vh', border: 0 }}
        />
      </section>
    </ProtectedClient>
  )
}
