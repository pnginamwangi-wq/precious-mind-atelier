import type { Meta, StoryObj } from "@storybook/react-vite";
import { LuxButton, ArrowLink } from "./button";
import { ArrowRight, Play } from "lucide-react";

const meta: Meta<typeof LuxButton> = {
  title: "Luxury/Button",
  component: LuxButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["gold", "outline", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: { children: "Enrol now", variant: "gold", size: "md" },
};
export default meta;

type Story = StoryObj<typeof LuxButton>;

export const Gold: Story = {};
export const Outline: Story = { args: { variant: "outline", children: "Explore programmes" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Learn more" } };

export const WithIcon: Story = {
  args: { icon: <ArrowRight className="h-3.5 w-3.5" />, children: "Begin the journey" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <LuxButton {...args} size="sm">Small</LuxButton>
      <LuxButton {...args} size="md">Medium</LuxButton>
      <LuxButton {...args} size="lg">Large</LuxButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <LuxButton variant="gold">Gold</LuxButton>
      <LuxButton variant="outline" icon={<Play className="h-3.5 w-3.5" />}>Outline</LuxButton>
      <LuxButton variant="ghost">Ghost</LuxButton>
      <LuxButton disabled>Disabled</LuxButton>
    </div>
  ),
};

export const AsArrowLink: StoryObj = {
  name: "ArrowLink",
  render: () => (
    <div className="flex flex-col gap-4">
      <ArrowLink href="#">View curriculum</ArrowLink>
      <ArrowLink href="#">Read the journal</ArrowLink>
    </div>
  ),
};
