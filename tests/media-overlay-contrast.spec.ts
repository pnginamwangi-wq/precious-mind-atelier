import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated WCAG contrast checks for text rendered inside MediaOverlay
 * scrims. Each key media hero / room section is scanned with axe-core,
 * limited to the `color-contrast` and `color-contrast-enhanced` rules.
 *
 * Note: axe cannot compute contrast against a raster background image,
 * so it reports `incomplete` rather than `violations` for text sitting
 * directly on media. The scrim system (see src/styles.css) is designed
 * so text sits over a solid-computed layer; violations here mean a
 * token-level failure (e.g. muted-foreground on obsidian) and must be
 * fixed rather than suppressed.
 */

const ROUTES = [
  { name: "home-hero", path: "/" },
  { name: "library", path: "/library" },
  { name: "journal", path: "/journal" },
  { name: "knowledge", path: "/knowledge" },
  { name: "smelt-lab", path: "/smelt-lab" },
  { name: "institutes", path: "/institutes" },
] as const;

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1800 },
  { name: "mobile-portrait", width: 390, height: 844 },
  { name: "mobile-landscape", width: 844, height: 390 },
] as const;

// Extra scan modes: poster-fallback (video hidden), hover on interactive
// cards, and reduced-motion. Each runs against every route + viewport so
// no state slips past AA.
const MODES = [
  { name: "default", setup: async () => {} },
  {
    name: "poster-fallback",
    setup: async (page) => {
      await page.addStyleTag({ content: "video { display: none !important; }" });
    },
  },
  {
    name: "hover",
    setup: async (page) => {
      // Force :hover state on the first card link inside any media hero.
      await page.evaluate(() => {
        const target = document.querySelector(
          "[data-media-hero-scan] a, [data-media-hero-scan] button",
        );
        (target as HTMLElement | null)?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      });
    },
  },
] as const;

for (const vp of VIEWPORTS) {
  test.describe(`MediaOverlay contrast @ ${vp.name}`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
    });

    for (const route of ROUTES) {
      for (const mode of MODES) {
        test(`${route.name} [${mode.name}] scrim text meets WCAG AA`, async ({ page }) => {
          await page.goto(route.path, { waitUntil: "domcontentloaded" });
          await page.evaluate(() => document.fonts.ready);

          const containerCount = await page.evaluate(() => {
            const overlays = Array.from(document.querySelectorAll(".on-media"));
            const parents = new Set<Element>();
            for (const el of overlays) {
              if (el.parentElement) parents.add(el.parentElement);
            }
            let i = 0;
            for (const p of parents) {
              p.setAttribute("data-media-hero-scan", String(i++));
            }
            return parents.size;
          });
          expect(containerCount, "route should render at least one media hero").toBeGreaterThan(0);

          await mode.setup(page);

          const results = await new AxeBuilder({ page })
            .include("[data-media-hero-scan]")
            .withRules(["color-contrast"])
            .analyze();

          const violations = results.violations.filter((v) => v.id === "color-contrast");
          expect(
            violations,
            `axe color-contrast violations on ${route.path} [${mode.name}]:\n${JSON.stringify(violations, null, 2)}`,
          ).toEqual([]);
        });
      }
    }
  });
}

// Reduced-motion pass: animations off, video paused.
test.describe("MediaOverlay contrast @ reduced-motion", () => {
  test.use({ viewport: { width: 1440, height: 1800 }, reducedMotion: "reduce" });
  for (const route of ROUTES) {
    test(`${route.name} scrim text meets WCAG AA (reduced-motion)`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        const overlays = Array.from(document.querySelectorAll(".on-media"));
        let i = 0;
        for (const el of overlays) {
          el.parentElement?.setAttribute("data-media-hero-scan", String(i++));
        }
      });
      const results = await new AxeBuilder({ page })
        .include("[data-media-hero-scan]")
        .withRules(["color-contrast"])
        .analyze();
      const violations = results.violations.filter((v) => v.id === "color-contrast");
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    });
  }
});
