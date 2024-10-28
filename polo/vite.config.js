import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        // Puedes incluir variables globales aquí
        additionalData: `@import "/src/assets/scss/material-kit-pro.scss";`
      },
    },
  },
  optimizeDeps: {
    include: ['jwt-decode']  // Asegúrate de incluir jwt-decode aquí
  },
  server: {
    watch: {
      // Configuración para hacer que Vite detecte automáticamente cambios
      usePolling: true, // Útil si estás usando un entorno como Docker o WSL
    },
    hmr: {
      // Reemplazo en caliente de módulos
      overlay: true, // Muestra un overlay en el navegador para errores de HMR
    }
  }
});
