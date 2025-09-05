# Sunny Sales

Estrutura preparada para executar frontend e backend como serviços separados no Render.

## Estrutura
- `frontend/`: aplicação Next.js responsável pelo site público.
- `backend/`: API FastAPI com PostgreSQL.

## Desenvolvimento
### Frontend
1. Instalar dependências: `cd frontend && npm install`.
2. Iniciar servidor de desenvolvimento: `npm run dev`.
3. Gerar build de produção: `npm run build`.

### Backend
1. Instalar dependências: `cd backend && pip install -r requirements.txt`.
2. Iniciar servidor de desenvolvimento: `uvicorn main:app --reload`.

## Deployment no Render
O ficheiro `render.yaml` define dois webservices: um para o backend e outro para o frontend, permitindo deploy separado em Render.
