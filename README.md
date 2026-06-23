# hands-on

To install dependencies:

```bash
bun install
```

Start Postgres and Redis:

```bash
docker compose up -d postgres redis
```

To run the main API:

```bash
bun run dev
```

To run the profile microservice in another terminal:

```bash
bun run dev:profile
```

Postgres is available at:

```text
postgresql://admin:password123@localhost:5432/mydb
```

Check Postgres from the app:

```bash
curl http://localhost:3000/db
```

Create or update a profile:

```bash
curl -X POST http://localhost:3001/profiles \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"user-1\",\"displayName\":\"Sahil\",\"bio\":\"Learning microservices\"}"
```

Get a profile:

```bash
curl http://localhost:3001/profiles/user-1
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
