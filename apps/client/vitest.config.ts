import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/lib/test/setup.ts'], // RTL + jest-dom матчеры
    css: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: [
        '**/*.d.ts',
        '**/*.stories.{ts,tsx}',
        '**/node_modules/**',
        '**/cypress/**',
        '**/dist/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});