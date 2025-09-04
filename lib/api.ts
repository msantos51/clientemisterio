// Funções para ligação ao backend de autenticação
// (Comentários em português, código em inglês)

// URL base da API, lida das variáveis de ambiente
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

// Envia dados de registo para o backend
export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error((errorData as any).detail ?? 'Registration failed')
  }

  return response.json()
}

// Envia credenciais de login e devolve o token
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error((errorData as any).detail ?? 'Login failed')
  }

  return response.json()
}
