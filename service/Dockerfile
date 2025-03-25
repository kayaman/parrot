FROM node:23-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm install -g tsx
COPY . .
ENV NODE_ENV=production
USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O- http://localhost:3000/health || exit 1

CMD ["npm", "run", "start"]