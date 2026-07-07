import { useId, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Eyebrow, Hairline, LuxButton } from "@/components/luxury";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  background: z
    .string()
    .trim()
    .max(400, "Keep this under 400 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Keep this under 2000 characters")
    .optional()
    .or(z.literal("")),
});

type InquiryFormProps = {
  instituteSlug: string;
  instituteName: string;
  className?: string;
};

export function InquiryForm({ instituteSlug, instituteName, className }: InquiryFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [background, setBackground] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, background, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setBusy(true);
    const { error } = await supabase.from("institute_inquiries").insert({
      institute_slug: instituteSlug,
      institute_name: instituteName,
      name: parsed.data.name,
      email: parsed.data.email,
      background: parsed.data.background || null,
      message: parsed.data.message || null,
      user_id: user?.id ?? null,
    });
    setBusy(false);

    if (error) {
      toast.error("We could not send your inquiry", { description: error.message });
      return;
    }

    setSubmitted(true);
    toast.success("Your inquiry has been received");
    setName("");
    setBackground("");
    setMessage("");
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "border border-gold/30 bg-black/30 p-10 text-center backdrop-blur-sm",
          className,
        )}
      >
        <Eyebrow>Received with care</Eyebrow>
        <h3 className="mt-4 font-display text-3xl text-ivory">Thank you.</h3>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-platinum/70">
          A member of the {instituteName} admissions circle will write to you within
          three working days. In the meantime, wander the other seven Institutes.
        </p>
        <Hairline className="my-8" />
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "border border-white/10 bg-black/30 p-8 backdrop-blur-sm sm:p-10",
        className,
      )}
    >
      <Eyebrow>Request an invitation</Eyebrow>
      <h3 className="mt-4 font-display text-3xl leading-tight text-ivory sm:text-4xl">
        Begin a conversation with {instituteName}.
      </h3>
      <p className="mt-4 text-[14px] font-light leading-relaxed text-platinum/60">
        Admissions are considered on merit and intention. Share a little about yourself,
        and the Institute will reach out with next steps.
      </p>

      <Hairline className="my-8" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={120}
            className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
          />
        </Field>
        <Field label="Email">
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            maxLength={255}
            className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Your background" hint="A line or two, up to 400 characters.">
          <Input
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Gemmologist, luxury retail strategist, aspiring apprentice."
            maxLength={400}
            className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Why this Institute?"
          hint="Optional. Tell us what draws you to this discipline."
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            maxLength={2000}
            className="rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] uppercase tracking-[0.28em] text-platinum/40">
          Handled in confidence
        </p>
        <LuxButton
          type="submit"
          disabled={busy}
          icon={busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
        >
          {busy ? "Sending" : "Send inquiry"}
        </LuxButton>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (fieldId: string) => React.ReactNode;
}) {
  const fieldId = useId();
  const hintId = hint ? `${fieldId}-hint` : undefined;
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId} className="text-[10px] uppercase tracking-[0.28em] text-platinum/80">
        {label}
      </Label>
      {children(fieldId)}
      {hint ? (
        <p id={hintId} className="text-xs text-platinum/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
