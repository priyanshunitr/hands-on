# hands-on

To install dependencies:

```bash
bun install
```

To start Postgres and Redis:

```bash
docker compose up -d postgres redis
```

To run:

```bash
bun run dev
```

Postgres is available at:

```text
postgresql://admin:password123@localhost:5432/mydb
```

Verify the app can connect to Postgres:

```bash
curl http://localhost:3000/health/db
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
