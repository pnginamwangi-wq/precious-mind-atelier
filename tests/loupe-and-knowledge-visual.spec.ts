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
  { name: "mobile-landscape", width: 844, height: 390 },
  { name: "tablet", width: 768, height: 1024 },
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

/**
 * Wait until every gemstone image the Loupe Room preloads has finished
 * decoding inside the iframe. This kills a class of flake where the
 * screenshot fires while the browser is still rasterising the WebP the
 * preload link just fetched.
 */
async function waitForLoupeGemstonesDecoded(page: import("@playwright/test").Page) {
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
      const match = /url\(["']?([^"')]+)["']?\)/.exec(bg);
      if (!match) return false;
      const url = match[1];
      // Resolve, decode, and stash the result on a data attribute so
      // subsequent polls short-circuit without kicking off more decodes.
      const flag = "data-lovable-decoded";
      if (stone.getAttribute(flag) === url) return true;
      const w = iframe!.contentWindow as (Window & { __decodingUrl?: string }) | null;
      if (!w) return false;
      if (w.__decodingUrl === url) return false;
      w.__decodingUrl = url;
      const img = new (w as unknown as { Image: typeof Image }).Image();
      img.decoding = "async";
      img.src = url;
      const done = () => {
        stone.setAttribute(flag, url);
        w.__decodingUrl = undefined;
      };
      if (img.decode) {
        img.decode().then(done, done);
      } else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
      return false;
    },
    undefined,
    { timeout: 15000 },
  );

  // Then ensure every tray dot's background image has also decoded so the
  // 8-stone selector row doesn't visibly pop in mid-screenshot.
  await page.waitForFunction(
    () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[data-testid="loupe-room-frame"]',
      );
      const w = iframe?.contentWindow as Window | null;
      const doc = iframe?.contentDocument;
      if (!w || !doc) return false;
      const dots = Array.from(doc.querySelectorAll<HTMLElement>(".gem-dot"));
      if (dots.length < 8) return false;
      const urls: string[] = [];
      for (const d of dots) {
        const m = /url\(["']?([^"')]+)["']?\)/.exec(d.style.backgroundImage || "");
        if (!m) return false;
        urls.push(m[1]);
      }
      const wr = w as Window & { __trayDecoded?: Set<string> };
      wr.__trayDecoded ??= new Set<string>();
      const ready = urls.every((u) => wr.__trayDecoded!.has(u));
      if (ready) return true;
      for (const u of urls) {
        if (wr.__trayDecoded!.has(u)) continue;
        const img = new (w as unknown as { Image: typeof Image }).Image();
        img.decoding = "async";
        img.src = u;
        const done = () => wr.__trayDecoded!.add(u);
        if (img.decode) img.decode().then(done, done);
        else {
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }
      }
      return false;
    },
    undefined,
    { timeout: 15000 },
  );

  // Iframe fonts.
  await page.evaluate(async () => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe[data-testid="loupe-room-frame"]',
    );
    const doc = iframe?.contentDocument;
    if (!doc) return;
    if ((doc as Document & { fonts?: FontFaceSet }).fonts) {
      await (doc as Document & { fonts: FontFaceSet }).fonts.ready;
    }
  });
}

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
      await page
        .locator("main .on-media picture img")
        .first()
        .evaluate((img: HTMLImageElement) => {
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
      const frame = page.frameLocator('iframe[data-testid="loupe-room-frame"]');
      await frame.locator(".stone").first().waitFor({ state: "visible", timeout: 15000 });
      await waitForLoupeGemstonesDecoded(page);
      await expect(page).toHaveScreenshot(`loupe-room-${bp.name}.png`, {
        animations: "disabled",
        fullPage: false,
        maxDiffPixelRatio: 0.03,
      });
    });
  });
}
