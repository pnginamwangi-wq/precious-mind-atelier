import type { Meta, StoryObj } from "@storybook/react-vite";
import { Aside, Caption, ChapterMark, Figure, PullQuote, Vignette } from "./editorial";
import { Container, Section } from "@/components/luxury";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroOpal from "@/assets/hero-opal.jpg";
import heroPearl from "@/assets/hero-pearl.jpg";

/**
 * Every story below exposes controls in the Storybook Controls panel so you
 * can tweak each prop live. Use the composed stories at the bottom for
 * layout tuning.
 */

const imageOptions = [heroOpal, heroDiamond, heroPearl];
const imageLabels: Record<string, string> = {
  [heroOpal]: "Black Opal",
  [heroDiamond]: "Round Brilliant",
  [heroPearl]: "South Sea Pearl",
};
const imageControl = {
  control: "select" as const,
  options: imageOptions,
  mapping: imageOptions.reduce<Record<string, string>>((acc, v) => ((acc[v] = v), acc), {}),
  labels: imageLabels,
};

const meta: Meta = {
  title: "Luxury/Editorial",
  parameters: { layout: "fullscreen" },
};
export default meta;

/* ------------------------------------------------------------------ */
/*  Caption                                                            */
/* ------------------------------------------------------------------ */

type CaptionArgs = {
  index?: string;
  title: string;
  origin?: string;
  note?: string;
  href?: string;
  cta?: string;
  align: "left" | "right";
};

