// Must stay .ts file for tests to work
/// <reference types='vitest/config' />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react({
          jsxRuntime: 'automatic'
      }),
  ],
  test: {
      coverage: {
        provider: 'v8',
      },
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.tsx',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      passWithNoTests: true,
  },
  build: {
      cssMinify: 'esbuild',
  },
});
