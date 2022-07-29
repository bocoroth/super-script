import { defineConfig } from 'vitest/config'

// @ts-ignore
import path from 'path'

export default defineConfig({
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: ['es2021', 'chrome100', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-dark': path.resolve(__dirname, 'node_modules/bootstrap-dark'),
      '~material-icons': path.resolve(__dirname, 'node_modules/material-icons'),
      '~tinymce': path.resolve(__dirname, 'node_modules/tinymce')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