export const CaptionStory: StoryObj<CaptionArgs> = {
  name: "Caption",
  argTypes: {
    index: { control: "text", description: "Numeric or roman label rendered as N° {index}." },
    title: { control: "text" },
    origin: { control: "text" },
    note: { control: "text" },
    href: { control: "text", description: "Omit to hide the arrow link." },
    cta: { control: "text" },
    align: { control: "inline-radio", options: ["left", "right"] },
  },
  args: {
    index: "01",
    title: "Black Opal",
    origin: "Lightning Ridge, Australia",
    note: "A stone of shifting fire, prized for its play of colour against a dark host.",
    href: "#",
    cta: "Study the object",
    align: "left",
  },
  render: (args) => (
    <div className="p-16">
      <Caption {...args} />
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/*  Figure                                                             */
/* ------------------------------------------------------------------ */

type FigureArgs = {
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "landscape" | "wide";
  caption?: string;
};

export const FigureStory: StoryObj<FigureArgs> = {
  name: "Figure",
  argTypes: {
    src: imageControl,
    alt: { control: "text" },
    aspect: { control: "inline-radio", options: ["square", "portrait", "landscape", "wide"] },
    caption: { control: "text" },
  },
  args: {
    src: heroOpal,
    alt: "Black opal",
    aspect: "square",
    caption: "N° 01, Black Opal",
  },
  render: (args) => (
    <div className="mx-auto max-w-xl p-16">
      <Figure {...args} />
    </div>
  ),
};

export const FigureAspects: StoryObj = {
  name: "Figure, all aspects",
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-16 md:grid-cols-4">
      <Figure src={heroOpal} alt="Opal" aspect="square" caption="Square, N° 01" />
      <Figure src={heroDiamond} alt="Diamond" aspect="portrait" caption="Portrait, N° 02" />
      <Figure src={heroPearl} alt="Pearl" aspect="landscape" caption="Landscape, N° 03" />
      <Figure src={heroDiamond} alt="Diamond" aspect="wide" caption="Wide, N° 04" />
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/*  Vignette                                                           */
/* ------------------------------------------------------------------ */

type VignetteArgs = {
  index?: string;
  image: string;
  alt: string;
  title: string;
  origin?: string;
  note?: string;
  href?: string;
  cta?: string;
  reverse: boolean;
  aspect: "square" | "portrait" | "landscape" | "wide";
};

export const VignetteStory: StoryObj<VignetteArgs> = {
  name: "Vignette",
  argTypes: {
    index: { control: "text" },
    image: imageControl,
    alt: { control: "text" },
    title: { control: "text" },
    origin: { control: "text" },
    note: { control: "text" },
    href: { control: "text" },
    cta: { control: "text" },
    reverse: { control: "boolean", description: "Flip image and caption columns." },
    aspect: { control: "inline-radio", options: ["square", "portrait", "landscape", "wide"] },
  },
  args: {
    index: "01",
    image: heroOpal,
    alt: "Black opal",
    title: "Black Opal",
    origin: "Lightning Ridge, Australia",
    note: "A stone of shifting fire, prized for its play of colour against a dark host.",
    href: "#",
    cta: "Study the object",
    reverse: false,
    aspect: "square",
  },
  render: (args) => (
    <Section>
      <Container>
        <Vignette {...args} />
      </Container>
    </Section>
  ),
};

export const VignetteAlternating: StoryObj = {
  name: "Vignette, alternating spread",
  render: () => (
    <Section>
      <Container>
        <div className="grid gap-16 md:gap-24">
          <Vignette
            index="01"
            image={heroOpal}
            alt="Black opal"
            title="Black Opal"
            origin="Lightning Ridge, Australia"
            note="A stone of shifting fire, prized for its play of colour against a dark host."
            href="#"
          />
          <Vignette
            reverse
            index="02"
            image={heroDiamond}
            alt="Round brilliant"
            title="Round Brilliant"
            origin="D flawless, 3.02 ct"
            note="Fifty seven facets, cut to release the maximum return of light."
            href="#"
          />
        </div>
      </Container>
    </Section>
  ),
};

/* ------------------------------------------------------------------ */
/*  PullQuote                                                          */
/* ------------------------------------------------------------------ */

type PullQuoteArgs = {
  quote: string;
  attribution?: string;
  role?: string;
  align: "left" | "center";
  tinted: boolean;
};

export const PullQuoteStory: StoryObj<PullQuoteArgs> = {
  name: "PullQuote",
  argTypes: {
    quote: { control: "text" },
    attribution: { control: "text" },
    role: { control: "text" },
    align: { control: "inline-radio", options: ["left", "center"] },
    tinted: { control: "boolean", description: "Render inside a tinted Section." },
  },
  args: {
    quote: "Rarity is not a price. It is a story told in the presence of time.",
    attribution: "Elena Marchetti",
    role: "Master gemmologist, Geneva",
    align: "left",
    tinted: false,
  },
  render: ({ tinted, ...args }) => (
    <Section tinted={tinted}>
      <Container narrow>
        <PullQuote {...args} />
      </Container>
    </Section>
  ),
};

/* ------------------------------------------------------------------ */
/*  ChapterMark                                                        */
/* ------------------------------------------------------------------ */

type ChapterMarkArgs = {
  index: string;
  eyebrow: string;
  title?: string;
};

export const ChapterMarkStory: StoryObj<ChapterMarkArgs> = {
  name: "ChapterMark",
  argTypes: {
    index: { control: "text" },
    eyebrow: { control: "text" },
    title: { control: "text", description: "Optional second line." },
  },
  args: {
    index: "II",
    eyebrow: "Craft",
    title: "A hand and a loupe.",
  },
  render: (args) => (
    <div className="p-16">
      <ChapterMark {...args} />
    </div>
  ),
};

export const ChapterMarkStack: StoryObj = {
  name: "ChapterMark, stack",
  render: () => (
    <div className="space-y-8 p-16">
      <ChapterMark index="I" eyebrow="Provenance" />
      <ChapterMark index="II" eyebrow="Craft" title="A hand and a loupe." />
      <ChapterMark index="III" eyebrow="Market" />
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/*  Aside                                                              */
/* ------------------------------------------------------------------ */

type AsideArgs = {
  eyebrow?: string;
  body: string;
};

export const AsideStory: StoryObj<AsideArgs> = {
  name: "Aside",
  argTypes: {
    eyebrow: { control: "text" },
    body: { control: "text" },
  },
  args: {
    eyebrow: "Glossary",
    body: "Doublet. A composite stone assembled from two layers, one precious, one host. Encountered in opals, garnets, and, historically, in jewellery of restrained means.",
  },
  render: ({ eyebrow, body }) => (
    <div className="max-w-xl p-16">
      <Aside eyebrow={eyebrow}>{body}</Aside>
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/*  Composed page                                                      */
/* ------------------------------------------------------------------ */

export const ComposedPage: StoryObj = {
  name: "Composed page",
  render: () => (
    <>
      <Section>
        <Container narrow>
          <ChapterMark index="I" eyebrow="Chapter One" title="An introduction to the vitrine." />
          <div className="mt-16">
            <PullQuote
              quote={<>Every object here is a document.</>}
              attribution="The Curator"
            />
          </div>
        </Container>
      </Section>
      <Section tinted bordered>
        <Container>
          <Vignette
            index="01"
            image={heroPearl}
            alt="South sea pearl"
            title="South Sea Pearl"
            origin="Pinctada maxima"
            note="Grown slowly in warm currents, the largest and most luminous of the cultured pearls."
            href="#"
          />
        </Container>
      </Section>
      <Section>
        <Container narrow>
          <Aside eyebrow="Note">
            All specimens studied at the Academy are documented, photographed,
            and catalogued for the permanent archive.
          </Aside>
        </Container>
      </Section>
    </>
  ),
};
