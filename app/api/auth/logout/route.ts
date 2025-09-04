// Rota que redireciona para o signout do NextAuth
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.redirect(new URL('/api/auth/signout', req.url))
}
