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

  test.describe("keyboard navigation flips aria-current", () => {
    /**
     * Focuses the given link inside `navSelector` by Tabbing from the top
     * of the document. Uses a bounded loop so a stray focus trap fails the
     * test loudly instead of hanging.
     */
    async function tabToLink(
      page: Page,
      navSelector: string,
      name: RegExp,
      maxTabs = 60,
    ) {
      const target = page.locator(navSelector).getByRole("link", { name });
      await target.waitFor({ state: "visible" });
      // Reset focus to the document start so Tab order is deterministic.
      await page.evaluate(() => {
        (document.activeElement as HTMLElement | null)?.blur?.();
        window.scrollTo(0, 0);
      });
      for (let i = 0; i < maxTabs; i++) {
        await page.keyboard.press("Tab");
        const focused = await target.evaluate(
          (el) => el === document.activeElement,
        );
        if (focused) return;
      }
      throw new Error(
        `Could not reach link "${name}" inside ${navSelector} within ${maxTabs} Tab presses`,
      );
    }

    test.describe("desktop Header + Footer", () => {
      test.use({ viewport: DESKTOP });

      test("Enter on Header hash link sets aria-current on Header and Footer", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });

        await tabToLink(
          page,
          'header nav[aria-label="Primary"]',
          /Masterclasses/i,
        );
        await page.keyboard.press("Enter");

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
        await expect(page).toHaveURL(/#masterclasses$/);
      });

      test("Enter on Footer route link marks Institutes active on Header and Footer", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });

        // Footer sits far down; scroll it into view first so its links
        // are focusable and reachable via Tab.
        await page.locator('nav[aria-label="Footer"]').scrollIntoViewIfNeeded();
        await tabToLink(
          page,
          'nav[aria-label="Footer"]',
          /Institutes/i,
        );
        await page.keyboard.press("Enter");
        await page.waitForURL(/\/institutes$/);

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
    });

    test.describe("MobileTabs", () => {
      test.use({ viewport: MOBILE });

      test("Enter on MobileTabs hash link flips aria-current", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });

        const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
        await tabToLink(page, 'nav[aria-label="Mobile navigation"]', /Classes/i);
        await page.keyboard.press("Enter");

        await expect(
          mobileNav.locator('[aria-current="page"]'),
        ).toHaveAccessibleName(/Classes/i);
        await expect(page).toHaveURL(/#masterclasses$/);
      });

      test("Enter on MobileTabs route link activates Institutes tab", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });

        await tabToLink(
          page,
          'nav[aria-label="Mobile navigation"]',
          /Institutes/i,
        );
        await page.keyboard.press("Enter");
        await page.waitForURL(/\/institutes$/);

        await expectActive(
          page,
          'nav[aria-label="Mobile navigation"]',
          /Institutes/i,
        );
      });
    });
  });



  test.describe("hash-only URL changes keep aria-current consistent", () => {
    /**
     * Rewrites just the URL hash (no scroll, no click) and waits for the
     * router to reflect it. This isolates the hash-driven branch of
     * isNavActive from IntersectionObserver and click handlers, so we can
     * assert every nav surface stays in lockstep with location.hash.
     */
    async function setHash(page: Page, hash: string) {
      await page.evaluate((h) => {
        window.history.replaceState(null, "", h);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }, hash);
      await expect(page).toHaveURL(new RegExp(`${hash.replace("#", "\\#")}$`));
    }

    test.describe("desktop Header + Footer", () => {
      test.use({ viewport: DESKTOP });

      test("hash change updates Header and Footer together", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        // Freeze motion and pin scroll so the section observer cannot
        // race the hash update.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.evaluate(() => window.scrollTo(0, 0));

        await setHash(page, "#masterclasses");
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

        await setHash(page, "#mentor");
        await expectActive(
          page,
          'header nav[aria-label="Primary"]',
          /AI Mentor/i,
        );
        await expectActive(page, 'nav[aria-label="Footer"]', /AI Mentor/i);
      });

      test("clearing the hash removes aria-current from hash items", async ({
        page,
      }) => {
        await page.goto("/#masterclasses", { waitUntil: "load" });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.evaluate(() => window.scrollTo(0, 0));

        // Replace to a bare "/" with no hash. No section should stay active.
        await page.evaluate(() => {
          window.history.replaceState(null, "", "/");
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        });
        await expect(page).toHaveURL(/\/$/);

        // Neither Header nor Footer expose a "Home" link, so with no
        // hash and no observed section every hash item should drop
        // aria-current entirely.
        await expectNoActive(page, 'header nav[aria-label="Primary"]');
        await expectNoActive(page, 'nav[aria-label="Footer"]');


      });
    });

    test.describe("MobileTabs", () => {
      test.use({ viewport: MOBILE });

      test("hash change flips MobileTabs aria-current", async ({ page }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.evaluate(() => window.scrollTo(0, 0));

        const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');

        await page.evaluate(() => {
          window.history.replaceState(null, "", "#masterclasses");
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        });
        await expect(page).toHaveURL(/#masterclasses$/);
        await expect(
          mobileNav.locator('[aria-current="page"]'),
        ).toHaveAccessibleName(/Classes/i);

        await page.evaluate(() => {
          window.history.replaceState(null, "", "#mentor");
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        });
        await expect(page).toHaveURL(/#mentor$/);
        await expect(
          mobileNav.locator('[aria-current="page"]'),
        ).toHaveAccessibleName(/Mentor/i);
      });
    });

    test.describe("all three surfaces agree", () => {
      // Header + Footer are visible together on desktop; MobileTabs is
      // hidden by `lg:hidden`. We assert Header/Footer here and mirror
      // the same hash on a mobile viewport to cover MobileTabs.
      test("desktop Header and Footer report the same active item", async ({
        page,
      }) => {
        await page.setViewportSize(DESKTOP);
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.evaluate(() => window.scrollTo(0, 0));

        // Only hashes that map to a link in BOTH Header and Footer.
        // Footer has no #academy link, so it is not included here.
        for (const [hash, name] of [
          ["#masterclasses", /Masterclasses/i],
          ["#mentor", /AI Mentor/i],
        ] as const) {

          await page.evaluate((h) => {
            window.history.replaceState(null, "", h);
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }, hash);
          await expectActive(
            page,
            'header nav[aria-label="Primary"]',
            name,
          );
          await expectActive(page, 'nav[aria-label="Footer"]', name);
        }
      });
    });
  });

  test.describe("at most one aria-current per nav surface", () => {

    /**
     * Asserts that `navSelector` contains 0 or 1 links with
     * aria-current="page". More than one active item would mean
     * assistive tech reports the user is on multiple pages at once,
     * which is invalid ARIA and confuses screen reader landmarks.
     */
    async function expectAtMostOneActive(page: Page, navSelector: string) {
      const count = await page
        .locator(`${navSelector} [aria-current="page"]`)
        .count();
      expect(
        count,
        `expected at most one aria-current="page" inside ${navSelector}, got ${count}`,
      ).toBeLessThanOrEqual(1);
    }

    async function sweepStates(
      page: Page,
      navSelectors: string[],
      states: Array<() => Promise<void>>,
    ) {
      for (const enter of states) {
        await enter();
        for (const sel of navSelectors) {
          await expectAtMostOneActive(page, sel);
        }
      }
    }

    test.describe("desktop Header + Footer", () => {
      test.use({ viewport: DESKTOP });

      test("stays at <=1 active across scroll, hash, and route transitions", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });

        const surfaces = [
          'header nav[aria-label="Primary"]',
          'nav[aria-label="Footer"]',
        ];

        await sweepStates(page, surfaces, [
          // Top of home, no hash, no observed section.
          async () => {
            await page.evaluate(() => window.scrollTo(0, 0));
          },
          // Scroll through each observable section.
          async () => {
            await page.locator("#academy").scrollIntoViewIfNeeded();
          },
          async () => {
            await page.locator("#masterclasses").scrollIntoViewIfNeeded();
          },
          async () => {
            await page.locator("#mentor").scrollIntoViewIfNeeded();
          },
          // Hash-only update, no scroll.
          async () => {
            await page.evaluate(() => {
              window.scrollTo(0, 0);
              window.history.replaceState(null, "", "#library");
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            });
          },
          // Route change to a separate top-level page.
          async () => {
            await page.goto("/institutes", { waitUntil: "networkidle" });
          },
          // Route change to an unrelated page with no matching nav item.
          async () => {
            await page.goto("/governance", { waitUntil: "networkidle" });
          },
        ]);
      });
    });

    test.describe("MobileTabs", () => {
      test.use({ viewport: MOBILE });

      test("stays at <=1 active across scroll, hash, and route transitions", async ({
        page,
      }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.emulateMedia({ reducedMotion: "reduce" });

        const surfaces = ['nav[aria-label="Mobile navigation"]'];

        await sweepStates(page, surfaces, [
          async () => {
            await page.evaluate(() => window.scrollTo(0, 0));
          },
          async () => {
            await page.locator("#masterclasses").scrollIntoViewIfNeeded();
          },
          async () => {
            await page.locator("#mentor").scrollIntoViewIfNeeded();
          },
          async () => {
            await page.locator("#library").scrollIntoViewIfNeeded();
          },
          async () => {
            await page.evaluate(() => {
              window.scrollTo(0, 0);
              window.history.replaceState(null, "", "#masterclasses");
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            });
          },
          async () => {
            await page.goto("/institutes", { waitUntil: "networkidle" });
          },
          async () => {
            await page.goto("/governance", { waitUntil: "networkidle" });
          },
        ]);
      });
    });
  });
});



