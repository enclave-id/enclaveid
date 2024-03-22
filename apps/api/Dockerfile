FROM node:20.11.1-alpine3.18

RUN npm install -g pnpm@8.15.4

COPY /workspace /app

WORKDIR /app

RUN pnpm install

RUN pnpm exec nx run api:build --configuration=development --skipTypeCheck=true

EXPOSE 3000

CMD ["pnpm", "exec", "nx", "run", "api:serve", "--configuration=development"]
