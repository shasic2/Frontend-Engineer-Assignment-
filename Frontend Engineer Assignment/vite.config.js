import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Ensures that `describe`, `it`, and `expect` are available globally.
    environment: 'jsdom', // Sets up a browser-like environment.
    setupFiles: ['./src/setupTests.ts'], // Runs this file before the tests.
    transformMode: {
      web: [/\.[jt]sx$/], // Transforms ES modules.
    }
  }
 
})
