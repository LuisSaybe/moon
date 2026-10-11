import { defineConfig } from 'vite'
import type { RequestListener } from 'node:http'

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
      server.middlewares.use(async (request, response, next) => {
        try {
          const app = await server.ssrLoadModule('/src/app.ts') as { handler: RequestListener }
          await app.handler(request, response)
        } catch (error) {
          next(error)
        }
      })
    },
  }],
})
