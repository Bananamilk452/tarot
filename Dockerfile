FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
ADD public public
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
CMD ["node", ".output/server/index.mjs"]