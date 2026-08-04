/// <reference types="vue" />
/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pkg from './package.json' with { type: 'json' }

const projectName = pkg.name.replace('@builtwithjavascript/', '').trim().toLowerCase()


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  envDir: './src/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src/')
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [
      'node_modules'
    ]
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      name: projectName,
      fileName: (format) => `${projectName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
