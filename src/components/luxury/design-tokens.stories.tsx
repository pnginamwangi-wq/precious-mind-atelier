import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";

import { LuxButton } from "./button";

type TokenArgs = {
  gold: string;
  goldSoft: string;
  champagne: string;
  ivory: string;
  obsidian: string;
  charcoal: string;
  displayFont: string;
  bodyFont: string;
  displayScale: number;
  bodySize: number;
  trackingDisplay: number;
  trackingEyebrow: number;
  radius: number;
  goldGlow: number;
};

function hexToOklchString(hex: string): string {
  // Convert #rrggbb to an oklch() approximation for the token slot.
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  // Rough sRGB -> luminance for L, keep chroma/hue empty (browsers accept oklch from rgb via color-mix fallback).
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const l = Math.pow(lum, 1 / 2.2).toFixed(3);
  return `oklch(${l} 0 0 / 1)`;
}

// Simpler: just pass the hex through as a color value, browsers accept it wherever oklch() would go.
function toColor(hex: string): string {
  return hex;
}

function TokenPlayground(args: TokenArgs) {
  const style = useMemo(
    () =>
      ({
        "--gold": toColor(args.gold),
        "--gold-soft": toColor(args.goldSoft),
        "--champagne": toColor(args.champagne),
        "--ivory": toColor(args.ivory),
        "--obsidian": toColor(args.obsidian),
        "--charcoal": toColor(args.charcoal),
        "--primary": toColor(args.gold),
        "--accent": toColor(args.champagne),
        "--background": toColor(args.obsidian),
        "--card": toColor(args.charcoal),
        "--foreground": toColor(args.ivory),
        "--radius": `${args.radius}rem`,
        fontFamily: args.bodyFont,
        fontSize: `${args.bodySize}px`,
        color: toColor(args.ivory),
        background: toColor(args.obsidian),
      }) as React.CSSProperties,
    [args],
  );

  const displayStyle: React.CSSProperties = {
    fontFamily: args.displayFont,
    letterSpacing: `${args.trackingDisplay}em`,
  };
  const eyebrowStyle: React.CSSProperties = {
    letterSpacing: `${args.trackingEyebrow}em`,
    color: toColor(args.gold),
  };
  const glow = `0 20px 60px -20px color-mix(in oklab, ${args.gold} ${args.goldGlow}%, transparent)`;

  const scale = args.displayScale;
  const sizes = {
    h1: `${scale * 4.5}rem`,
    h2: `${scale * 3}rem`,
    h3: `${scale * 2}rem`,
  };

  return (
    <div style={style} className="min-h-[80vh] w-full p-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <div className="text-[11px] font-medium uppercase" style={eyebrowStyle}>
            Design tokens, live
          </div>
          <h1 className="mt-6 font-normal leading-[0.95]" style={{ ...displayStyle, fontSize: sizes.h1 }}>
            The Precious Intelligence Academy.
          </h1>
          <p className="mt-8 max-w-2xl opacity-80">
            Tweak any token in the Controls panel. Colors, typography, tracking, radius, and gold glow update
            instantly across the preview: headings, body copy, cards, and buttons.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(
            [
              ["Gold", args.gold],
              ["Gold soft", args.goldSoft],
              ["Champagne", args.champagne],
              ["Ivory", args.ivory],
              ["Charcoal", args.charcoal],
              ["Obsidian", args.obsidian],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="flex items-center gap-4 border p-4"
              style={{ borderColor: "color-mix(in oklab, currentColor 15%, transparent)", borderRadius: `${args.radius}rem` }}
            >
              <div className="h-12 w-12" style={{ background: value, borderRadius: `${args.radius}rem` }} />
              <div>
                <div className="text-xs uppercase tracking-[0.28em] opacity-70">{label}</div>
                <div className="font-mono text-sm">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="border p-10"
          style={{
            background: toColor(args.charcoal),
            borderColor: "color-mix(in oklab, currentColor 12%, transparent)",
            borderRadius: `${args.radius}rem`,
            boxShadow: glow,
          }}
        >
          <div className="text-[11px] uppercase" style={eyebrowStyle}>
            Chapter 01
          </div>
          <h2 className="mt-4 font-normal" style={{ ...displayStyle, fontSize: sizes.h2 }}>
            Precious Metals.
          </h2>
          <h3 className="mt-6 font-normal opacity-90" style={{ ...displayStyle, fontSize: sizes.h3 }}>
            Gold. Silver. Platinum.
          </h3>
          <p className="mt-6 max-w-xl opacity-75">
            From molten pour to hallmarked bar, understand the noble metals that have anchored civilisation,
            currency, and craft for four thousand years.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LuxButton>Enrol in this Institute</LuxButton>
            <LuxButton variant="outline">View curriculum</LuxButton>
            <LuxButton variant="ghost">All eight Institutes</LuxButton>
          </div>
        </div>

        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase" style={eyebrowStyle}>Display font</div>
            <div className="mt-2 font-mono opacity-80">{args.displayFont}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase" style={eyebrowStyle}>Body font</div>
            <div className="mt-2 font-mono opacity-80">{args.bodyFont}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof TokenPlayground> = {
  title: "Design System/Token Playground",
  component: TokenPlayground,
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  argTypes: {
    gold: { control: { type: "color" }, description: "Primary gold accent" },
    goldSoft: { control: { type: "color" } },
    champagne: { control: { type: "color" } },
    ivory: { control: { type: "color" } },
    obsidian: { control: { type: "color" } },
    charcoal: { control: { type: "color" } },
    displayFont: {
      control: { type: "select" },
      options: [
        '"Cormorant Garamond", serif',
        '"Playfair Display", serif',
        '"DM Serif Display", serif',
        '"Fraunces", serif',
        '"Canela", serif',
      ],
    },
    bodyFont: {
      control: { type: "select" },
      options: [
        '"Inter", sans-serif',
        '"Space Grotesk", sans-serif',
        '"IBM Plex Sans", sans-serif',
        '"Söhne", sans-serif',
        'ui-sans-serif, system-ui',
      ],
    },
    displayScale: { control: { type: "range", min: 0.6, max: 1.6, step: 0.05 } },
    bodySize: { control: { type: "range", min: 12, max: 22, step: 1 } },
    trackingDisplay: { control: { type: "range", min: -0.04, max: 0.05, step: 0.005 } },
    trackingEyebrow: { control: { type: "range", min: 0.1, max: 0.5, step: 0.01 } },
    radius: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    goldGlow: { control: { type: "range", min: 0, max: 100, step: 5 } },
  },
  args: {
    gold: "#d4b26a",
    goldSoft: "#c19d54",
    champagne: "#e8d7ae",
    ivory: "#f5f2eb",
    obsidian: "#0a0a0b",
    charcoal: "#141416",
    displayFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    displayScale: 1,
    bodySize: 16,
    trackingDisplay: -0.01,
    trackingEyebrow: 0.28,
    radius: 0.25,
    goldGlow: 30,
  },
};

export default meta;
type Story = StoryObj<typeof TokenPlayground>;

export const Playground: Story = {};

export const HighContrast: Story = {
  args: {
    gold: "#ffcc33",
    champagne: "#fff1c1",
    ivory: "#ffffff",
    obsidian: "#000000",
    charcoal: "#101010",
    goldGlow: 60,
  },
};

export const WarmEditorial: Story = {
  args: {
    gold: "#c48a3a",
    goldSoft: "#a56f2b",
    champagne: "#e6c893",
    ivory: "#f2ead6",
    obsidian: "#1b120a",
    charcoal: "#2a1c10",
    displayFont: '"Fraunces", serif',
    displayScale: 1.15,
    trackingDisplay: -0.02,
  },
};
