# Dockerfile para o Frontend (Next.js)
# Usa a imagem oficial do Node.js 18 como base
FROM node:18.19-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do npm. Esta linha estava faltando.
RUN npm install && apk add --no-cache curl

# Copia todo o código-fonte restante para o container
COPY . .

# Expõe a porta em que o Next.js vai rodar
EXPOSE 3000

# Define o comando para iniciar a aplicação em modo de desenvolvimento
# Executa "npm install" em tempo de inicialização para garantir que
# quaisquer novas dependências sejam instaladas quando a aplicação
# estiver sendo executada com volumes montados.
CMD ["sh", "-c", "npm install && npm run dev"]

