# Aplicação Web

Frontend em Next.js que consome a API do projeto.

## Configuração

Crie um arquivo `.env.local` com a URL base da API:

```
NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1
```

Depois instale as dependências e execute o servidor de desenvolvimento:

```
npm install
npm run dev
```

A aplicação ficará disponível em http://localhost:3000.

## Cache e Revalidação

As páginas geradas estaticamente utilizam *Incremental Static Regeneration* com
revalidação a cada 60 segundos. As requisições feitas com React Query também
permanecem em cache por 60 segundos antes de uma nova busca. Ajuste esses
valores conforme a necessidade do projeto.
