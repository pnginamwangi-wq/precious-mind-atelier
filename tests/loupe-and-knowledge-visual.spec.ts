import { test, expect } from "@playwright/test";

/**
 * Focused visual regression coverage for the two routes flagged in the last
 * readability fix:
 *   - /knowledge: text must stay readable over the MediaOverlay hero
 *   - /loupe-room: the gemstone tray + specimen stage must render correctly
 *
 * These are FULL-VIEWPORT snapshots (not just the hero) so we also catch
 * layout regressions around the scrim, container padding, and iframe shell.
 *
 * First run:  bunx playwright test tests/loupe-and-knowledge-visual.spec.ts --update-snapshots
 * Subsequent: bunx playwright test tests/loupe-and-knowledge-visual.spec.ts
 */

const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

const FREEZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
  video { visibility: hidden !important; }
  html { scroll-behavior: auto !important; }
`;

for (const bp of BREAKPOINTS) {
  test.describe(`readability snapshots @ ${bp.name}`, () => {
    test.use({
      viewport: { width: bp.width, height: bp.height },
      reducedMotion: "reduce",
    });

    test.beforeEach(async ({ page }) => {
      await page.addStyleTag({ content: FREEZE_CSS });
    });

    test(`knowledge hero readability`, async ({ page }) => {
      await page.goto("/knowledge", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      // Wait for the hero poster inside the MediaOverlay.
      await page.locator("main .on-media picture img").first().evaluate((img: HTMLImageElement) => {
        if (img.complete) return;
        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      });
      await expect(page).toHaveScreenshot(`knowledge-${bp.name}.png`, {
        animations: "disabled",
        fullPage: false,
        maxDiffPixelRatio: 0.02,
      });
    });

    test(`loupe-room gemstones render`, async ({ page }) => {
      await page.goto("/loupe-room", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      // The interactive study wing is an <iframe>. Wait for it to be ready
      // and for the initial gemstone image (diamond) to load inside it.
      const frame = page.frameLocator('iframe[data-testid="loupe-room-frame"]');
      await frame.locator(".stone").first().waitFor({ state: "visible", timeout: 15000 });
      await page.waitForFunction(
        () => {
          const iframe = document.querySelector<HTMLIFrameElement>(
            'iframe[data-testid="loupe-room-frame"]',
          );
          const doc = iframe?.contentDocument;
          if (!doc) return false;
          const stone = doc.querySelector<HTMLElement>(".stone");
          if (!stone) return false;
          const bg = stone.style.backgroundImage || "";
          // Background applied only after preload decode completes.
          return /diamond|ruby|sapphire|emerald|spinel|opal|pearl|jade/i.test(bg);
        },
        undefined,
        { timeout: 15000 },
      );
      // Small settle for iframe font swap.
      await page.waitForTimeout(400);

      await expect(page).toHaveScreenshot(`loupe-room-${bp.name}.png`, {
        animations: "disabled",
        fullPage: false,
        maxDiffPixelRatio: 0.03,
      });
    });
  });
}
