import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuxButton } from "./button";

const meta: Meta<typeof Sheet> = {
  title: "Luxury/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Sheet>;

const links = ["Institutes", "Curriculum", "Faculty", "Cohort 2026", "Journal", "Contact"];

const SheetDemo = ({ side }: { side: "top" | "right" | "bottom" | "left" }) => (
  <Sheet>
    <SheetTrigger asChild>
      <LuxButton variant="outline">Open from {side}</LuxButton>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <div className="text-[11px] uppercase tracking-[0.28em] text-gold">Menu</div>
        <SheetTitle className="font-display text-3xl font-normal">The Academy.</SheetTitle>
        <SheetDescription>Eight Institutes, one obsession with the precious.</SheetDescription>
      </SheetHeader>
      <nav className="mt-8 flex flex-col gap-4">
        {links.map((l) => (
          <a key={l} href="#" className="text-lg text-ivory/90 hover:text-gold transition-colors">{l}</a>
        ))}
      </nav>
      <SheetFooter className="mt-8">
        <LuxButton>Request an invitation</LuxButton>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export const Right: Story = { render: () => <SheetDemo side="right" /> };
export const Left: Story = { render: () => <SheetDemo side="left" /> };
export const Top: Story = { render: () => <SheetDemo side="top" /> };
export const Bottom: Story = { render: () => <SheetDemo side="bottom" /> };

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SheetDemo side="left" />
      <SheetDemo side="right" />
      <SheetDemo side="top" />
      <SheetDemo side="bottom" />
    </div>
  ),
};
