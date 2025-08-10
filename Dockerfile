# Dockerfile para o Frontend (Next.js)
# Usa a imagem oficial do Node.js 18 como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do npm. Esta linha estava faltando.
RUN npm install

# Copia todo o código-fonte restante para o container
COPY . .

# Expõe a porta em que o Next.js vai rodar
EXPOSE 3000

# Define o comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
