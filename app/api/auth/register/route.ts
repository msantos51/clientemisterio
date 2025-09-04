// Rota de registo de utilizadores
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { registerSchema } from '../../../../lib/validators'
import { hash } from 'bcrypt'
import { rateLimit } from '../../../../lib/rateLimit'

export async function POST(req: NextRequest) {
  if (!rateLimit(req)) {
    return NextResponse.json({ message: 'Demasiados pedidos.' }, { status: 429 })
  }
  const body = await req.json()
  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Dados inválidos.' }, { status: 400 })
  }
  const { email, password, name } = parsed.data
  const normalisedEmail = email.toLowerCase().trim()
  const existing = await prisma.user.findUnique({ where: { email: normalisedEmail } })
  if (existing) {
    return NextResponse.json({ message: 'Este email já está registado.' }, { status: 409 })
  }
  const passwordHash = await hash(password, 12)
  await prisma.user.create({
    data: { email: normalisedEmail, passwordHash, name, role: 'ALUNO' },
  })
  return NextResponse.json({ message: 'Conta criada com sucesso.' }, { status: 201 })
}
