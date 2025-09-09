import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-operations-command-center/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
