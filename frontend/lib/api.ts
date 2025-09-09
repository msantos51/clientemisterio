// /lib/api.ts
// Funções para ligação ao backend de autenticação
// (Comentários em português, código em inglês)

// URL base da API, lida das variáveis de ambiente;
// caso não esteja definida, utiliza o backend no Render.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://clientemisterio-backend.onrender.com'

// Tipos úteis (ajusta se o teu backend devolver mais campos)
export type ApiUser = {
  id: number
  name: string
  email: string
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

// Pequeno helper para fazer requests com JSON + cookies incluídos
async function request<T>(
  path: string,
  init: RequestInit & { json?: any } = {}
): Promise<T> {
  const { json, headers, ...rest } = init

  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include', // 👈 necessário para cookie httponly cross-site
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    ...(json !== undefined ? { body: JSON.stringify(json), method: rest.method ?? 'POST' } : {}),
    ...rest,
  })

  const contentType = res.headers.get('Content-Type') || ''
  const parseBody = async () => (contentType.includes('application/json') ? res.json() : res.text())

  if (!res.ok) {
    let data: any = undefined
    try {
      data = await parseBody()
    } catch {
      // ignore parsing errors
    }
    const msg = extractError(data, `${res.status} ${res.statusText}`)
    throw new Error(msg)
  }

  // @ts-expect-error — se não for JSON, devolve string
  return await parseBody()
}

// ─────────────────────────── Auth Endpoints ───────────────────────────

// Envia dados de registo para o backend
export async function registerUser(data: { name: string; email: string; password: string }): Promise<ApiUser> {
  return request<ApiUser>('/auth/register', { json: data })
}

// Envia credenciais de login e devolve o token (o cookie httponly também é definido)
export async function loginUser(data: { email: string; password: string }): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', { json: data })
}

// Faz logout limpando o cookie de sessão no backend
export async function logout(): Promise<void> {
  await request<void>('/auth/logout', { method: 'POST' })
}

// Obtém os dados do utilizador autenticado (requer cookie ou Bearer; aqui usamos cookie)
export async function getCurrentUser(): Promise<ApiUser> {
  return request<ApiUser>('/auth/me', { method: 'GET' })
}

// Atualiza os dados pessoais do utilizador autenticado
export async function updateUser(data: { name?: string; email?: string }): Promise<ApiUser> {
  return request<ApiUser>('/auth/me', { method: 'PUT', json: data })
}
