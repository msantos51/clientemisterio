// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth'

// Augmenta o tipo da Session para incluir id e role no user
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: string
    } & DefaultSession['user']
  }
}

// Augmenta o JWT para transportar a role
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}
