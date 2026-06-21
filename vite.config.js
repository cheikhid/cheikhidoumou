import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` reste '/' ; à adapter en '/<repo>/' si déploiement sur GitHub Pages (project site).
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
  },
})
