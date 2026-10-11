import { defineConfig } from 'vite'
import type { RequestListener } from 'node:http'
import type { ApolloServer } from '@apollo/server'

export default defineConfig({
  appType: 'custom',
  publicDir: false,
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  build: {
    ssr: 'src/server.ts',
    target: 'node24',
  },
  plugins: [{
    name: 'graphql-api',
    configureServer(server) {
      let activeApollo: ApolloServer | undefined
      server.httpServer?.once('close', () => { void activeApollo?.stop() })
      server.middlewares.use(async (request, response, next) => {
        try {
          const app = await server.ssrLoadModule('/src/app.ts') as {
            handler: RequestListener
            apollo: ApolloServer
          }
          if (activeApollo !== app.apollo) {
            const previousApollo = activeApollo
            activeApollo = app.apollo
            await previousApollo?.stop()
          }
          await app.handler(request, response)
        } catch (error) {
          next(error)
        }
      })
    },
  }],
})
