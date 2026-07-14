import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("Loupe Room on mobile viewport", () => {
  test("wing tablist and iframe are visible on mobile", async ({ page }) => {
    await page.goto("/loupe-room");
    const tablist = page.getByRole("tablist", { name: "Loupe Room wings" });
    await expect(tablist).toBeVisible();
    await expect(page.getByTestId("loupe-room-frame")).toBeVisible();
  });

  test("the Loupe Room fills the mobile viewport as an immersive overlay", async ({ page }) => {
    await page.goto("/loupe-room");
    const overlay = page.locator('div.fixed.inset-0').filter({ has: page.getByTestId("loupe-room-frame") });
    const box = await overlay.first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(389);
    expect(box!.height).toBeGreaterThanOrEqual(600);
  });

  test("no floating widget obscures the wing tab controls", async ({ page }) => {
    await page.goto("/loupe-room/bench");
    const benchTab = page.getByTestId("loupe-tab-bench");
    await expect(benchTab).toBeVisible();

    const box = await benchTab.boundingBox();
    expect(box).not.toBeNull();
    const { x, y, width, height } = box!;
    const cx = x + width / 2;
    const cy = y + height / 2;
    const topElHandlesTab = await page.evaluate(
      ([px, py]) => {
        const el = document.elementFromPoint(px as number, py as number);
        return el ? el.closest('[data-testid="loupe-tab-bench"]') !== null : false;
      },
      [cx, cy],
    );
    expect(topElHandlesTab).toBe(true);
  });

  test("no bottom-anchored floating widget covers the wing controls", async ({ page }) => {
    await page.goto("/loupe-room");
    const tablist = page.getByRole("tablist", { name: "Loupe Room wings" });
    const tabBox = await tablist.boundingBox();
    expect(tabBox).not.toBeNull();

    // Scan all fixed-position elements. Any element pinned to the bottom of the
    // viewport (a mobile bottom nav or a floating AI button) must sit below the
    // wing controls, not on top of them.
    const overlapping = await page.evaluate((topOfTabs: number) => {
      const results: { tag: string; top: number; bottom: number }[] = [];
      for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
        const style = getComputedStyle(el);
        if (style.position !== "fixed") continue;
        if (style.visibility === "hidden" || style.display === "none") continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        // Bottom-anchored: within 24px of the viewport bottom.
        const bottomAnchored = window.innerHeight - rect.bottom < 24;
        if (!bottomAnchored) continue;
        // Ignore the immersive overlay itself, which is inset-0 (top === 0).
        if (rect.top <= 0) continue;
        if (rect.top < topOfTabs + 40) {
          results.push({ tag: el.tagName, top: rect.top, bottom: rect.bottom });
        }
      }
      return results;
    }, tabBox!.y);
    expect(overlapping).toEqual([]);
  });
});
