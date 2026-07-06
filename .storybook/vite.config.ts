// Minimal Vite config for Storybook, so it does NOT load the project's
// TanStack Start / Nitro / Lovable plugins (which own the SSR entry graph
// and conflict with Storybook's iframe entry).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
});
