import { test, expect } from "@playwright/test";

/**
 * Regression: every MediaOverlay hero must render with non-zero height
 * and its poster must actually load (naturalWidth > 0). Contrast axe
 * tests cannot see a collapsed section or a 404 image, so this guard
 * fills that gap.
 */

const ROUTES = [
  "/",
  "/library",
  "/institutes",
  "/journal",
  "/knowledge",
  "/governance",
] as const;

for (const path of ROUTES) {
  test(`media hero renders on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const info = await page.evaluate(async () => {
      const overlay = document.querySelector<HTMLElement>(".on-media");
      if (!overlay) return { found: false, height: 0, width: 0, naturalWidth: 0 };
      const parent = overlay.parentElement as HTMLElement;
      const rect = parent.getBoundingClientRect();
      const img = overlay.querySelector<HTMLImageElement>("img");
      if (img && !img.complete) {
        await new Promise<void>((r) => {
          img.addEventListener("load", () => r(), { once: true });
          img.addEventListener("error", () => r(), { once: true });
        });
      }
      return {
        found: true,
        height: rect.height,
        width: rect.width,
        naturalWidth: img?.naturalWidth ?? 0,
      };
    });
    expect(info.found, `MediaOverlay must render on ${path}`).toBe(true);
    expect(info.height, `hero container must have non-zero height on ${path}`).toBeGreaterThan(200);
    expect(info.naturalWidth, `hero image must load on ${path}`).toBeGreaterThan(0);
  });
}
