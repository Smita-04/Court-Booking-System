import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Render URL
const RENDER_API_URL = 'https://court-booking-system-qthg.onrender.com';

export default defineConfig({
  plugins: [react()],
  
  // CRITICAL FIX: This sets the environment variable during the build
  define: {
    'process.env.VITE_API_URL': JSON.stringify(RENDER_API_URL),
  },
  
  // Fallback for Vercel not finding files
  server: {
    proxy: {
      '/api': {
        target: RENDER_API_URL,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})