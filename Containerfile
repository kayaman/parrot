FROM node:22-slim

LABEL org.opencontainers.image.source=https://github.com/kayaman/parrot
LABEL org.opencontainers.image.description="Parrots mimic and repeat human speech and sounds."
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
USER node
EXPOSE 9999

CMD ["node", "dist/server.js"]