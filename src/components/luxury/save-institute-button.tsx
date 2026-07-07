import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

import { LuxButton } from "@/components/luxury";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  slug: string;
  name: string;
};

export function SaveInstituteButton({ slug, name }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async (uid: string | null) => {
      if (!active) return;
      setUserId(uid);
      if (!uid) {
        setSaved(false);
        setChecking(false);
        return;
      }
      setChecking(true);
      const { data, error } = await supabase
        .from("saved_institutes")
        .select("id")
        .eq("user_id", uid)
        .eq("institute_slug", slug)
        .maybeSingle();
      if (!active) return;
      if (error) console.error(error);
      setSaved(Boolean(data));
      setChecking(false);
    };

    supabase.auth.getUser().then(({ data }) => load(data.user?.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        load(session?.user?.id ?? null);
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [slug]);

  if (!userId) {
    return (
      <LuxButton asChild variant="ghost" icon={<Bookmark className="h-3.5 w-3.5" />}>
        <Link to="/auth">Sign in to save</Link>
      </LuxButton>
    );
  }

  const toggle = async () => {
    if (pending || checking) return;
    setPending(true);
    if (saved) {
      const { error } = await supabase
        .from("saved_institutes")
        .delete()
        .eq("user_id", userId)
        .eq("institute_slug", slug);
      if (error) {
        toast.error("Could not remove from your saved list.");
      } else {
        setSaved(false);
        toast.success(`Removed ${name} from your saved Institutes.`);
      }
    } else {
      const { error } = await supabase
        .from("saved_institutes")
        .insert({ user_id: userId, institute_slug: slug, institute_name: name });
      if (error) {
        if (error.code === "23505") {
          setSaved(true);
        } else {
          toast.error("Could not save this Institute.");
        }
      } else {
        setSaved(true);
        toast.success(`Saved ${name} to your profile.`);
      }
    }
    setPending(false);
  };

  return (
    <LuxButton
      variant="ghost"
      onClick={toggle}
      disabled={pending || checking}
      icon={
        saved ? (
          <BookmarkCheck className="h-3.5 w-3.5" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" />
        )
      }
    >
      {saved ? "Saved to your profile" : "Save this Institute"}
    </LuxButton>
  );
}
