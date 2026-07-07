import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const slugSchema = z.object({ slug: z.string().trim().min(1).max(120) });

export const listBookmarks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("journal_bookmarks")
      .select("article_slug, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const toggleBookmark = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw) => slugSchema.parse(raw))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing, error: findErr } = await supabase
      .from("journal_bookmarks")
      .select("id")
      .eq("user_id", userId)
      .eq("article_slug", data.slug)
      .maybeSingle();
    if (findErr) throw new Error(findErr.message);
    if (existing) {
      const { error } = await supabase.from("journal_bookmarks").delete().eq("id", existing.id);
      if (error) throw new Error(error.message);
      return { bookmarked: false };
    }
    const { error } = await supabase
      .from("journal_bookmarks")
      .insert({ user_id: userId, article_slug: data.slug });
    if (error) throw new Error(error.message);
    return { bookmarked: true };
  });
