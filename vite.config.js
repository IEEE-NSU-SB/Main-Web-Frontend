import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // eslint-disable-next-line no-undef
  plugins: [react(), tailwindcss()], 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
