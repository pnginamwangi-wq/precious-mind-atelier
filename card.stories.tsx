import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuxButton } from "./button";

const meta: Meta<typeof Card> = {
  title: "Luxury/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="text-[11px] uppercase tracking-[0.28em] text-gold">Chapter 01</div>
        <CardTitle className="font-display text-3xl font-normal">Precious Metals.</CardTitle>
        <CardDescription>Gold. Silver. Platinum.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          From molten pour to hallmarked bar, understand the noble metals that have anchored civilisation.
        </p>
      </CardContent>
      <CardFooter>
        <LuxButton variant="outline">Enter the chapter</LuxButton>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card className="w-96 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_30%,transparent)]">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-normal">Institute of Horology</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        A quiet obsession with time, movement, and the miniature architectures of mechanical calibres.
      </CardContent>
    </Card>
  ),
};

export const Compact: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Cohort 2026</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Applications close in March.</CardContent>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      {["Precious Metals", "Numismatics", "Horology"].map((title) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle className="font-display text-xl font-normal">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A chapter of the Academy.
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
