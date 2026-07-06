import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "obsidian",
      values: [
        { name: "obsidian", value: "#0a0a0b" },
        { name: "charcoal", value: "#141416" },
        { name: "ivory", value: "#f5f2eb" },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="bg-obsidian text-ivory min-h-[240px] w-full p-10 font-sans antialiased">
        <Story />
      </div>
    ),
  ],
};

export default preview;
