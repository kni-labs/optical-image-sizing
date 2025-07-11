import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: '../dist',
    rollupOptions: {},
  },
  plugins: [react()],
  root: 'src',
});
