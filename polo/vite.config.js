import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// Exporta la configuración de Vite
export default defineConfig({
  // Define las resoluciones de alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para la carpeta src
    },
  },
  // Plugins utilizados en la configuración
  plugins: [react()],
  css: {
    // Configura los mapas de origen para el desarrollo
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        // Importa automáticamente el archivo SCSS principal
        additionalData: `@import "@/assets/scss/material-kit-pro.scss";`,
      },
    },
  },
  optimizeDeps: {
    include: ['jwt-decode'], // Dependencias optimizadas
  },
  server: {
    watch: {
      usePolling: true, // Usar polling para la vigilancia de cambios
    },
    hmr: {
      overlay: true, // Muestra el overlay en caso de errores de HMR
    },
  },
  base: './', // para rutas relativas en producción
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'assets/main.js', // Nombre fijo sin hash
        chunkFileNames: 'assets/[name].js', // Nombres sin hash
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
