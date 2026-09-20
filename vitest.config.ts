import { defineConfig } from "vitest/config";

/**
 * Projects are listed explicitly rather than globbed: `packages/*` and `apps/*`
 * also contain placeholder directories holding only a README, and a glob would
 * make the test run depend on which of them happen to be empty today.
 *
 * Elencati esplicitamente invece che con una glob: `packages/*` e `apps/*`
 * contengono anche cartelle segnaposto con il solo README.
 */
export default defineConfig({
  test: {
    projects: ["packages/core", "apps/browser-extension"],
  },
});
