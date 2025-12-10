'use client'

// Página com recursos de oportunidades e carreira
import { useState } from 'react'
import Link from 'next/link'

export default function OpportunitiesPage() {
  // Estado para controlar a partilha de perfil com parceiros
  const [shareProfile, setShareProfile] = useState(false)

  return (
    <section className="space-y-6">
      {/* Título da página */}
      <h3 className="text-xl font-bold">Oportunidades &amp; Carreira</h3>

      {/* Diretório de empresas com links de recursos */}
      <div>
        <h4 className="font-semibold">Diretório de empresas</h4>
        <ul className="list-disc pl-5">
          <li>
            <Link href="#" className="underline">
              Empresa A
            </Link>
          </li>
          <li>
            <Link href="#" className="underline">
              Empresa B
            </Link>
          </li>
        </ul>
      </div>

      {/* Opt-in/out para partilha de perfil com parceiros */}
      <div>
        <h4 className="font-semibold">Partilha de perfil com empresas parceiras</h4>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={shareProfile}
            onChange={(e) => setShareProfile(e.target.checked)}
          />
          <span>Permitir partilha do meu perfil</span>
        </label>
      </div>

      {/* Informação sobre alertas de oportunidades */}
      <div>
        <h4 className="font-semibold">Alertas de oportunidades</h4>
        <p className="text-sm text-purple-700">
          Inscreva-se na nossa newsletter ou Telegram para receber novidades.
        </p>
      </div>
    </section>
  )
}
