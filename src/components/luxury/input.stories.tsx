import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Input> = {
  title: "Luxury/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "inline-radio", options: ["text", "email", "password", "search", "number"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { placeholder: "Your name", type: "text" },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Email: Story = { args: { type: "email", placeholder: "you@precious.academy" } };
export const Password: Story = { args: { type: "password", placeholder: "••••••••" } };
export const Disabled: Story = { args: { disabled: true, placeholder: "Unavailable" } };

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-80 space-y-2">
      <Label className="text-[11px] uppercase tracking-[0.28em] text-champagne">Full name</Label>
      <Input {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-96 flex-col gap-4">
      <Input {...args} className="h-8 text-xs" placeholder="Small" />
      <Input {...args} placeholder="Medium (default)" />
      <Input {...args} className="h-12 text-base" placeholder="Large" />
    </div>
  ),
};
