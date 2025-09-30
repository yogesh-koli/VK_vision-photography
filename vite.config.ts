import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use BASE_PATH (set by CI) or default to '/'
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
})

