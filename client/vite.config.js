// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindVitePlugin from '@tailwindcss/vite'; // Import plugin Vite của Tailwind

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Nếu bạn đang dùng @tailwindcss/vite, hãy thêm nó vào đây
    // Lưu ý: Thông thường chỉ cần plugin PostCSS trong postcss.config.js là đủ.
    // Nếu gặp lỗi, bạn có thể thử bỏ qua dòng này.
    // tailwindVitePlugin(), 
  ],
  // Thiết lập proxy cho backend (đã có trong package.json, nhưng đôi khi cần ở đây)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3636',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Có thể cần hoặc không
      }
    }
  }
});