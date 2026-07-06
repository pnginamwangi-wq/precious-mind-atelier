import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuxButton } from "./button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Dialog> = {
  title: "Luxury/Modal",
  component: Dialog,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <LuxButton>Request an invitation</LuxButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="text-[11px] uppercase tracking-[0.28em] text-gold">Enrolment</div>
          <DialogTitle className="font-display text-3xl font-normal">Request your invitation.</DialogTitle>
          <DialogDescription>
            A member of the Academy will reply within two working days.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-[0.28em] text-champagne">Full name</Label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-[0.28em] text-champagne">Email</Label>
            <Input type="email" placeholder="you@precious.academy" />
          </div>
        </div>
        <DialogFooter>
          <LuxButton variant="ghost">Cancel</LuxButton>
          <LuxButton>Send request</LuxButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Compact: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <LuxButton variant="outline">Confirm</LuxButton>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-normal">Confirm enrolment</DialogTitle>
          <DialogDescription>This will reserve your place in Cohort 2026.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LuxButton variant="ghost">Not yet</LuxButton>
          <LuxButton>Confirm</LuxButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Wide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <LuxButton variant="outline">Open wide modal</LuxButton>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-normal">The curriculum, at a glance.</DialogTitle>
          <DialogDescription>Six chapters, one obsession.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
          {["The Noble Metals", "Purity and Hallmarking", "Metallurgy", "Markets and Provenance"].map((c) => (
            <div key={c} className="border border-border/40 p-4">{c}</div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
};
