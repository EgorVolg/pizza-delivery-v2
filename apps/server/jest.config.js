exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,js}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
