import { test, expect, type Page } from "@playwright/test";

/**
 * Verifies aria-current="page" tracking across the three nav surfaces
 * (Header desktop nav, Footer, MobileTabs) as the user scrolls between
 * sections and navigates by hash or by route.
 *
 * The active-nav logic lives in src/hooks/use-active-nav.ts and is
 * shared across all three components, so we assert against every
 * surface at the appropriate viewport.
 */

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 780 };

/** Wait until exactly one link inside `navSelector` reports aria-current="page" and matches `expectedName`. */
async function expectActive(
  page: Page,
  navSelector: string,
  expectedName: RegExp | string,
) {
  const nav = page.locator(navSelector);
  const current = nav.locator('[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAccessibleName(expectedName);
}

async function expectNoActive(page: Page, navSelector: string) {
  await expect(
    page.locator(`${navSelector} [aria-current="page"]`),
  ).toHaveCount(0);
}

test.describe("aria-current tracking", () => {
  test.describe("desktop Header + Footer", () => {
    test.use({ viewport: DESKTOP });

    test("scroll updates Header aria-current across sections", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "networkidle" });

      // At the very top, no section observer match yet, no hash, no matching
      // route: none of the primary nav items should claim aria-current.
      await expectNoActive(page, 'header nav[aria-label="Primary"]');

      // Scroll academy into view. IntersectionObserver uses a -40%/-50%
      // rootMargin so scrollIntoView({ block: 'center' }) reliably crosses it.
      await page.locator("#academy").scrollIntoViewIfNeeded();
      await expectActive(
        page,
        'header nav[aria-label="Primary"]',
        /Academy/i,
      );

      await page.locator("#masterclasses").scrollIntoViewIfNeeded();
      await expectActive(
        page,
        'header nav[aria-label="Primary"]',
        /Masterclasses/i,
      );

      await page.locator("#mentor").scrollIntoViewIfNeeded();
      await expectActive(
        page,
        'header nav[aria-label="Primary"]',
        /AI Mentor/i,
      );
    });

    test("hash navigation sets aria-current on Header and Footer", async ({
      page,
    }) => {
      // Direct hash deep link: use waitUntil 'load' so the browser scrolls
      // to the fragment before the IntersectionObserver fires.
      await page.goto("/#masterclasses", { waitUntil: "load" });
      await page
        .locator("#masterclasses")
        .scrollIntoViewIfNeeded();

      await expectActive(
        page,
        'header nav[aria-label="Primary"]',
        /Masterclasses/i,
      );
      await expectActive(
        page,
        'nav[aria-label="Footer"]',
        /Masterclasses/i,
      );
    });

    test("route navigation marks Institutes active in Header and Footer", async ({
      page,
    }) => {
      await page.goto("/institutes", { waitUntil: "networkidle" });

      await expectActive(
        page,
        'header nav[aria-label="Primary"]',
        /Institutes/i,
      );
      await expectActive(
        page,
        'nav[aria-label="Footer"]',
        /Institutes/i,
      );
    });

    test("nested institute route keeps Institutes active", async ({
      page,
    }) => {
      // The `startsWith(href + "/")` branch of isNavActive should still
      // treat a child route as active on the parent nav item.
      const res = await page.goto("/institutes", { waitUntil: "networkidle" });
      expect(res?.ok()).toBeTruthy();
      const firstCard = page
        .locator('a[href^="/institutes/"]')
        .first();
      if ((await firstCard.count()) > 0) {
        await firstCard.click();
        await page.waitForLoadState("networkidle");
        await expectActive(
          page,
          'header nav[aria-label="Primary"]',
          /Institutes/i,
        );
      }
    });
  });

  test.describe("MobileTabs", () => {
    test.use({ viewport: MOBILE });

    test("Home tab is active on / with no active section", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      // Ensure we are at the very top so no section is observed.
      await page.evaluate(() => window.scrollTo(0, 0));
      await expectActive(
        page,
        'nav[aria-label="Mobile navigation"]',
        /Home/i,
      );
    });

    test("scroll updates MobileTabs aria-current", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });

      await page.locator("#masterclasses").scrollIntoViewIfNeeded();
      await expectActive(
        page,
        'nav[aria-label="Mobile navigation"]',
        /Classes/i,
      );

      await page.locator("#mentor").scrollIntoViewIfNeeded();
      await expectActive(
        page,
        'nav[aria-label="Mobile navigation"]',
        /Mentor/i,
      );
    });

    test("Institutes route activates the Institutes tab", async ({ page }) => {
      await page.goto("/institutes", { waitUntil: "networkidle" });
      await expectActive(
        page,
        'nav[aria-label="Mobile navigation"]',
        /Institutes/i,
      );
  });

  test.describe("smooth scroll click updates active state immediately", () => {
    test.use({ viewport: DESKTOP });

    test("Header hash click flips aria-current before scroll settles", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "networkidle" });

      // Freeze smooth scrolling so we can assert the aria-current update
      // is driven by the router hash write, not by the scroll animation.
      await page.emulateMedia({ reducedMotion: "reduce" });

      const headerNav = page.locator('header nav[aria-label="Primary"]');
      await headerNav.getByRole("link", { name: /Masterclasses/i }).click();

      await expect(
        headerNav.locator('[aria-current="page"]'),
      ).toHaveAccessibleName(/Masterclasses/i);
      await expect(page).toHaveURL(/#masterclasses$/);
    });

    test("Footer hash click updates Footer and Header together", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.emulateMedia({ reducedMotion: "reduce" });

      const footerNav = page.locator('nav[aria-label="Footer"]');
      await footerNav.getByRole("link", { name: /Masterclasses/i }).click();

      await expect(
        footerNav.locator('[aria-current="page"]'),
      ).toHaveAccessibleName(/Masterclasses/i);
      await expect(
        page
          .locator('header nav[aria-label="Primary"]')
          .locator('[aria-current="page"]'),
      ).toHaveAccessibleName(/Masterclasses/i);
    });
  });

  test.describe("smooth scroll click on mobile", () => {
    test.use({ viewport: MOBILE });

    test("MobileTabs hash tap flips aria-current immediately", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.emulateMedia({ reducedMotion: "reduce" });

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await mobileNav.getByRole("link", { name: /Classes/i }).click();

      await expect(
        mobileNav.locator('[aria-current="page"]'),
      ).toHaveAccessibleName(/Classes/i);
      await expect(page).toHaveURL(/#masterclasses$/);
    });
  });
});
