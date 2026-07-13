import { expect, test } from "@playwright/test";

test.describe("Smelt Lab tabs and iframe navigation", () => {
  test("renders tablist with correct ARIA and default wing", async ({ page }) => {
    await page.goto("/smelt-lab");
    const tablist = page.getByRole("tablist", { name: /smelt lab wings/i });
    await expect(tablist).toBeVisible();

    const classic = page.getByRole("tab", { name: /classic bench/i });
    const immersive = page.getByRole("tab", { name: /immersive foundry/i });
    await expect(classic).toHaveAttribute("aria-selected", "true");
    await expect(immersive).toHaveAttribute("aria-selected", "false");

    const frame = page.locator("#smelt-lab-frame");
    await expect(frame).toHaveAttribute("aria-labelledby", "smelt-tab-classic");
    await expect(frame).toHaveAttribute(
      "sandbox",
      /allow-scripts.*allow-same-origin/,
    );
  });

  test("keyboard: Arrow keys move between tabs and update selection", async ({ page }) => {
    await page.goto("/smelt-lab");
    const classic = page.getByRole("tab", { name: /classic bench/i });
    await classic.focus();
    await page.keyboard.press("ArrowRight");

    const immersive = page.getByRole("tab", { name: /immersive foundry/i });
    await expect(immersive).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/wing=immersive/);

    await page.keyboard.press("ArrowLeft");
    await expect(classic).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/wing=classic|\/smelt-lab$/);
  });

  test("Home and End jump to first and last tabs", async ({ page }) => {
    await page.goto("/smelt-lab?wing=immersive");
    await page.getByRole("tab", { name: /immersive foundry/i }).focus();
    await page.keyboard.press("Home");
    await expect(page.getByRole("tab", { name: /classic bench/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.keyboard.press("End");
    await expect(
      page.getByRole("tab", { name: /immersive foundry/i }),
    ).toHaveAttribute("aria-selected", "true");
  });

  test("screen reader: live region announces wing change", async ({ page }) => {
    await page.goto("/smelt-lab");
    const live = page.getByTestId("smelt-lab-live");
    await expect(live).toHaveAttribute("aria-live", "polite");
    await expect(live).toHaveAttribute("role", "status");

    await page.getByRole("tab", { name: /immersive foundry/i }).click();
    await expect(live).toContainText(/Immersive Foundry/i);

    await page.getByRole("tab", { name: /classic bench/i }).click();
    await expect(live).toContainText(/Classic Bench/i);
  });

  test("deep link ?wing=immersive selects the immersive tab", async ({ page }) => {
    await page.goto("/smelt-lab?wing=immersive");
    await expect(
      page.getByRole("tab", { name: /immersive foundry/i }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#smelt-lab-frame")).toHaveAttribute(
      "src",
      "/smelt-lab-3d.html",
    );
  });

  test("skip-to-interactive link is keyboard reachable", async ({ page }) => {
    await page.goto("/smelt-lab");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to interactive/i });
    await expect(skip).toBeFocused();
  });

  test("focus restoration: returning to /smelt-lab restores prior focus target", async ({ page }) => {
    await page.goto("/smelt-lab");
    // Move focus to a tab so it is recorded as the last focus target.
    await page.getByRole("tab", { name: /classic bench/i }).focus();
    await expect(page.getByRole("tab", { name: /classic bench/i })).toBeFocused();

    // Navigate away and come back.
    await page.goto("/");
    await page.goto("/smelt-lab");

    await expect
      .poll(async () =>
        page.evaluate(() => document.activeElement?.getAttribute("role")),
      )
      .toBe("tab");
  });
});
