import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'mern-frontend-235148.onrender.com' // Tên miền ứng dụng Frontend trên Render[cite: 15]
    ]
  }
})