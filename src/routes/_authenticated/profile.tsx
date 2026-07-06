import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Award, BookOpen, GraduationCap, Loader2, LogOut, Upload } from "lucide-react";


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


function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Resolve a stored avatar_url into a viewable URL. Full https URLs are used
  // directly; storage paths (e.g. "<uid>/avatar-123.png") are exchanged for a
  // short-lived signed URL against the private `avatars` bucket.
  const resolveAvatarUrl = async (value: string | null): Promise<string | null> => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(value, 60 * 60);
    if (error) {
      toast.error("Could not load avatar", { description: error.message });
      return null;
    }
    return data?.signedUrl ?? null;
  };

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.role) setRole(data.role);
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("id, display_name, avatar_url, headline, bio")
      .eq("id", user.id)
      .maybeSingle()
      .then(async ({ data, error }) => {
        if (error) toast.error("Could not load profile", { description: error.message });
        const next: Profile =
          data ?? { id: user.id, display_name: null, avatar_url: null, headline: null, bio: null };
        setProfile(next);
        setAvatarPreview(await resolveAvatarUrl(next.avatar_url));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      return toast.error("Please choose an image file");
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image must be under 5MB");
    }
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (uploadError) {
      setUploading(false);
      return toast.error("Upload failed", { description: uploadError.message });
    }
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, avatar_url: path }, { onConflict: "id" });
    if (updateError) {
      setUploading(false);
      return toast.error("Could not save avatar", { description: updateError.message });
    }
    setProfile((p) => (p ? { ...p, avatar_url: path } : p));
    setAvatarPreview(await resolveAvatarUrl(path));
    setUploading(false);
    toast.success("Avatar updated");
  };


  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;
    const parsed = z
      .object({
        display_name: displayNameSchema,
        headline: headlineSchema,
        bio: bioSchema,
      })
      .safeParse({
        display_name: profile.display_name ?? "",
        headline: profile.headline ?? "",
        bio: profile.bio ?? "",
      });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          display_name: parsed.data.display_name,
          headline: (parsed.data.headline as string | undefined) || null,
          bio: (parsed.data.bio as string | undefined) || null,
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
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-obsidian">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Your avatar"
                        data-testid="avatar-preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-display text-xl text-gold">
                        {(profile?.display_name || user?.email || "?")
                          .trim()
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <Eyebrow>Signed in as</Eyebrow>
                    <p className="mt-1 truncate font-display text-xl text-ivory">
                      {profile?.display_name || user?.email}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-platinum/60">{user?.email}</p>
                  </div>
                </div>

                {role ? (
                  <p
                    data-testid="user-role"
                    className="mt-4 inline-block border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold"
                  >
                    {role}
                  </p>
                ) : null}
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
                  <Field label="Avatar" hint="PNG, JPG, or WEBP. Up to 5MB.">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/15 bg-obsidian">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Current avatar"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-platinum/50">
                            None
                          </div>
                        )}
                        {uploading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-obsidian/70">
                            <Loader2 className="h-5 w-5 animate-spin text-gold" />
                          </div>
                        ) : null}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={onAvatarFileChange}
                        aria-label="Upload avatar"
                      />
                      <LuxButton
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                        icon={<Upload className="h-3.5 w-3.5" />}
                      >
                        {uploading ? "Uploading" : avatarPreview ? "Replace" : "Upload"}
                      </LuxButton>
                    </div>
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
