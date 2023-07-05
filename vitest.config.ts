/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov']
    }
  },
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
