import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Select> = {
  title: "Luxury/Select",
  component: Select,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Select>;

const INSTITUTES = [
  "Precious Metals",
  "Bullion",
  "Numismatics",
  "Gemstones",
  "Jewellery",
  "Horology",
  "Luxury Retail",
  "Artificial Intelligence",
];

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Choose an Institute" />
      </SelectTrigger>
      <SelectContent>
        {INSTITUTES.map((i) => (
          <SelectItem key={i} value={i}>{i}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label className="text-[11px] uppercase tracking-[0.28em] text-champagne">Institute</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select one" />
        </SelectTrigger>
        <SelectContent>
          {INSTITUTES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <Select>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          {INSTITUTES.slice(0, 3).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Medium (default)" />
        </SelectTrigger>
        <SelectContent>
          {INSTITUTES.slice(0, 3).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-12 text-base">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          {INSTITUTES.slice(0, 3).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Enrolment closed" />
      </SelectTrigger>
      <SelectContent />
    </Select>
  ),
};
