import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    testTimeout: 15000,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'junit.xml',
    },
  },
})
