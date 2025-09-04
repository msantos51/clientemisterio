// Schemas Zod para validação de formulários de autenticação
import { z } from 'zod'

// Esquema de registo
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'É necessário aceitar os termos.' }),
  }),
})

// Esquema de login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// Tipos inferidos para utilização com react-hook-form
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
