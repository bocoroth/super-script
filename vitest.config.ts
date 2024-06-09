/// <reference types="vitest" />

import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
import Vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig(
  mergeConfig(viteConfig, {
    // extending app vite config
    test: {
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/**.d.ts', '**/src/main.ts']
      }
    },
    plugins: [
      // Vue()
    ],
    resolve: {
      alias: {
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
)
