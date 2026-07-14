import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("Loupe Room on mobile viewport", () => {
  test("wing tablist and iframe are visible on mobile", async ({ page }) => {
    await page.goto("/loupe-room");
    const tablist = page.getByRole("tablist", { name: "Loupe Room wings" });
    await expect(tablist).toBeVisible();
    await expect(page.getByTestId("loupe-room-frame")).toBeVisible();
  });

  test("bottom mobile navigation is present on mobile", async ({ page }) => {
    await page.goto("/loupe-room");
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav).toBeVisible();
  });

  test("no floating widget obscures the wing tab controls", async ({ page }) => {
    await page.goto("/loupe-room/bench");
    const benchTab = page.getByTestId("loupe-tab-bench");
    await expect(benchTab).toBeVisible();

    // The centre of the tab must be reachable, i.e. no floating AI button,
    // toast, or overlay is sitting on top of the wing controls.
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

  test("mobile bottom nav does not overlap the wing tablist", async ({ page }) => {
    await page.goto("/loupe-room");
    const tablist = page.getByRole("tablist", { name: "Loupe Room wings" });
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    const tablistBox = await tablist.boundingBox();
    const navBox = await nav.boundingBox();
    expect(tablistBox).not.toBeNull();
    expect(navBox).not.toBeNull();
    // Tablist sits above the bottom nav, not behind it.
    expect(tablistBox!.y + tablistBox!.height).toBeLessThanOrEqual(navBox!.y + 1);
  });
});
