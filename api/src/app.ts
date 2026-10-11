import type { RequestListener } from 'node:http'
import { buildSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/http'

const schema = buildSchema(`
  type Item {
    id: ID!
    name: String!
  }

  type Query {
    items: [Item!]!
  }
`)

const graphql = createHandler({
  schema,
  rootValue: {
    items: () => [
      { id: '1', name: 'Moon' },
      { id: '2', name: 'Mars' },
      { id: '3', name: 'Venus' },
    ],
  },
})

export const handler: RequestListener = (request, response) => {
  if (request.url?.split('?')[0] === '/graphql') {
    return graphql(request, response)
  }

  response.writeHead(404, { 'Content-Type': 'text/plain' })
  response.end('Not found')
}
