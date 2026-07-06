import { test, expect, type Page } from "@playwright/test";

/**
 * Verifies that key motion primitives respect prefers-reduced-motion:
 *   - <PageTransition/> renders no fixed veil overlay on route change
 *   - <Reveal/> wrappers render at their resting transform (no y offset)
 *   - InstituteHero parallax freezes (no translate/scale on scroll)
 *
 * Framer's <MotionConfig reducedMotion="user"/> in __root.tsx and the
 * useReducedMotion guard in the hero are what make these assertions pass.
 */

// test.use({ reducedMotion: "reduce" }) is unreliable with the sandbox
// Chromium binary; emulate the media feature per test instead.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

async function transformOf(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return "MISSING";
    return getComputedStyle(el).transform;
  }, selector);
}

// A CSS transform is "no motion" when it is either the keyword `none` or
// the identity matrix. Framer occasionally writes `matrix(1, 0, 0, 1, 0, 0)`
// for an untouched element even when nothing is animating.
function isIdentityTransform(value: string): boolean {
  if (value === "none") return true;
  const normalised = value.replace(/\s+/g, "");
  return (
    normalised === "matrix(1,0,0,1,0,0)" ||
    normalised === "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
  );
}

test.describe("prefers-reduced-motion", () => {
  test("PageTransition veil is suppressed on navigation", async ({ page }) => {
    await page.goto("/");
    // useReducedMotion resolves on the client after hydration; give React
    // one commit to re-render PageTransition into its children-only branch.
    await page.waitForFunction(
      () => document.querySelector('[data-testid="page-veil"]') === null,
      undefined,
      { timeout: 5000 },
    );
    await expect(page.getByTestId("page-veil")).toHaveCount(0);

    await page.goto("/institutes");
    await expect(page.getByTestId("page-veil")).toHaveCount(0);

    // A programmatic route change (not a full reload) is the case that
    // actually exercises PageTransition's AnimatePresence.
    await page.getByRole("link", { name: /governance/i }).first().click();
    await expect(page).toHaveURL(/\/governance$/);
    await expect(page.getByTestId("page-veil")).toHaveCount(0);
  });

  test("Reveal wrappers render without a transform offset", async ({ page }) => {
    await page.goto("/institutes");
    // Reveal uses fadeUp (y: 30 -> 0). Under reducedMotion="user" framer
    // must jump to the resting state, leaving no translateY on the wrapper.
    const reveals = page.getByTestId("reveal");
    const count = await reveals.count();
    expect(count).toBeGreaterThan(0);

    const transforms = await reveals.evaluateAll((els) =>
      els.slice(0, 8).map((el) => getComputedStyle(el).transform),
    );
    for (const t of transforms) {
      expect(isIdentityTransform(t), `unexpected transform ${t}`).toBe(true);
    }
  });

  test("InstituteHero parallax freezes on scroll", async ({ page }) => {
    // Any institute detail route mounts the parallax hero.
    await page.goto("/institutes");
    await page.getByRole("link", { name: /enter the .+ institute/i }).first().click();
    await page.waitForURL(/\/institutes\/[^/]+$/);
    // Re-assert the media query after navigation and give framer's
    // useReducedMotion one commit to resolve from null to true.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const parallax = page.getByTestId("hero-parallax");
    const overlay = page.getByTestId("hero-overlay");
    await expect(parallax).toBeVisible();

    // Baseline transform at scroll position 0.
    await page.waitForTimeout(200);
    const before = await transformOf(page, '[data-testid="hero-parallax"]');
    expect(isIdentityTransform(before), `parallax start transform ${before}`).toBe(true);

    // Scroll the full hero out of view: without the reduced-motion guard,
    // framer would apply translateY and scale here.
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(200);

    const after = await transformOf(page, '[data-testid="hero-parallax"]');
    expect(isIdentityTransform(after), `parallax scrolled transform ${after}`).toBe(true);

    // The overlay opacity motion must also stay at its resting value.
    const overlayOpacity = await overlay.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(overlayOpacity)).toBeCloseTo(1, 2);
  });
});
