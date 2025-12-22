
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['components/**/*.{ts,tsx}', 'context/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}'],
      exclude: ['node_modules/', 'tests/', '.eslintrc.cjs', 'tailwind.config.js', 'postcss.config.js', 'components/ui/icons/**'],
    },
  },
});
