// Funções para ligação ao backend de autenticação
// (Comentários em português, código em inglês)

// URL base da API, lida das variáveis de ambiente
// caso não esteja definida, utiliza o backend no Render
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://clientemisterio-backend.onrender.com'

// Extrai mensagem de erro enviada pelo backend
function extractError(errorData: any, fallback: string) {
  // Caso seja uma string simples, devolve diretamente
  if (errorData && typeof errorData.detail === 'string') return errorData.detail
  // Em validações do FastAPI o detalhe pode ser uma lista
  if (errorData && Array.isArray(errorData.detail)) {
    return errorData.detail.map((e: any) => e.msg).join(', ')
  }
  return fallback
}

// Envia dados de registo para o backend
export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(extractError(errorData, 'Registration failed'))
  }

  return response.json()
}

// Envia credenciais de login e devolve o token
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(extractError(errorData, 'Login failed'))
  }

  return response.json()
}

// Obtém os dados do utilizador autenticado
export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(extractError(errorData, 'Fetch failed'))
  }

  return response.json()
}

// Atualiza os dados pessoais do utilizador autenticado
export async function updateUser(data: { name?: string; email?: string }) {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(extractError(errorData, 'Update failed'))
  }

  return response.json()
}
