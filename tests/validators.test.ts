// Testes unitários para os schemas Zod
import { describe, it, expect } from 'vitest'
import { registerSchema } from '../lib/validators'

describe('registerSchema', () => {
  it('aceita dados válidos', () => {
    const data = { email: 'a@b.com', password: 'password', terms: true }
    const result = registerSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('rejeita email inválido', () => {
    const data = { email: 'invalid', password: 'password', terms: true }
    const result = registerSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
