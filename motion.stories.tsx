import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section, Reveal, SectionHeader } from "./motion";
import { Container, Eyebrow } from "./tokens";

const meta: Meta = {
  title: "Luxury/Motion",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const SectionWithHeader: Story = {
  render: () => (
    <Section bordered>
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Curriculum"
          title={<>Studied,<br />collected,<br />understood.</>}
          intro="Each institute offers a rigorous editorial curriculum shaped by masters of the field."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Reveal key={n} className="border border-white/10 p-8">
              <Eyebrow>Chapter 0{n}</Eyebrow>
              <h3 className="mt-4 font-display text-3xl text-ivory">Reveal item {n}</h3>
              <p className="mt-3 text-[14px] font-light text-platinum/70">
                Items animate in with a staggered fade and rise.
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  ),
};

export const CenteredHeader: Story = {
  render: () => (
    <Section tinted>
      <Container>
        <SectionHeader
          align="center"
          eyebrow="The Academy"
          title="Master the Extraordinary"
          intro="A cinematic school for the connoisseurs of precious things."
        />
      </Container>
    </Section>
  ),
};

export const RevealOnly: Story = {
  render: () => (
    <div className="p-16">
      <Reveal>
        <div className="border border-gold/40 p-10">
          <Eyebrow>Reveal</Eyebrow>
          <p className="mt-3 font-display text-3xl text-ivory">Fades up on mount.</p>
        </div>
      </Reveal>
    </div>
  ),
};
