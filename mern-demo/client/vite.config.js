import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['.onrender.com', 'all'] // Cho phép tất cả domain .onrender.com
  },
  preview: {
    host: true,
    allowedHosts: ['.onrender.com', 'all'] // Áp dụng cả khi chạy vite preview
  }
})