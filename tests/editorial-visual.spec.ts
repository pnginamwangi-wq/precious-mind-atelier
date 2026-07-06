import { test, expect } from "@playwright/test";

/**
 * Visual regression snapshots for the editorial block set.
 *
 * Snapshots each block in isolation at three breakpoints so styling
 * drift (typography scale, spacing, hairlines, gold accents) is caught
 * before it lands.
 *
 * Baselines live next to this spec under
 *   tests/editorial-visual.spec.ts-snapshots/
 *
 * First run:  bunx playwright test tests/editorial-visual.spec.ts --update-snapshots
 * Subsequent: bunx playwright test tests/editorial-visual.spec.ts
 */

const BLOCKS = [
  "block-caption",
  "block-figure",
  "block-vignette",
  "block-vignette-reverse",
  "block-pullquote",
  "block-chaptermark",
  "block-aside",
] as const;

const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 1600 },
  { name: "tablet", width: 834, height: 1600 },
  { name: "desktop", width: 1440, height: 1800 },
] as const;

for (const bp of BREAKPOINTS) {
  test.describe(`editorial blocks @ ${bp.name} (${bp.width}px)`, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } });

    test.beforeEach(async ({ page }) => {
      // Kill animations and caret blink so snapshots are byte-stable.
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            caret-color: transparent !important;
          }
          html { scroll-behavior: auto !important; }
        `,
      });
      await page.goto("/visual/editorial-blocks", {
        waitUntil: "networkidle",
      });
      // Wait for web fonts so typography is stable.
      await page.evaluate(() => document.fonts.ready);
    });

    for (const id of BLOCKS) {
      test(`${id}`, async ({ page }) => {
        const block = page.getByTestId(id);
        await block.scrollIntoViewIfNeeded();
        await expect(block).toHaveScreenshot(`${id}-${bp.name}.png`, {
          animations: "disabled",
          maxDiffPixelRatio: 0.01,
        });
      });
    }
  });
}
