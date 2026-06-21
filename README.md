# hands-on

To install dependencies:

```bash
bun install
```

Start Postgres:

```bash
docker compose up -d postgres
```

To run:

```bash
bun run dev
```

Postgres is available at:

```text
postgresql://admin:password123@localhost:5432/mydb
```

Check Postgres from the app:

```bash
curl http://localhost:3000/db
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
