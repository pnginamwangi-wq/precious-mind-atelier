import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Award, BookOpen, GraduationCap, Loader2, LogOut } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Hairline,
  LuxButton,
  Section,
  SectionHeader,
} from "@/components/luxury";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile, The Precious Intelligence Academy" },
      { name: "description", content: "Manage your Academy profile, learning progress, and certifications." },
    ],
  }),
  component: ProfilePage,
});

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  headline: string | null;
  bio: string | null;
};

const displayNameSchema = z.string().trim().min(1, "Name is required").max(80);
const headlineSchema = z.string().trim().max(120).optional().or(z.literal(""));
const bioSchema = z.string().trim().max(600).optional().or(z.literal(""));
const avatarSchema = z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal(""));

function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("id, display_name, avatar_url, headline, bio")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error("Could not load profile", { description: error.message });
        setProfile(
          data ?? { id: user.id, display_name: null, avatar_url: null, headline: null, bio: null },
        );
        setLoading(false);
      });
  }, [user]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;
    const parsed = z
      .object({
        display_name: displayNameSchema,
        headline: headlineSchema,
        bio: bioSchema,
        avatar_url: avatarSchema,
      })
      .safeParse({
        display_name: profile.display_name ?? "",
        headline: profile.headline ?? "",
        bio: profile.bio ?? "",
        avatar_url: profile.avatar_url ?? "",
      });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          display_name: parsed.data.display_name,
          headline: parsed.data.headline || null,
          bio: parsed.data.bio || null,
          avatar_url: parsed.data.avatar_url || null,
        },
        { onConflict: "id" },
      );
    setSaving(false);
    if (error) return toast.error("Could not save", { description: error.message });
    toast.success("Profile updated");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="pt-40">
          <SectionHeader
            eyebrow="Your Study"
            title="Your Academy Profile"
            intro="Curate how you appear across masterclasses, mentorships, and the certifications you will earn."
          />

          <Container className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <aside className="space-y-8">
              <div className="border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
                <Eyebrow>Signed in as</Eyebrow>
                <p className="mt-3 truncate font-display text-2xl text-ivory">
                  {profile?.display_name || user?.email}
                </p>
                <p className="mt-1 truncate text-xs text-platinum/60">{user?.email}</p>
                <Hairline className="my-6" />
                <LuxButton
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleSignOut}
                  icon={<LogOut className="h-3.5 w-3.5" />}
                >
                  Sign out
                </LuxButton>
              </div>

              <div className="space-y-4">
                <StatCard icon={<BookOpen className="h-4 w-4" />} label="Masterclasses" value="0" hint="Enrolled" />
                <StatCard icon={<GraduationCap className="h-4 w-4" />} label="Learning path" value="Foundations" hint="Current stage" />
                <StatCard icon={<Award className="h-4 w-4" />} label="Certifications" value="0" hint="Awarded" />
              </div>
            </aside>

            <form onSubmit={onSave} className="space-y-6 border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
              {loading ? (
                <div className="flex items-center justify-center py-20 text-platinum/60">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                <>
                  <Field label="Display name">
                    <Input
                      value={profile?.display_name ?? ""}
                      onChange={(e) => setProfile((p) => (p ? { ...p, display_name: e.target.value } : p))}
                      className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
                    />
                  </Field>
                  <Field label="Headline" hint="A short professional line, up to 120 characters.">
                    <Input
                      value={profile?.headline ?? ""}
                      onChange={(e) => setProfile((p) => (p ? { ...p, headline: e.target.value } : p))}
                      placeholder="Gemmologist, luxury retail strategist."
                      className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
                    />
                  </Field>
                  <Field label="Avatar URL">
                    <Input
                      value={profile?.avatar_url ?? ""}
                      onChange={(e) => setProfile((p) => (p ? { ...p, avatar_url: e.target.value } : p))}
                      placeholder="https://"
                      className="h-11 rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
                    />
                  </Field>
                  <Field label="About" hint="A few sentences on your craft and ambitions.">
                    <Textarea
                      value={profile?.bio ?? ""}
                      onChange={(e) => setProfile((p) => (p ? { ...p, bio: e.target.value } : p))}
                      rows={5}
                      className="rounded-none border-white/15 bg-white/[0.02] text-ivory focus-visible:border-gold focus-visible:ring-0"
                    />
                  </Field>
                  <div className="flex justify-end">
                    <LuxButton type="submit" disabled={saving}>
                      {saving ? "Saving" : "Save changes"}
                    </LuxButton>
                  </div>
                </>
              )}
            </form>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] uppercase tracking-[0.28em] text-platinum/70">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-platinum/50">{hint}</p> : null}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-3 text-gold">
        {icon}
        <Eyebrow>{label}</Eyebrow>
      </div>
      <p className="mt-3 font-display text-2xl text-ivory">{value}</p>
      <p className="text-xs text-platinum/50">{hint}</p>
    </div>
  );
}
