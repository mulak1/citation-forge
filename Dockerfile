FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 4101
ENV PORT=4101 NODE_ENV=production
CMD ["node", "src/server.js"]
