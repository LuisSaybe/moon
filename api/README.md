# Moon API

Minimal TypeScript GraphQL API. Vite compiles the server; `graphql-http`
handles requests at `/graphql`. The sample collection is stored in memory.

## Docker

From this directory, run:

```sh
docker compose up --build
```

The existing Compose setup installs dependencies with `npm ci`, then starts
Vite at http://localhost:5173/graphql. Source changes take effect on the next
request.

If the web app already occupies port 5173, use a different host port:

```sh
docker compose run --rm --build -p 5174:5173 vite
```

In that case, use port 5174 in the example below.

## Query

```sh
curl http://localhost:5173/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ items { id name } }"}'
```

```json
{"data":{"items":[{"id":"1","name":"Moon"},{"id":"2","name":"Mars"},{"id":"3","name":"Venus"}]}}
```

## Local development and production build

With Node.js 24:

```sh
npm ci
npm run dev
```

`npm run lint` checks JavaScript and TypeScript files with ESLint's recommended
rules and Node.js globals. Generated `dist` files are ignored.

ESLint's TypeScript parser currently requires TypeScript 6. The
`typescript-compiler` alias retains TypeScript 7 for `npm run check` and builds;
the separate `typescript` dependency supports linting.

`npm run check` checks types. `npm run build` checks types and uses Vite to
compile `src/server.ts` into `dist/server.js`. `npm start` serves that build
with Node.js; set `PORT` to change its default port of 5173.

To build using the existing Docker image:

```sh
docker compose run --rm install
docker compose run --rm --no-deps vite npm run build
docker compose run --rm --no-deps -p 5174:5173 vite npm start
```
