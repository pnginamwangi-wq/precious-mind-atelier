import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { Container, Eyebrow, GoldMark, Hairline, LuxButton, luxury } from "@/components/luxury";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in, The Precious Intelligence Academy" },
      {
        name: "description",
        content: "Sign in to the Academy to resume your studies.",
      },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z.string().min(8, "At least 8 characters").max(72);
const nameSchema = z.string().trim().min(1, "Enter your name").max(80);

type Mode = "signin" | "signup";

function AuthPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: "/profile", replace: true });
    }
  }, [loading, session, navigate]);

  return (
    <main className="relative min-h-screen bg-obsidian text-ivory">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)]" />
      <Container className="relative flex min-h-screen flex-col items-center justify-center py-24">
        <Link
          to="/"
          aria-label="Return home"
          className="mb-10 flex items-center gap-3 outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <GoldMark />
          <span className="font-display text-[15px] tracking-wide text-ivory">
            The Precious Intelligence Academy
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: luxury.ease }}
          className="w-full max-w-md border border-white/10 bg-black/30 p-8 backdrop-blur-xl sm:p-10"
        >
          <div className="text-center">
            <Eyebrow>{mode === "signin" ? "Welcome back" : "Join the Academy"}</Eyebrow>
            <h1 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              {mode === "signin" ? "Sign in" : "Create your account"}
            </h1>
            <p className="mt-3 text-sm text-platinum/70">
              {mode === "signin"
                ? "Return to your studies."
                : "A small community of professionals, studying the disciplines of luxury."}
            </p>
          </div>

          <Hairline className="my-8" />

          <SocialButtons />

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-platinum/50">
              or with email
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {mode === "signin" ? (
            <SignInForm onSuccess={() => router.invalidate()} />
          ) : (
            <SignUpForm onSuccess={() => setMode("signin")} />
          )}

          <p className="mt-8 text-center text-xs text-platinum/60">
            {mode === "signin" ? "New to the Academy?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-gold underline-offset-4 hover:underline focus-visible:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </Container>
    </main>
  );
}

function SocialButtons() {
  const [busy, setBusy] = useState<string | null>(null);

  const signIn = async (provider: "google" | "apple") => {
    setBusy(provider);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result?.error) {
      toast.error(`Could not sign in with ${provider}`, {
        description: result.error.message,
      });
      setBusy(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => signIn("google")}
        className={cn(
          "flex h-11 items-center justify-center gap-2 border border-white/15 bg-white/[0.02] text-[12px] uppercase tracking-[0.24em] text-ivory transition-colors",
          "hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-60",
        )}
      >
        {busy === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
        Google
      </button>
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => signIn("apple")}
        className={cn(
          "flex h-11 items-center justify-center gap-2 border border-white/15 bg-white/[0.02] text-[12px] uppercase tracking-[0.24em] text-ivory transition-colors",
          "hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-60",
        )}
      >
        {busy === "apple" ? <Loader2 className="h-4 w-4 animate-spin" /> : <AppleIcon />}
        Apple
      </button>
    </div>
  );
}

function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedEmail = emailSchema.safeParse(email);
    const parsedPassword = passwordSchema.safeParse(password);
    if (!parsedEmail.success) return toast.error(parsedEmail.error.issues[0].message);
    if (!parsedPassword.success) return toast.error(parsedPassword.error.issues[0].message);

    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsedEmail.data,
      password: parsedPassword.data,
    });
    setBusy(false);
    if (error) return toast.error("Sign in failed", { description: error.message });
    toast.success("Welcome back");
    onSuccess();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FieldEmail value={email} onChange={setEmail} />
      <FieldPassword value={password} onChange={setPassword} />
      <LuxButton type="submit" className="w-full" disabled={busy}>
        {busy ? "Signing in" : "Sign in"}
      </LuxButton>
    </form>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedName = nameSchema.safeParse(name);
    const parsedEmail = emailSchema.safeParse(email);
    const parsedPassword = passwordSchema.safeParse(password);
    if (!parsedName.success) return toast.error(parsedName.error.issues[0].message);
    if (!parsedEmail.success) return toast.error(parsedEmail.error.issues[0].message);
    if (!parsedPassword.success) return toast.error(parsedPassword.error.issues[0].message);

    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsedEmail.data,
      password: parsedPassword.data,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: parsedName.data },
      },
    });
    setBusy(false);
    if (error) return toast.error("Sign up failed", { description: error.message });
    toast.success("Account created", { description: "You can sign in now." });
    onSuccess();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.28em] text-platinum/70">
          Full name
        </Label>
        <Input
          id="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
        />
      </div>
      <FieldEmail value={email} onChange={setEmail} />
      <FieldPassword value={password} onChange={setPassword} autoComplete="new-password" />
      <LuxButton type="submit" className="w-full" disabled={busy}>
        {busy ? "Creating account" : "Create account"}
      </LuxButton>
    </form>
  );
}

function FieldEmail({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.28em] text-platinum/70">
        Email
      </Label>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
      />
    </div>
  );
}

function FieldPassword({
  value,
  onChange,
  autoComplete = "current-password",
}: {
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.28em] text-platinum/70">
        Password
      </Label>
      <Input
        id="password"
        type="password"
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 9.5-4.8 9.5-7.4 0-.5 0-.9-.1-1.3H12z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16.365 12.87c-.03-3.04 2.48-4.5 2.59-4.57-1.41-2.06-3.61-2.34-4.39-2.37-1.87-.19-3.65 1.1-4.6 1.1-.95 0-2.42-1.07-3.98-1.04-2.05.03-3.94 1.19-4.99 3.02-2.13 3.7-.54 9.16 1.53 12.16 1.01 1.47 2.22 3.12 3.79 3.06 1.52-.06 2.09-.98 3.92-.98 1.83 0 2.35.98 3.96.95 1.64-.03 2.68-1.5 3.68-2.98 1.16-1.71 1.64-3.36 1.66-3.45-.04-.02-3.19-1.22-3.22-4.85zM13.5 4.35c.83-1 1.39-2.4 1.24-3.79-1.2.05-2.66.8-3.52 1.8-.77.88-1.45 2.3-1.27 3.66 1.34.1 2.72-.68 3.55-1.67z" />
    </svg>
  );
}
