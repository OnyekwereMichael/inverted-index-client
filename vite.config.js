import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      source: "/api/:path*",  // Matches any request starting with /api/
      destination: "http://localhost:5000/api/:path*", // Forwards to backend
    },
  ],
})
