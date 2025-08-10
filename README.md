 
# Projeto de Galeria de Imagens com Autenticação

Este é um monorepo que contém uma API Node.js/Express e um aplicativo web Next.js para uma galeria de imagens. A API gerencia a autenticação de usuários, enquanto o aplicativo web consome essa API para exibir imagens, permitir likes e gerenciar o upload de novas imagens.

## Estrutura do Projeto

- `api/`: Backend em Node.js com Express, MongoDB, e JWT para autenticação.
- `web/`: Frontend em Next.js 14 com TypeScript, Tailwind CSS e shadcn/ui.
- `docker-compose.yml`: Orquestração de todos os serviços (MongoDB, API e Web) para fácil inicialização.

---

## Como Rodar

Existem duas formas de rodar o projeto:

1.  **Com Docker Compose (Recomendado)**
2.  **Localmente (Manual)**

### 1. Com Docker Compose

Certifique-se de ter o Docker e o Docker Compose instalados.

1.  **Configurar Variáveis de Ambiente:**
    * Navegue até `api/` e `web/`.
    * Copie os arquivos `.env.example` para `.env` e `.env.local` respectivamente.
    * `cp ./api/.env.example ./api/.env`
    * `cp ./web/.env.local.example ./web/.env.local`
    * No arquivo `web/.env.local`, defina a URL da API:
      `NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1`
    * Você pode personalizar os segredos JWT conforme necessário.

2.  **Iniciar os Serviços:**
    * Na raiz do projeto, execute o comando:
        ```bash
        docker-compose up --build
        ```
    * Isso construirá as imagens, iniciará o MongoDB, a API e o aplicativo web.

3.  **Acessar os Aplicativos:**
    * **API (Docs):** http://localhost:3333/docs
    * **Galeria Web:** http://localhost:3000

Para parar os serviços, pressione `Ctrl + C` no terminal e depois execute: `docker-compose down`.

### 2. Localmente (Manual)

#### Pré-requisitos

* Node.js v18+
* npm
* MongoDB localmente em execução (porta 27017)

#### Passos

1.  **Backend (`api/`)**
    * Navegue até a pasta `api/`.
    * Copie `.env.example` para `.env`: `cp .env.example .env`.
    * Instale as dependências: `npm install`.
    * Inicie o servidor em modo de desenvolvimento: `npm run dev`.
    * Acesse a documentação da API em: http://localhost:3333/docs

2.  **Frontend (`web/`)**
    * Navegue até a pasta `web/`.
    * Copie `.env.local.example` para `.env.local`: `cp .env.local.example .env.local`.
    * Edite `.env.local` e configure `NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1`.
    * Instale as dependências: `npm install`.
    * Inicie o servidor de desenvolvimento: `npm run dev`.
    * Acesse a galeria de imagens em: http://localhost:3000

---

## Estrutura de Pastas

```
/ (raiz)
├─ README.md
├─ docker-compose.yml
├─ api/
└─ web/
```

<div class="note">
  <h2>Build e Execução</h2>
  <p>Para gerar a versão de produção do frontend, navegue até <code>web/</code>, execute <code>npm run build</code> e em seguida <code>npm start</code>.</p>
</div>
