import { test, expect } from "@playwright/test";

/**
 * Regression: for each route that ships a full-bleed MediaOverlay hero, the
 * intended hero container must render at hero size (>= 400px tall) and its
 * poster must load (naturalWidth > 0).
 *
 * We deliberately configure the hero selector per route instead of picking
 * the first `.on-media` in the DOM: some routes (Loupe Room top bar, sticky
 * nav overlays, iframe shells) also carry a MediaOverlay but are not the
 * user-visible hero, and treating them as heroes would give false positives.
 */

const HERO_MIN_HEIGHT = 400;

type RouteCase = {
  path: string;
  /**
   * CSS selector list. The first `.on-media` whose parent element is
   * >= HERO_MIN_HEIGHT tall within the matched roots is treated as the hero.
   * Defaults to `main` so we ignore fixed headers / footers / iframe shells.
   */
  roots?: string;
};

const ROUTES: RouteCase[] = [
  { path: "/" },
  { path: "/library" },
  { path: "/institutes" },
  { path: "/journal" },
  { path: "/knowledge" },
  { path: "/governance" },
];

for (const route of ROUTES) {
  test(`media hero renders on ${route.path}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const info = await page.evaluate(
      async ({ roots, minHeight }) => {
        const scopes = Array.from(document.querySelectorAll<HTMLElement>(roots));
        const containers = scopes.length ? scopes : [document.body];
        let hero: HTMLElement | null = null;
        for (const scope of containers) {
          const candidates = Array.from(scope.querySelectorAll<HTMLElement>(".on-media"));
          for (const c of candidates) {
            const parent = c.parentElement as HTMLElement | null;
            if (!parent) continue;
            // Skip overlays inside an <iframe> shell or fixed top/utility bars.
            if (parent.closest("iframe")) continue;
            const rect = parent.getBoundingClientRect();
            if (rect.height >= minHeight) {
              hero = c;
              break;
            }
          }
          if (hero) break;
        }
        if (!hero) return { found: false, height: 0, naturalWidth: 0 };
        const parent = hero.parentElement as HTMLElement;
        const rect = parent.getBoundingClientRect();
        const img = hero.querySelector<HTMLImageElement>("img");
        if (img && !img.complete) {
          await new Promise<void>((r) => {
            img.addEventListener("load", () => r(), { once: true });
            img.addEventListener("error", () => r(), { once: true });
          });
        }
        return {
          found: true,
          height: rect.height,
          naturalWidth: img?.naturalWidth ?? 0,
        };
      },
      { roots: route.roots ?? "main, [data-route-root]", minHeight: HERO_MIN_HEIGHT },
    );
    expect(info.found, `intended hero MediaOverlay must render on ${route.path}`).toBe(true);
    expect(
      info.height,
      `hero container must be at least ${HERO_MIN_HEIGHT}px tall on ${route.path}`,
    ).toBeGreaterThanOrEqual(HERO_MIN_HEIGHT);
    expect(info.naturalWidth, `hero poster must load on ${route.path}`).toBeGreaterThan(0);
  });
}
