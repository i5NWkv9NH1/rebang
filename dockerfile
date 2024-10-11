# docker/dev.Dockerfile
FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
# COPY bun.lockb ./

RUN bun install

COPY . .

# for deploting the build version

# RUN bun next build
# and
# CMD bun next start

# OR for sart Next.js in development, comment above two lines and uncomment below line

CMD bun run dev

# * Note: Don't expose ports here, Compose will handle that for us