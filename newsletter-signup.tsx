import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LuxButton, Eyebrow, luxury } from "@/components/luxury";
import { cn } from "@/lib/utils";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5)
  .max(254)
  .email();

/**
 * Small, editorial newsletter signup form. Writes directly to the
 * newsletter_subscribers table via the anon-INSERT RLS policy.
 * Duplicate emails are treated as success (no-op) to avoid leaking
 * whether an address is already subscribed.
 */
export function NewsletterSignup({
  source = "journal",
  variant = "block",
  eyebrow = "The Journal, weekly",
  headline = "Read the Academy each Sunday",
  note = "A single dispatch a week from the Academy Desk. Craft, provenance, history, and the small disciplines that separate a professional from a beginner. No advertising.",
}: {
  source?: string;
  variant?: "block" | "footer";
  eyebrow?: string;
  headline?: string;
  note?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data, source });
    if (error && !/duplicate|unique/i.test(error.message)) {
      setStatus("error");
      setMessage("We could not save your subscription. Please try again.");
      return;
    }
    setStatus("ok");
    setEmail("");
  }

  const isFooter = variant === "footer";
  return (
    <div
      className={cn(
        "relative",
        !isFooter && "border border-white/10 bg-charcoal/40 p-8 md:p-10",
      )}
    >
      {!isFooter ? (
        <>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="mt-4 font-display text-3xl leading-tight text-ivory md:text-4xl">
            {headline}
          </h3>
          <p className={cn("mt-4 max-w-xl", luxury.bodyMuted)}>{note}</p>
        </>
      ) : (
        <Eyebrow>{eyebrow}</Eyebrow>
      )}

      {status === "ok" ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "mt-6 border-l-2 border-gold/60 bg-obsidian/60 px-5 py-4",
            luxury.bodySmall,
          )}
        >
          Thank you. You are on the list. The next Sunday dispatch will land in your inbox.
        </div>
      ) : (
        <form onSubmit={onSubmit} className={cn("mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch")}>
          <label htmlFor={`nl-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`nl-${source}`}
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@address.com"
            className="min-w-0 flex-1 border border-white/15 bg-transparent px-4 py-3 font-normal text-ivory placeholder:text-platinum/70 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
          />
          <LuxButton type="submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Subscribing
              </>
            ) : (
              "Subscribe"
            )}
          </LuxButton>
        </form>
      )}

      {status === "error" && message ? (
        <p role="alert" className="mt-3 text-[12px] font-light tracking-wide text-red-300">
          {message}
        </p>
      ) : null}
    </div>
  );
}
