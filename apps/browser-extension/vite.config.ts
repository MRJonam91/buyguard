import { fileURLToPath } from "node:url";
import { crx } from "@crxjs/vite-plugin";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import manifest from "./manifest.config";

export default defineConfig({
  plugins: [preact(), crx({ manifest })],
  resolve: {
    alias: {
      // Resolve the workspace package to its source explicitly. pnpm links it
      // through a symlink, and symlink resolution is the thing that breaks
      // first on synced or non-POSIX filesystems.
      "@buyguard/core": fileURLToPath(new URL("../../packages/core/src/index.ts", import.meta.url)),
    },
  },
});
