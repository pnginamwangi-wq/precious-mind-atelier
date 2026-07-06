import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig, type PluginOption } from "vite";

const BLOCKED_PLUGIN_PREFIXES = [
  "tanstack",
  "tsr:",
  "nitro",
  "lovable",
  "vite-plugin-lovable",
  "component-tagger",
];

function filterProjectPlugins(plugins: PluginOption[]): PluginOption[] {
  return plugins
    .map((p) => {
      if (Array.isArray(p)) return filterProjectPlugins(p);
      if (!p || typeof p !== "object") return p;
      const name = (p as { name?: string }).name ?? "";
      const blocked = BLOCKED_PLUGIN_PREFIXES.some((prefix) =>
        name.toLowerCase().includes(prefix),
      );
      return blocked ? null : p;
    })
    .filter(Boolean) as PluginOption[];
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  core: { disableTelemetry: true },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: filterProjectPlugins((config.plugins ?? []) as PluginOption[]),
    });
  },
};

export default config;
