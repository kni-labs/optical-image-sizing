import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';
import react from '@vitejs/plugin-react';

const copyTypesPlugin = (): Plugin => ({
  name: 'copy-types',
  generateBundle(): void {
    const typeFiles = globSync('**/*.d.ts', {
      cwd: 'src',
    });

    typeFiles.forEach((file: string) => {
      const source = path.resolve('src', file);
      const content = fs.readFileSync(source);

      this.emitFile({
        type: 'asset',
        fileName: file,
        source: content,
      });
    });
  },
});

const config = defineConfig({
  build: {
    emptyOutDir: true,
    outDir: '../dist',
    rollupOptions: {
      input: Object.fromEntries(
        globSync('**/*.{html,ts,tsx}', {
          cwd: 'src',
          ignore: ['**/*.d.ts'],
        }).map((file: string) => [
          file.replace(/\.(html|ts|tsx)$/, ''),
          path.resolve('src', file),
        ]),
      ),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [react(), copyTypesPlugin()],
  root: 'src',
});

export default config;
