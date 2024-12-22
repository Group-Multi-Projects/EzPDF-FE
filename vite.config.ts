import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

// Load biến môi trường từ tệp .env
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5000,
  },
  optimizeDeps: {
    include: ['fabric'], // Đảm bảo Vite pre-bundles gói `fabric`
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Tách các thư viện lớn vào các chunk riêng biệt
          if (id.includes('node_modules')) {
            return 'vendor'; // Các thư viện từ node_modules sẽ được tách vào chunk vendor
          }
        }
      }
    }
  }
})
