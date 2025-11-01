 
# Projeto de Galeria de Imagens com Autenticação

Este é um monorepo que contém uma API Node.js/Express e um aplicativo web Next.js para uma galeria de imagens. A API gerencia a autenticação de usuários, enquanto o aplicativo web consome essa API para exibir imagens, permitir likes e gerenciar o upload de novas imagens.

Principais recursos atuais:

- Manifesto público reforçando o compromisso com criações humanas.
- Política de publicação que deixa explícito que obras geradas por IA não são aceitas.
- Fila de moderação manual com painel administrativo para aprovar ou recusar envios.
- Campo de assinatura digital (e link opcional de certificado) obrigatório em cada envio.

## Acesso de Administrador

Por padrão, um usuário administrador é criado automaticamente quando a API inicia.
Use as credenciais abaixo para acessar a área de upload:

- **Email:** `admin@galeriapexe.com`
- **Senha:** `Adm1n#2024`

## Estrutura do Projeto

- `api/`: Backend em Node.js com Express, MongoDB e JWT para autenticação.
- `web/`: Frontend em Next.js 14 com TypeScript, Tailwind CSS e shadcn/ui.
- `docker-compose.yml`: Orquestração de todos os serviços (MongoDB, API e Web) para fácil inicialização.

## Política de Publicação e Autoria

- Apenas obras produzidas manualmente são publicadas. O manifesto “Arte Humana” e a página de política explicam os critérios.
- Toda submissão exige uma assinatura digital (hash, certificado ou declaração exclusiva) para autenticar a autoria.
- Envios chegam com status **pendente** e são avaliados pelo painel de moderação. Administradores registram notas de curadoria ao aprovar ou recusar cada obra.
- Conteúdos reprovados podem ser reabertos para nova análise caso a equipe decida.


---

## Guia Rápido

Use este passo a passo como checklist sempre que precisar ligar o projeto do zero.

### 1. Pré-requisitos

* Docker e Docker Compose instalados **ou** Node.js 18+ com npm.
* MongoDB local (somente para execução manual).
* Arquivos `.env` preenchidos (veja abaixo).

### 2. Configurar variáveis de ambiente

```bash
cp ./api/.env.example ./api/.env
cp ./web/.env.local.example ./web/.env.local
```

Depois:

* Ajuste `NEXT_PUBLIC_API_URL` no `web/.env.local` para apontar para a API.
* No `api/.env`, revise as chaves de segurança (`JWT_*`), origens de CORS e limites de rate limit (`RATE_LIMIT_*`).

### 3. Subir tudo com Docker Compose (recomendado)

1. Na raiz do monorepo rode uma primeira vez com build completo:

    ```bash
    docker compose up --build
    ```

2. Nas próximas vezes basta iniciar sem rebuild:

    ```bash
    docker compose up
    ```

3. Quando precisar rodar em segundo plano utilize:

    ```bash
    docker compose up -d
    ```

4. Para desligar os serviços:

    ```bash
    docker compose down
    ```

5. Endpoints úteis após o start:
    * **API (Swagger):** http://localhost:3333/docs
    * **Healthcheck:** `curl http://localhost:3333/healthz`
    * **Readiness:** `curl http://localhost:3333/readyz`
    * **Métricas:** `curl http://localhost:3333/metrics`
    * **Galeria Web:** http://localhost:3000

### 4. Executar manualmente (sem Docker)

1. **Backend (`api/`)**
    ```bash
    cd api
    npm install
    npm run dev
    ```

2. **Frontend (`web/`)**
    ```bash
    cd web
    npm install
    npm run dev
    ```

3. A API ficará em http://localhost:3333 e o frontend em http://localhost:3000.

---

## Scripts de Build e Produção

Use os scripts abaixo quando precisar gerar builds otimizadas ou publicar uma nova versão.

| Diretório | Build de produção | Start após build | Testes |
| --- | --- | --- | --- |
| `api/` | `npm run build` | `npm run start` | `npm test` |
| `web/` | `npm run build` | `npm run start` | `npm test` |

> Após alterar dependências, rode novamente `docker compose up --build` para gerar imagens atualizadas.

### Limites de Requisições

| Ambiente | Login/Registro (req/min) | Upload (req/h) |
| --- | --- | --- |
| Desenvolvimento | 20 | 50 |
| Homologação | 10 | 30 |
| Produção | 5 | 20 |

Os limites acima podem ser ajustados pelas variáveis `RATE_LIMIT_AUTH_WINDOW_MS`, `RATE_LIMIT_AUTH_MAX`, `RATE_LIMIT_UPLOAD_WINDOW_MS` e `RATE_LIMIT_UPLOAD_MAX`. Quando o limite é excedido, a API responde com **429** e o corpo `{ "message": "Limite de requisições atingido. Tente novamente mais tarde." }`, além dos cabeçalhos `RateLimit-*`.

### Métricas

O endpoint `/metrics` expõe um JSON com estatísticas por rota, incluindo:

* quantidade de requisições;
* latência p50 e p95 em milissegundos;
* contagem de erros 4xx e 5xx.

---

## Atualização de Dependências

Sempre que precisar atualizar bibliotecas ou componentes compartilhados:

1. **Verifique versões desatualizadas**

    ```bash
    cd api && npm outdated
    cd ../web && npm outdated
    ```

2. **Atualize o que for necessário**

    ```bash
    npm update            # dentro de cada pasta
    npm install pacote@^x # quando quiser subir manualmente a versão
    ```

3. **Recrie builds e imagens**

    ```bash
    npm run build         # em api/ e web/
    docker compose up --build
    ```

4. **Rode os testes de regressão**

    ```bash
    npm test              # em api/ e web/
    ```

Documente mudanças importantes no `CHANGELOG.md` (se aplicável) e comunique a equipe antes de promover para produção.

---

## Estrutura de Pastas

```
/ (raiz)
├─ README.md
├─ docker-compose.yml
├─ api/
└─ web/
```
