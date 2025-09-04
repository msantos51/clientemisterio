// Implementação simples de rate-limit em memória usando LRU Cache
import { LRUCache } from 'lru-cache'
import { NextRequest } from 'next/server'

// Configuração: 5 pedidos por 10 minutos por IP
const limiter = new LRUCache<string, { count: number; firstHit: number }>({
  max: 500,
  ttl: 10 * 60 * 1000, // 10 minutos
})

// Extrai IP real (Render/Proxy/Local)
function getIp(req: NextRequest): string {
  // Next 14 pode não preencher request.ip atrás de proxy
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) {
    // pode vir "ip1, ip2, ip3" — tomar o primeiro
    const first = fwd.split(',')[0]?.trim()
    if (first) return first
  }
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return req.ip ?? '127.0.0.1'
}

// Função que verifica e regista o IP
export function rateLimit(request: NextRequest, limit = 5): boolean {
  const ip = getIp(request)
  const now = Date.now()

  const entry = limiter.get(ip)
  if (!entry) {
    limiter.set(ip, { count: 1, firstHit: now })
    return true
  }

  const nextCount = entry.count + 1
  if (nextCount > limit) {
    // Já excedeu o nº de pedidos dentro da janela (TTL)
    return false
  }

  limiter.set(ip, { count: nextCount, firstHit: entry.firstHit })
  return true
}
