import { app, apollo } from './app'
import { prisma } from './db'

const port = Number(process.env.PORT ?? 5173)

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`GraphQL API listening at http://localhost:${port}/graphql`)
})

let stopping = false
async function shutdown() {
  if (stopping) {
    return;
  }

  stopping = true
  
  server.close(async (error) => {
    try {
      await apollo.stop()
      await prisma.$disconnect()
      process.exitCode = error ? 1 : 0
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }
  })
}

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
