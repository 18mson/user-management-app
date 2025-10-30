import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'html'], // show in console and generate HTML report
      include: ['src/**/*.{ts,tsx}'], // files to include in coverage
      exclude: ['src/main.tsx', 'src/**/*.test.tsx'], // exclude test files and entry points
    },
    setupFiles: './src/test/setup.ts',
  },
});