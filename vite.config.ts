import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    // Copy _redirects to dist
    copyPublicDir: true
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/appdates.json': {
        target: 'https://xiaodouli.openclouds.dpdns.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/appdates\.json$/, '/updates/appdates.json')
      }
    }
  },
  // Proxy API during development
  publicDir: 'public'
})
