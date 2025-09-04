// Implementação simples de rate-limit em memória usando LRU Cache
import LRUCache from 'lru-cache'
import { NextRequest } from 'next/server'

// Configuração: 5 pedidos por 10 minutos por IP
const limiter = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60 * 10,
})

// Função que verifica e regista o IP
export function rateLimit(request: NextRequest, limit = 5) {
  const ip = request.ip ?? '127.0.0.1'
  const hits = limiter.get(ip) ?? 0
  if (hits >= limit) return false
  limiter.set(ip, hits + 1)
  return true
}
