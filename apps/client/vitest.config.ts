// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/shared/lib/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      exclude: [
        "**/*.d.ts",
        "**/node_modules/**",
        "**/cypress/**",
        "**/dist/**", 
        "**/*.types.ts",
        "**/*.config.ts*",
        "**/*.config.js*",
      ],
      // reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
