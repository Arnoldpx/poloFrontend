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
  base: './', // Base relativa para asegurar que las rutas de los recursos sean relativas en producción
  build: {
    outDir: 'dist', // Carpeta de salida para la build
    assetsDir: 'assets', // Carpeta dentro de dist para los recursos (CSS, JS, imágenes)
    manifest: true, // Genera un archivo manifest.json para la gestión de archivos en producción
    rollupOptions: {
      // Agrupa los recursos en carpetas dentro de `assets`
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
