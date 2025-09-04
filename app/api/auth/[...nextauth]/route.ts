// app/api/auth/[...nextauth]/route.ts
// Handler do NextAuth para rotas de autenticação
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth' // usa alias "@" se tiveres baseUrl configurado no tsconfig.json

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
