# Sunny Sales

Aplicação Next.js 14 com autenticação via NextAuth e base de dados PostgreSQL.

## Configuração local
1. Copiar `.env.example` para `.env` e preencher as variáveis.
2. Instalar as dependências: `npm install`.
3. Gerar o cliente Prisma: `npm run prisma:generate`.
4. Executar as migrações: `npm run prisma:migrate`.
5. Iniciar o servidor de desenvolvimento: `npm run dev`.

## Deploy no Render
1. Definir as variáveis de ambiente `DATABASE_URL` e `NEXTAUTH_SECRET`.
2. Comando de build: `npm ci && npm run build`.
3. Comando de start: `npm start`.
4. Certificar que a base de dados está acessível e que as migrações foram aplicadas.

## Testes
- Testes unitários: `npm test`.
- Testes end-to-end (Playwright): `npm run test:e2e`.
