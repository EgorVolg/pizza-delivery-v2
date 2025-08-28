module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  projects: [
    {
      displayName: 'client',
      testMatch: ['<rootDir>/apps/client/src/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/lib/test/setup.ts'],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/server/**/*.test.ts'],
    },
  ],
};