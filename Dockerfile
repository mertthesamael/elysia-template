    FROM oven/bun AS build
    WORKDIR /app

    RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
    COPY package.json bun.lock ./
    RUN bun install

    COPY ./src ./src
    COPY prisma.config.ts ./
    COPY .env ./

    ARG PORT
    ENV PORT=${PORT} 
    EXPOSE ${PORT}


    ENV DATABASE_URL=${DATABASE_URL}
    RUN bunx prisma db pull
    RUN bunx prisma generate
    
    RUN bun run build:docker
    CMD ["./server"]

