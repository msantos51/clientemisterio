// /lib/api.ts
// Funções para ligação ao backend de autenticação
// (Comentários em português, código em inglês)

// Detecta URL da API a partir da variável de ambiente ou usa valor padrão
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  'https://clientemisterio-backend.onrender.com'

// Tipos úteis (ajusta conforme o teu backend)
export type ApiUser = {
  id: number
  name: string
  email: string
  has_paid: boolean
  created_at?: string
  updated_at?: string
}

export type LoginResponse = {
  access_token: string
  token_type: 'bearer' | string
  expires_in: number
}

// Extrai mensagem de erro enviada pelo backend (robusto)
function extractError(errorData: any, fallback: string) {
  if (!errorData) return fallback
  if (typeof errorData === 'string') return errorData
  if (typeof errorData.detail === 'string') return errorData.detail
  if (Array.isArray(errorData.detail)) return errorData.detail.map((e: any) => e.msg).join(', ')
  if (typeof errorData.message === 'string') return errorData.message
  return fallback
}

// Helper genérico para requests com cookies incluídos
async function request<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const { json, headers, ...rest } = init

  const withJson = json !== undefined

  // Normaliza os cabeçalhos recebidos (Headers | string[][] | Record) para um objeto simples
  const normalizeHeaders = (input?: HeadersInit): Record<string, string> => {
    if (!input) return {}
    if (input instanceof Headers) {
      const obj: Record<string, string> = {}
      input.forEach((v, k) => {
        obj[k] = v
      })
      return obj
    }
    if (Array.isArray(input)) {
      return input.reduce<Record<string, string>>((acc, [k, v]) => {
        acc[k] = v
        return acc
      }, {})
    }
    return { ...input }
  }

  const baseHeaders = normalizeHeaders(headers)

  // Cabeçalho final que inclui JSON e token de autorização quando disponível
  const finalHeaders: Record<string, string> = withJson
    ? { 'Content-Type': 'application/json', ...baseHeaders }
    : { ...baseHeaders }

  // Procura token de sessão guardado no localStorage
  let token: string | null = null
  if (typeof window !== 'undefined') {
    try {
      const session = localStorage.getItem('cm_session')
      const parsed = session ? JSON.parse(session) : null
      token = parsed?.token ?? null
    } catch {
      // ignora erros ao ler/parsing do localStorage
    }
  }

  // Se existir token, inclui-o no cabeçalho Authorization
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include', // 👈 necessário para cookie httponly cross-site
    headers: finalHeaders,
    // Força a não utilização de cache para obter sempre dados atualizados
    cache: 'no-store',
    ...(withJson ? { body: JSON.stringify(json), method: rest.method ?? 'POST' } : {}),
    ...rest,
  })

  const contentType = res.headers.get('Content-Type') || ''
  const parseBody = async () =>
    contentType.includes('application/json') ? res.json() : res.text()

  if (!res.ok) {
    let data: any = undefined
    try {
      data = await parseBody()
    } catch {
      // ignora falhas ao analisar a resposta
    }


    // Extrai mensagem de erro devolvida pelo backend
    const msg = extractError(data, `${res.status} ${res.statusText}`)

    // Em caso de 401, limpa sessão e notifica a aplicação
    if (res.status === 401 && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('cm_session')
      } catch {
        // ignora falhas ao aceder ao localStorage
      }
      window.dispatchEvent(new Event('cm-session'))
      throw new Error('Sessão expirada. Faça login novamente.')
    }

    // Para outros erros, lança a mensagem obtida
    throw new Error(msg)
  }

  // Sucesso: devolve o body como T (JSON na maioria dos casos)
  const data = (await parseBody()) as unknown as T
  return data
}

// ─────────────────────────── Auth Endpoints ───────────────────────────

export async function registerUser(data: {
  name: string
  email: string
  password: string
}): Promise<ApiUser> {
  return request<ApiUser>('/auth/register', { json: data })
}

export async function loginUser(data: {
  email: string
  password: string
}): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', { json: data })
}

export async function logout(): Promise<void> {
  // 204 No Content esperado; ignoramos o body
  await request<void>('/auth/logout', { method: 'POST' })
}

export async function getCurrentUser(): Promise<ApiUser> {
  return request<ApiUser>('/auth/me', { method: 'GET' })
}

export async function updateUser(data: {
  name?: string
  email?: string
  password?: string // password opcional para permitir alteração
}): Promise<ApiUser> {
  return request<ApiUser>('/auth/me', { method: 'PUT', json: data })
}

// Atualiza o estado de pagamento do utilizador autenticado
export async function updatePaymentStatus(data: {
  has_paid: boolean
}): Promise<ApiUser> {
  return request<ApiUser>('/auth/me/payment', { method: 'PUT', json: data })
}

// ────────────────────────── Contact Endpoint ─────────────────────────

export async function sendContactMessage(data: {
  name: string
  email: string
  message: string
}): Promise<void> {
  // Envia os dados do formulário de contacto para o backend
  await request<void>('/contact', { json: data })
}
