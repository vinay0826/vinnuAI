import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host:'0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8787', // Default Cloudflare Workers dev port
        changeOrigin: true,
      },
    },
  },
});