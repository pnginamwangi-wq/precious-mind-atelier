import { describe, test, expect } from "bun:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

/**
 * Static guard against readability regressions.
 *
 * Fails the build if a source file uses a hand-rolled dark gradient
 * (bg-gradient-to-* from-obsidian, from-black, or inline
 * radial/linear gradients targeting obsidian/black) in the same file
 * that also renders a raw <img> or <video>. Every such surface must
 * go through MediaOverlay or one of the shared scrim-* utilities so
 * text protection is uniform across the site.
 *
 * If a genuine exception is needed, add the file path to `ALLOWLIST`
 * with an inline comment explaining why.
 */

const ROOTS = ["src/routes", "src/components"];
const EXTS = new Set([".tsx", ".ts"]);

const ALLOWLIST = new Set<string>([
  // MediaOverlay itself defines the shared scrim primitives.
  "src/components/luxury/media-overlay.tsx",
  // Editorial figure ships with an <img> plus the shared scrim-bottom
  // utility (verified in this file's assertion below).
  "src/components/luxury/editorial.tsx",
]);

const DARK_GRADIENT = /(bg-gradient-to-[a-z]+[^"'`]*from-(?:obsidian|black|charcoal|graphite))|(bg-\[(?:linear|radial)-gradient[^\]]*(?:obsidian|black|rgba\(0,\s*0,\s*0|rgba\(5,\s*5,\s*4)[^\]]*\])/;
const RAW_IMG = /<img\b[^>]*src=/;
const RAW_VIDEO = /<video\b/;
const MEDIA_OVERLAY = /MediaOverlay|scrim-(hero|card|bottom|left|radial|panel|full)|on-media/;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXTS.has(extname(entry))) out.push(p);
  }
  return out;
}

describe("readability: no hand-rolled overlays over media", () => {
  const files = ROOTS.flatMap((r) => walk(r));

  for (const file of files) {
    if (ALLOWLIST.has(file)) continue;
    if (file.endsWith(".stories.tsx") || file.endsWith(".test.ts")) continue;

    test(file, () => {
      const src = readFileSync(file, "utf8");
      const hasMedia = RAW_IMG.test(src) || RAW_VIDEO.test(src);
      const hasDarkGradient = DARK_GRADIENT.test(src);

      if (hasMedia && hasDarkGradient) {
        // Media file also has a dark gradient. Require the shared
        // system to appear somewhere in the same file.
        expect(
          MEDIA_OVERLAY.test(src),
          `${file} uses a hand-rolled dark gradient alongside <img>/<video> without MediaOverlay / scrim-* / on-media. Use the shared MediaOverlay + scrim classes instead.`,
        ).toBe(true);
      }
    });
  }
});
