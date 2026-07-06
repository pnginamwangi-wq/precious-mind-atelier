import type { Meta, StoryObj } from "@storybook/react-vite";
import { Aside, Caption, ChapterMark, Figure, PullQuote, Vignette } from "./editorial";
import { Container, Section } from "@/components/luxury";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroOpal from "@/assets/hero-opal.jpg";
import heroPearl from "@/assets/hero-pearl.jpg";

const meta: Meta = {
  title: "Luxury/Editorial",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const CaptionStory: Story = {
  name: "Caption",
  render: () => (
    <div className="p-16">
      <Caption
        index="01"
        title="Black Opal"
        origin="Lightning Ridge, Australia"
        note="A stone of shifting fire, prized for its play of colour against a dark host."
        href="#"
      />
    </div>
  ),
};

export const CaptionRight: Story = {
  name: "Caption, right aligned",
  render: () => (
    <div className="p-16">
      <Caption
        align="right"
        index="02"
        title="Round Brilliant"
        origin="D flawless, 3.02 ct"
        note="Fifty seven facets, cut to release the maximum return of light."
        href="#"
      />
    </div>
  ),
};

export const FigureStory: Story = {
  name: "Figure, aspects",
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-16 md:grid-cols-4">
      <Figure src={heroOpal} alt="Opal" aspect="square" caption="Square, N° 01" />
      <Figure src={heroDiamond} alt="Diamond" aspect="portrait" caption="Portrait, N° 02" />
      <Figure src={heroPearl} alt="Pearl" aspect="landscape" caption="Landscape, N° 03" />
      <Figure src={heroDiamond} alt="Diamond" aspect="wide" caption="Wide, N° 04" />
    </div>
  ),
};

export const VignetteStory: Story = {
  name: "Vignette",
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

export const PullQuoteStory: Story = {
  name: "PullQuote",
  render: () => (
    <Section>
      <Container narrow>
        <PullQuote
          quote={<>Rarity is not a price. It is a story told in the presence of time.</>}
          attribution="Elena Marchetti"
          role="Master gemmologist, Geneva"
        />
      </Container>
    </Section>
  ),
};

export const PullQuoteCentered: Story = {
  name: "PullQuote, centered",
  render: () => (
    <Section tinted>
      <Container narrow>
        <PullQuote
          align="center"
          quote={<>The metal knows the market long before the market knows itself.</>}
          attribution="Isaac Rehn"
          role="LBMA refiner"
        />
      </Container>
    </Section>
  ),
};

export const ChapterMarkStory: Story = {
  name: "ChapterMark",
  render: () => (
    <div className="space-y-8 p-16">
      <ChapterMark index="I" eyebrow="Provenance" />
      <ChapterMark index="II" eyebrow="Craft" title="A hand and a loupe." />
      <ChapterMark index="III" eyebrow="Market" />
    </div>
  ),
};

export const AsideStory: Story = {
  name: "Aside",
  render: () => (
    <div className="max-w-xl p-16">
      <Aside eyebrow="Glossary">
        <strong className="text-ivory">Doublet.</strong> A composite stone
        assembled from two layers, one precious, one host. Encountered in
        opals, garnets, and, historically, in jewellery of restrained means.
      </Aside>
    </div>
  ),
};

export const ComposedPage: Story = {
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
