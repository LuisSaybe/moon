import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  css: {
    modules: {
      // The hash includes the file path, so identical class names stay scoped.
      generateScopedName: '[name]__[local]__[hash:base64:8]',
    },
  },
  server: {
    host: true,
    port: 80,
    strictPort: true,
  },
})
