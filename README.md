# Cliente Mistério 📋🔍

Plataforma em Portugal para quem quer aprender a ser **Cliente Mistério**.  
O objetivo do site é **vender o curso de Cliente Mistério** e dar acesso aos alunos ao conteúdo do curso, que está a ser desenvolvido no **Genially**.

---

## 🚀 Funcionalidades

- Página de apresentação do curso
- Explicação clara dos objetivos do curso
- Sistema de login/registo para alunos
- Área reservada para quem comprou o curso
- Integração com conteúdo interativo no Genially

## 📦 Estrutura

- `frontend/`: aplicação Next.js responsável pelo site público.
- `backend/`: API FastAPI com PostgreSQL.

## 🛠 Desenvolvimento

### Frontend
1. Instalar dependências: `cd frontend && npm install`.
2. Iniciar servidor de desenvolvimento: `npm run dev`.
3. Gerar build de produção: `npm run build`.

### Backend
1. Instalar dependências: `cd backend && pip install -r requirements.txt`.
2. Iniciar servidor de desenvolvimento: `uvicorn main:app --reload`.

## 🚢 Deployment no Render

O ficheiro `render.yaml` define dois webservices: um para o backend e outro para o frontend, permitindo deploy separado em Render.

### Variáveis de ambiente

- **Backend**
  - `FRONTEND_URL`: domínio autorizado nas chamadas CORS (ex.: `https://clientemisterio-frontend.onrender.com`)
  - `SECRET_KEY`: chave usada para assinar os tokens JWT
- **Frontend**
  - `NEXT_PUBLIC_API_URL`: URL base da API (ex.: `https://clientemisterio-backend.onrender.com`)

