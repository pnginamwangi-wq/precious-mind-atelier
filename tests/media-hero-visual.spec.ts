import { test, expect } from "@playwright/test";

/**
 * Visual regression snapshots for every route that ships a MediaOverlay
 * hero / room section. Guards against regressions in the scrim system,
 * poster/mobile crop wiring, and typography over media.
 *
 * First run:  bunx playwright test tests/media-hero-visual.spec.ts --update-snapshots
 * Subsequent: bunx playwright test tests/media-hero-visual.spec.ts
 */

const ROUTES = [
  { name: "home-hero", path: "/" },
  { name: "library", path: "/library" },
  { name: "journal", path: "/journal" },
  { name: "knowledge", path: "/knowledge" },
  { name: "smelt-lab", path: "/smelt-lab" },
  { name: "institutes", path: "/institutes" },
] as const;

const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

for (const bp of BREAKPOINTS) {
  test.describe(`media hero snapshots @ ${bp.name}`, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } });

    test.beforeEach(async ({ page }) => {
      // Freeze animation, Ken Burns, and video playback so pixels are stable.
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            caret-color: transparent !important;
          }
          video { visibility: hidden !important; }
          html { scroll-behavior: auto !important; }
        `,
      });
    });

    for (const route of ROUTES) {
      test(`${route.name}`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);

        const hero = page.locator("section:has(.on-media)").first();
        await expect(hero).toBeVisible();
        await hero.scrollIntoViewIfNeeded();

        // Wait for the poster image inside the hero to finish loading.
        await hero.locator("picture img").first().evaluate((img: HTMLImageElement) => {
          if (img.complete) return;
          return new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          });
        });

        await expect(hero).toHaveScreenshot(`${route.name}-${bp.name}.png`, {
          animations: "disabled",
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  });
}
