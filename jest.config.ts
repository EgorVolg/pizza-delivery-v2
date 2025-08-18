module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  projects: [
    {
      displayName: 'client',
      testMatch: ['<rootDir>/apps/client/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/shared/tests/setup.ts'],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/server/**/*.test.ts'],
    },
  ],
};