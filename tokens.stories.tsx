import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container, Eyebrow, Hairline, GoldMark } from "./tokens";

const meta: Meta = {
  title: "Luxury/Tokens",
};
export default meta;

type Story = StoryObj;

const swatches: { name: string; className: string; hint: string }[] = [
  { name: "Obsidian", className: "bg-obsidian border border-white/10", hint: "Background" },
  { name: "Charcoal", className: "bg-charcoal", hint: "Elevated surfaces" },
  { name: "Gold", className: "bg-gold", hint: "Primary accent" },
  { name: "Gold Soft", className: "bg-gold-soft", hint: "Secondary accent" },
  { name: "Champagne", className: "bg-champagne", hint: "Warm highlight" },
  { name: "Ivory", className: "bg-ivory", hint: "Foreground" },
  { name: "Platinum", className: "bg-platinum", hint: "Muted foreground" },
];

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {swatches.map((s) => (
        <div key={s.name} className="flex flex-col gap-3">
          <div className={`h-28 w-full ${s.className}`} />
          <div>
            <div className="font-display text-lg text-ivory">{s.name}</div>
            <Eyebrow muted>{s.hint}</Eyebrow>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Eyebrow>Display, Cormorant Garamond</Eyebrow>
        <h1 className="mt-3 font-display text-7xl leading-none text-ivory">
          Master the Extraordinary
        </h1>
        <h2 className="mt-4 font-display text-5xl text-ivory">Precious Intelligence</h2>
        <h3 className="mt-4 font-display text-3xl text-ivory">Editorial subhead</h3>
      </div>
      <div>
        <Eyebrow>Sans, Inter</Eyebrow>
        <p className="mt-3 max-w-xl text-[15px] font-light leading-relaxed text-platinum/70">
          A cinematic academy for the connoisseurs of precious things. Studied,
          collected, and understood with rigor.
        </p>
      </div>
      <div>
        <Eyebrow>Numeric / Eyebrow</Eyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-6">
          <Eyebrow>01. Chapter One</Eyebrow>
          <Eyebrow muted>02. Muted variant</Eyebrow>
          <span className="font-numeric text-sm tracking-[0.28em] text-platinum/60">
            MMXXVI
          </span>
        </div>
      </div>
    </div>
  ),
};

export const EyebrowStory: Story = {
  name: "Eyebrow",
  render: () => (
    <div className="flex flex-col gap-3">
      <Eyebrow>Featured programme</Eyebrow>
      <Eyebrow muted>Est. MMXXVI</Eyebrow>
    </div>
  ),
};

export const HairlineStory: Story = {
  name: "Hairline",
  render: () => (
    <div className="w-full max-w-xl">
      <Hairline />
    </div>
  ),
};

export const GoldMarkStory: Story = {
  name: "GoldMark",
  render: () => (
    <div className="flex items-center gap-4">
      <GoldMark />
      <span className="font-display text-2xl text-ivory">The Precious Intelligence Academy</span>
    </div>
  ),
};

export const ContainerStory: Story = {
  name: "Container",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="py-16">
      <Container>
        <div className="border border-gold/30 p-8">
          <Eyebrow>Container, default</Eyebrow>
          <p className="mt-4 text-platinum/70">max-w-[1400px], responsive padding.</p>
        </div>
      </Container>
      <Container narrow className="mt-10">
        <div className="border border-gold/30 p-8">
          <Eyebrow>Container, narrow</Eyebrow>
          <p className="mt-4 text-platinum/70">max-w-[1100px] for editorial text.</p>
        </div>
      </Container>
    </div>
  ),
};
