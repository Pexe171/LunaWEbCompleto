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

As requisições ao backend utilizam o React Query com `staleTime` de 60 segundos, o que
garante um cache leve e revalidação automática após esse período ou quando a página é
focada novamente. As rotas expõem também `sitemap` e `robots` para auxiliar mecanismos
de busca.
