import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Luxury/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "secondary", "destructive", "outline"] },
    children: { control: "text" },
  },
  args: { children: "Enrolling", variant: "default" },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Cohort 2026" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Closed" } };
export const Outline: Story = { args: { variant: "outline", children: "New chapter" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Enrolling</Badge>
      <Badge variant="secondary">Cohort 2026</Badge>
      <Badge variant="outline">New chapter</Badge>
      <Badge variant="destructive">Closed</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="px-2 py-0 text-[10px] tracking-[0.24em] uppercase">Small</Badge>
      <Badge>Medium</Badge>
      <Badge className="px-3 py-1 text-sm">Large</Badge>
    </div>
  ),
};
