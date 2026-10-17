import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 项目站部署在 /cyber-escape-game/ 子路径下
export default defineConfig({
  base: '/cyber-escape-game/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false
  }
});
