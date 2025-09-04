// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validators'
import { hash } from 'bcrypt'
import { rateLimit } from '@/lib/rateLimit'

// Garante Node.js runtime (bcrypt/prisma não funcionam no edge)
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // Rate limit simples por IP
  if (!rateLimit(req)) {
    return NextResponse.json({ message: 'Demasiados pedidos.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ message: 'Dados inválidos.' }, { status: 400 })
    }

    const { email, password, name } = parsed.data
    const normalisedEmail = email.toLowerCase().trim()

    // Verifica duplicados
    const existing = await prisma.user.findUnique({ where: { email: normalisedEmail } })
    if (existing) {
      return NextResponse.json({ message: 'Este email já está registado.' }, { status: 409 })
    }

    // Hash da password
    const passwordHash = await hash(password, 12)

    await prisma.user.create({
      data: { email: normalisedEmail, passwordHash, name, role: 'ALUNO' },
    })

    return NextResponse.json({ message: 'Conta criada com sucesso.' }, { status: 201 })
  } catch (err: any) {
    // Trata erros conhecidos do Prisma (ex.: unique constraint) e genéricos
    if (err?.code === 'P2002') {
      return NextResponse.json({ message: 'Este email já está registado.' }, { status: 409 })
    }
    console.error('Erro no registo:', err)
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}
