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

const config = defineConfig(() => {
  return {
    build: {
      emptyOutDir: true,
      outDir: path.resolve(__dirname, 'dist'),
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        input: {
          'react/index': path.resolve(__dirname, 'src/react/exports.ts'),
          ...Object.fromEntries(
            globSync('**/*.{ts,tsx}', {
              cwd: 'src',
              ignore: ['**/*.d.ts', 'react/exports.ts'],
            }).map((file: string) => [
              file.replace(/\.(ts|tsx)$/, ''),
              path.resolve('src', file),
            ]),
          ),
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
        preserveEntrySignatures: 'strict' as const,
        treeshake: {
          moduleSideEffects: false,
        },
      },
    },
    plugins: [react(), copyTypesPlugin()],
    root: path.resolve(__dirname, 'src'),
  };
});

export default config;
