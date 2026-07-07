import { useEffect, useState } from "react";

/**
 * A thin gold progress bar fixed to the top of the viewport that reflects
 * how far the user has scrolled through the current article. Purely
 * decorative; contains no interactive state.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const value = Math.min(1, Math.max(0, doc.scrollTop / total));
      setProgress(value);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-champagne via-gold to-gold-soft transition-[width] duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
