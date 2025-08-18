import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshot: false
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    specPattern: 'src/**/*.cy.{ts,tsx}'
  }
});