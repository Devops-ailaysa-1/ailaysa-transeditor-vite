import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: '3001'
  },
  build: {
    outDir: "build"
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  resolve: {
    alias: {
      jQuery: 'jquery',
    },
  },
})
