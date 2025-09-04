// lib/auth.ts
// Configuração do NextAuth com Credentials Provider
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { prisma } from './prisma'
import { loginSchema } from './validators'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  // (opcional mas recomendado)
//   secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null

        const valid = await compare(password, user.passwordHash)
        if (!valid) return null

        // Devolve apenas o mínimo necessário
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: (user as any).role ?? 'user',
        } as any
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Quando há login, propaga dados do utilizador para o token
      if (user) {
        token.sub = (user as any).id ?? token.sub
        token.email = (user as any).email ?? token.email
        ;(token as any).role = (user as any).role ?? (token as any).role ?? 'user'
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token) {
        // Cast para evitar erro TS antes da augmentation
        ;(session.user as any).id = String(token.sub ?? '')
        session.user.email = (token.email as string | null) ?? session.user.email ?? null
        ;(session.user as any).role = (token as any).role ?? 'user'
      }
      return session
    },
  },

  pages: {
    signIn: '/entrar',
  },
}

export default authOptions
