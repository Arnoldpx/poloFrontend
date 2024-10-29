import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()],
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/material-kit-pro.scss";`
      }
    }
  },
  optimizeDeps: {
    include: ['jwt-decode']
  },
  server: {
    watch: {
      usePolling: true
    },
    hmr: {
      overlay: true
    }
  }
});
