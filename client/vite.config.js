import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // FIX: Must import the 'path' module
// import tailwindVitePlugin from '@tailwindcss/vite'; // Removed unnecessary import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindVitePlugin is usually not needed here if PostCSS is configured
  ],
  resolve: {
    alias: {
      // FIX: The path.resolve now works because 'path' is imported
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Proxy configuration for backend API (kept for reference)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3636',
        changeOrigin: true,
      }
    }
  }
});