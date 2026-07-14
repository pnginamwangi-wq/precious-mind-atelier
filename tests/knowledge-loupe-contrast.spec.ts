import { test, expect, type Page, type FrameLocator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Route-specific WCAG contrast assertions for the two areas most prone to
 * text-over-media readability regressions: the /knowledge hero and the
 * /loupe-room (both the outer React shell that carries a MediaOverlay and
 * the same-origin iframe body which contains the actual gemstone tray,
 * specimen panel, and station copy).
 *
 * Runs at three viewports: mobile portrait (390), tablet (768) and desktop
 * (1440). Each pass fails on any axe `color-contrast` violation.
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

async function markMediaHeroes(page: Page) {
  return page.evaluate(() => {
    const overlays = Array.from(document.querySelectorAll(".on-media"));
    let i = 0;
    const parents = new Set<Element>();
    for (const el of overlays) if (el.parentElement) parents.add(el.parentElement);
    for (const p of parents) p.setAttribute("data-media-hero-scan", String(i++));
    return parents.size;
  });
}

async function assertAxeContrast(builder: AxeBuilder, label: string) {
  const results = await builder.withRules(["color-contrast"]).analyze();
  const violations = results.violations.filter((v) => v.id === "color-contrast");
  expect(
    violations,
    `axe color-contrast violations on ${label}:\n${JSON.stringify(violations, null, 2)}`,
  ).toEqual([]);
}

for (const vp of VIEWPORTS) {
  test.describe(`route contrast @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`/knowledge MediaOverlay text meets WCAG AA`, async ({ page }) => {
      await page.goto("/knowledge", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const count = await markMediaHeroes(page);
      expect(count, "knowledge should render a media hero").toBeGreaterThan(0);
      await assertAxeContrast(
        new AxeBuilder({ page }).include("[data-media-hero-scan]"),
        `/knowledge [${vp.name}]`,
      );
    });

    test(`/loupe-room shell + iframe body meet WCAG AA`, async ({ page }) => {
      await page.goto("/loupe-room", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      // 1. Outer React shell MediaOverlay (tab bar over diamond theatre).
      const count = await markMediaHeroes(page);
      expect(count, "loupe-room shell should render a media overlay").toBeGreaterThan(0);
      await assertAxeContrast(
        new AxeBuilder({ page }).include("[data-media-hero-scan]"),
        `/loupe-room shell [${vp.name}]`,
      );

      // 2. Same-origin iframe body (interactive gemstone room). Wait for
      // the diamond specimen background image to actually be applied so
      // axe reads final computed styles, then scan the hero + bench.
      const iframeLocator: FrameLocator = page.frameLocator(
        'iframe[data-testid="loupe-room-frame"]',
      );
      await iframeLocator.locator(".stone").first().waitFor({ state: "visible", timeout: 15000 });
      await page.waitForFunction(() => {
        const iframe = document.querySelector<HTMLIFrameElement>(
          'iframe[data-testid="loupe-room-frame"]',
        );
        const stone = iframe?.contentDocument?.querySelector<HTMLElement>(".stone");
        return !!stone && /url\(/.test(stone.style.backgroundImage || "");
      }, undefined, { timeout: 15000 });

      const iframeHandle = await page.$('iframe[data-testid="loupe-room-frame"]');
      const contentFrame = await iframeHandle!.contentFrame();
      expect(contentFrame, "loupe-room iframe must be same-origin").not.toBeNull();

      // AxeBuilder cannot target a Frame directly, so mount axe into the
      // iframe document via a bound Page-like wrapper: run axe.run() with
      // the frame's document as context.
      const iframeViolations = await contentFrame!.evaluate(async () => {
        const w = window as unknown as {
          axe?: { run: (context: Element, options: unknown) => Promise<unknown> };
        };
        if (!w.axe) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("axe cdn load failed"));
            document.head.appendChild(s);
          });
        }
        const result = (await w.axe!.run(document.body, {
          runOnly: { type: "rule", values: ["color-contrast"] },
          resultTypes: ["violations"],
        })) as { violations: Array<{ id: string; nodes: unknown[] }> };
        return result.violations.filter((v) => v.id === "color-contrast");
      });

      expect(
        iframeViolations,
        `axe color-contrast violations inside /loupe-room iframe [${vp.name}]:\n${JSON.stringify(
          iframeViolations,
          null,
          2,
        )}`,
      ).toEqual([]);
    });
  });
}
