import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import express from 'express'

import { prisma } from './db'

const typeDefs = `
  type Item {
    id: ID!
    name: String!
  }

  type Query {
    items: [Item!]!
  }
`

export const apollo = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      items: () => [
        { id: '1', name: 'Moon' },
        { id: '2', name: 'Mars' },
        { id: '3', name: 'Venus' },
      ],
    },
  },
  stopOnTerminationSignals: false,
})

await prisma.$connect()
await apollo.start()

export const app = express()
app.use('/graphql', cors(), express.json(), expressMiddleware(apollo, {
  context: async () => ({ prisma }),
}))

export const handler = app
