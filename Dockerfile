FROM node:24-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
ADD public public
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
CMD ["node", ".output/server/index.mjs"]
