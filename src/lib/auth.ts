// Funções simples de autenticação usando localStorage
// Os nomes de variáveis e funções estão em inglês conforme requerido

// Tipo para representar um utilizador
export type AuthUser = {
  email: string;
  password: string;
};

// Regista um novo utilizador armazenando os dados no localStorage
// Retorna true se o registo for bem-sucedido e false se o email já existir
export function registerUser(user: AuthUser): boolean {
  const users: AuthUser[] = JSON.parse(localStorage.getItem('users') || '[]');
  // Verifica se já existe um utilizador com o mesmo email
  if (users.some((stored) => stored.email === user.email)) {
    return false;
  }
  // Adiciona o novo utilizador e guarda no localStorage
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

// Verifica se as credenciais correspondem a algum utilizador registado
export function loginUser(user: AuthUser): boolean {
  const users: AuthUser[] = JSON.parse(localStorage.getItem('users') || '[]');
  return users.some(
    (stored) => stored.email === user.email && stored.password === user.password
  );
}
