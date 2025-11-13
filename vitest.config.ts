import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    coverage: {
      provider: 'v8',
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './components'),
      hooks: path.resolve(__dirname, './hooks'),
      layouts: path.resolve(__dirname, './layouts'),
      pages: path.resolve(__dirname, './pages'),
      shared: path.resolve(__dirname, './shared'),
      utils: path.resolve(__dirname, './utils')
    }
  }
});
