import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Build as a single file for easy integration
    rollupOptions: {
      output: {
        // Generate a single JS file and a single CSS file
        entryFileNames: 'chat-widget.js',
        chunkFileNames: 'chat-widget.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'chat-widget.css'
          }
          return '[name].[ext]'
        }
      }
    },
    // Ensure CSS is extracted
    cssCodeSplit: false
  },
  server: {
    // Configure dev server for better integration
    cors: true,
    port: 5173
  }
})
