import { createServer } from 'node:http'
import { handler } from './app'

const port = Number(process.env.PORT ?? 5173)

createServer(handler).listen(port, '0.0.0.0', () => {
  console.log(`GraphQL API listening at http://localhost:${port}/graphql`)
})
