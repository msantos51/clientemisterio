// Barra de navegação com estado da sessão
import Link from 'next/link'
import type { Session } from 'next-auth'
import { SignOutButton } from './SignOutButton'

interface Props {
  session: Session | null
}

export function Navbar({ session }: Props) {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold">
          Sunny Sales
        </Link>
        <div className="space-x-4">
          {!session && (
            <>
              <Link href="/entrar">Entrar</Link>
              <Link href="/registar">Registar</Link>
            </>
          )}
          {session && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <SignOutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
