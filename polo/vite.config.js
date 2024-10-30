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
  base: './',  // Asegúrate de tener esto configurado para rutas relativas
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),  // Apunta al archivo index.html en la raíz
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
