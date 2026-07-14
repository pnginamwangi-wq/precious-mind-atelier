import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * MediaOverlay — Phase 2A media treatment.
 *
 * Contract:
 * - `poster` is always required and renders immediately.
 * - Optional `videoWebm` / `videoMp4` upgrade the poster to an autoplaying,
 *   muted, looped, playsinline video — but ONLY when the visitor allows
 *   motion (`prefers-reduced-motion: no-preference`) and is not on a
 *   data-saver connection.
 * - `scrim` guarantees AA-contrast text over any frame of the media:
 *   'hero' for full-bleed heroes, 'card' for tiles, 'none' when the
 *   media carries no text.
 *
 * Expected file layout: public/media/{asset-id}/poster.jpg|loop.webm|loop.mp4
 */

type MediaOverlayProps = {
  /** Static image, always rendered first. Required. */
  poster: string;
  /** Descriptive alt text for the poster image. Required. */
  alt: string;
  /** Optional ambient loop sources — poster upgrades only when allowed. */
  videoWebm?: string;
  videoMp4?: string;
  /** Contrast scrim over the media. Defaults to 'none'. */
  scrim?: "hero" | "card" | "none";
  /** Content layered above the media (headings, captions, CTAs). */
  children?: ReactNode;
  /** Class for the outer wrapper (size/aspect belongs here). */
  className?: string;
  /** Class for the inner content layer. */
  contentClassName?: string;
  /** Eager-load the poster (use for above-the-fold heroes). */
  priority?: boolean;
};

type NetworkInformation = { saveData?: boolean };

function useCanPlayMotion(): boolean {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const saveData = connection?.saveData === true;

    const update = () => setCanPlay(mq.matches && !saveData);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canPlay;
}

export function MediaOverlay({
  poster,
  alt,
  videoWebm,
  videoMp4,
  scrim = "none",
  children,
  className,
  contentClassName,
  priority = false,
}: MediaOverlayProps) {
  const canPlayMotion = useCanPlayMotion();
  const hasVideo = Boolean(videoWebm || videoMp4);
  const showVideo = hasVideo && canPlayMotion;

  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      {/* Poster always renders — the guaranteed baseline. */}
      <img
        src={poster}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Ambient loop upgrade — motion-safe visitors only. */}
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
          {videoMp4 ? <source src={videoMp4} type="video/mp4" /> : null}
        </video>
      ) : null}

      {/* Contrast scrim — keeps overlaid text at AA on any frame. */}
      {scrim !== "none" ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0",
            scrim === "hero" ? "scrim-hero" : "scrim-card",
          )}
        />
      ) : null}

      {/* Overlaid content */}
      {children ? <div className={cn("relative", contentClassName)}>{children}</div> : null}
    </div>
  );
}
