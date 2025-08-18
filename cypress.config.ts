import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',  
    specPattern: 'apps/client/cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'apps/client/cypress/support/e2e.ts', 
    screenshotOnRunFailure: true
  }
});