import { test, expect, type Page } from "@playwright/test";

/**
 * Verifies the desktop SectionNav rail highlights the correct in-page
 * section as the user scrolls on institute detail and chapter routes.
 *
 * The rail is `hidden lg:block` and lives in an <aside>, keyed by
 * aria-current="location" on the active anchor. The active-section
 * logic is shared with Header/Footer (see aria-current-nav.spec.ts).
 */

const DESKTOP = { width: 1440, height: 900 };

async function expectRailActive(
  page: Page,
  railLabel: RegExp,
  expectedName: RegExp,
) {
  const nav = page.getByRole("navigation", { name: railLabel });
  const current = nav.locator('[aria-current="location"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAccessibleName(expectedName);
}

test.describe("SectionNav active highlight", () => {
  test.use({ viewport: DESKTOP });

  test("institute page rail follows the visible section", async ({ page }) => {
    await page.goto("/institutes/precious-metals", { waitUntil: "networkidle" });

    const railLabel = /In the Precious Metals Institute/i;

    // Rail is rendered on lg+ viewports.
    await expect(page.getByRole("navigation", { name: railLabel })).toBeVisible();

    await page.locator("#philosophy").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Philosophy/i);

    await page.locator("#curriculum").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Curriculum/i);

    await page.locator("#faculty").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Faculty & Outcomes/i);

    await page.locator("#inquiry").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Admissions/i);
  });

  test("chapter page rail follows the visible section", async ({ page }) => {
    await page.goto("/institutes/precious-metals/chapters/i", {
      waitUntil: "networkidle",
    });

    const railLabel = /In this chapter/i;

    await expect(page.getByRole("navigation", { name: railLabel })).toBeVisible();

    await page.locator("#overview").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Overview/i);

    await page.locator("#study").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Study/i);

    await page.locator("#next").scrollIntoViewIfNeeded();
    await expectRailActive(page, railLabel, /Continue/i);
  });
});
