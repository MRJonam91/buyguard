import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Tests deliberately do NOT load vite.config.ts: the crx plugin rewrites the
 * manifest and entry points, which has no place in a unit test run.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@buyguard/core": fileURLToPath(new URL("../../packages/core/src/index.ts", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
  },
});
