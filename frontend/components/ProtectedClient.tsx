'use client'

// Componente que protege páginas no cliente
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  children: ReactNode
}

export function ProtectedClient({ children }: Props) {
  // Router para redirecionar o utilizador
  const router = useRouter()
  // Estado que indica se o acesso é permitido
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    // Função que valida a sessão atual
    const checkSession = () => {
      const session = localStorage.getItem('cm_session')
      try {
        const parsed = session ? JSON.parse(session) : null
        if (parsed && parsed.loggedIn === true) {
          setAllowed(true)
        } else {
          router.replace('/entrar')
        }
      } catch {
        router.replace('/entrar')
      }
    }

    // Verifica sessão inicial
    checkSession()
    // Ouve alterações posteriores de sessão
    window.addEventListener('cm-session', checkSession)
    return () => window.removeEventListener('cm-session', checkSession)
  }, [router])

  // Enquanto não for verificado, não renderiza nada
  if (!allowed) return null

  return <>{children}</>
}
