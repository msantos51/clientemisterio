// Página protegida para utilizadores autenticados
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'
import { SignOutButton } from '../../components/SignOutButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/entrar')
  const name = session.user?.name || session.user?.email
  const role = (session.user as any).role
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Olá, {name}!</h1>
      <p className="text-gray-600">Role: {role}</p>
      <SignOutButton />
    </section>
  )
}
