// Middleware que protege rotas privadas
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isAuth = !!token
  const { pathname } = request.nextUrl

  if (!isAuth && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/entrar', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'],
}
