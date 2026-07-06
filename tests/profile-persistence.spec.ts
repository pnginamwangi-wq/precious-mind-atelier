import { test, expect } from "@playwright/test";

/**
 * End-to-end persistence test for /profile.
 *
 * Signs the browser in with the sandbox-injected Supabase session, edits
 * the Headline field with a timestamped value, saves, reloads, and
 * asserts the new value comes back from the database.
 *
 * Requires `LOVABLE_BROWSER_AUTH_STATUS=injected` (the user is signed
 * into the preview). If the sandbox has no session, the test is skipped
 * with a clear message rather than failing.
 */

const AUTH_STATUS = process.env.LOVABLE_BROWSER_AUTH_STATUS;
const STORAGE_KEY = process.env.LOVABLE_BROWSER_SUPABASE_STORAGE_KEY;
const SESSION_JSON = process.env.LOVABLE_BROWSER_SUPABASE_SESSION_JSON;
const COOKIES_JSON = process.env.LOVABLE_BROWSER_SUPABASE_COOKIES_JSON;

test.describe("/profile persistence", () => {
  test.skip(
    AUTH_STATUS !== "injected" || !STORAGE_KEY || !SESSION_JSON,
    `Requires an injected Supabase session (LOVABLE_BROWSER_AUTH_STATUS=${AUTH_STATUS ?? "unset"}). Sign in via the Lovable preview and re-run.`,
  );

  test("edit Headline, save, reload, value persists", async ({
    page,
    context,
    baseURL,
  }) => {
    // Restore the sandbox-managed Supabase session so the protected
    // /profile route lets us in. Cookies handle SSR clients (@supabase/ssr);
    // localStorage handles the classic browser client.
    if (COOKIES_JSON) {
      const cookies = JSON.parse(COOKIES_JSON) as Array<Record<string, unknown>>;
      const url = baseURL ?? "http://localhost:8080";
      await context.addCookies(
        cookies.map((c) => ({ ...c, url })) as Parameters<
          typeof context.addCookies
        >[0],
      );
    }

    await page.goto("/");
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, value),
      { key: STORAGE_KEY!, value: SESSION_JSON! },
    );

    await page.goto("/profile", { waitUntil: "networkidle" });

    // Wait for the form to hydrate: the Loader2 spinner is gone and the
    // Headline input is present.
    const headline = page.getByLabel(/Headline/i);
    await expect(headline).toBeVisible({ timeout: 15_000 });

    const stamp = `Playwright headline ${Date.now()}`;
    await headline.fill(stamp);

    await page
      .getByRole("button", { name: /^Save changes$/ })
      .click();

    // Sonner "Profile updated" toast confirms the upsert resolved.
    await expect(page.getByText(/Profile updated/i)).toBeVisible({
      timeout: 10_000,
    });

    // Hard reload to force a fresh Supabase read, not just React state.
    await page.reload({ waitUntil: "networkidle" });

    const headlineAfter = page.getByLabel(/Headline/i);
    await expect(headlineAfter).toBeVisible({ timeout: 15_000 });
    await expect(headlineAfter).toHaveValue(stamp);
  });
});
