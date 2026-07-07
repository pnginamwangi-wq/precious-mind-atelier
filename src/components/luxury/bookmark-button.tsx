import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { listBookmarks, toggleBookmark } from "@/lib/journal.functions";
import { cn } from "@/lib/utils";

/**
 * Bookmark toggle for a Journal article. When signed out, links to /auth.
 * State reflects the current signed-in user's bookmarks.
 */
export function BookmarkButton({ slug, className }: { slug: string; className?: string }) {
  const { user, loading: authLoading } = useAuth();
  const list = useServerFn(listBookmarks);
  const toggle = useServerFn(toggleBookmark);
  const [bookmarked, setBookmarked] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setBookmarked(null);
      return;
    }
    let alive = true;
    list()
      .then((rows) => {
        if (!alive) return;
        setBookmarked(rows.some((r) => r.article_slug === slug));
      })
      .catch(() => alive && setBookmarked(false));
    return () => {
      alive = false;
    };
  }, [user, slug, list]);

  const base =
    "inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-[11px] font-light uppercase tracking-[0.24em] text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold";

  if (authLoading) {
    return (
      <span className={cn(base, "opacity-60", className)}>
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Loading
      </span>
    );
  }

  if (!user) {
    return (
      <Link to="/auth" className={cn(base, className)} aria-label="Sign in to save this article">
        <Bookmark className="h-3.5 w-3.5" />
        Sign in to save
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={async () => {
        if (busy) return;
        setBusy(true);
        try {
          const res = await toggle({ data: { slug } });
          setBookmarked(res.bookmarked);
        } finally {
          setBusy(false);
        }
      }}
      className={cn(base, bookmarked && "border-gold/60 text-gold", className)}
      aria-pressed={bookmarked ?? false}
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : bookmarked ? (
        <BookmarkCheck className="h-3.5 w-3.5" />
      ) : (
        <Bookmark className="h-3.5 w-3.5" />
      )}
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}
