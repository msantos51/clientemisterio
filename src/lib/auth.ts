// Funções simples de autenticação usando localStorage
// Os nomes de variáveis e funções estão em inglês conforme requerido

// Tipo para representar um utilizador
export type AuthUser = {
  email: string;
  password: string;
};

// Regista um novo utilizador armazenando os dados no localStorage
export function registerUser(user: AuthUser): void {
  const users: AuthUser[] = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Verifica se as credenciais correspondem a algum utilizador registado
export function loginUser(user: AuthUser): boolean {
  const users: AuthUser[] = JSON.parse(localStorage.getItem('users') || '[]');
  return users.some(
    (stored) => stored.email === user.email && stored.password === user.password
  );
}
