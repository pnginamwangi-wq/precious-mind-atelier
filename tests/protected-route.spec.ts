/**
 * Protected route test for /profile.
 *
 * Verifies:
 *  1. An unauthenticated visitor is redirected away from /profile to /auth.
 *  2. An authenticated visitor lands on /profile and sees the profile UI.
 *
 * The authenticated case uses the Lovable-injected Supabase session env vars
 * (LOVABLE_BROWSER_SUPABASE_*). When no session is available in the sandbox
 * (LOVABLE_BROWSER_AUTH_STATUS !== "injected"), that case is skipped with a
 * clear message rather than reported as a failure.
 *
 * Run: bunx playwright test tests/protected-route.spec.ts
 */
import { test, expect, type BrowserContext, type Page } from "@playwright/test";

const APP_URL = process.env.APP_URL ?? "http://localhost:8080";

async function restoreSupabaseSession(context: BrowserContext, page: Page) {
  const storageKey = process.env.LOVABLE_BROWSER_SUPABASE_STORAGE_KEY;
  const sessionJson = process.env.LOVABLE_BROWSER_SUPABASE_SESSION_JSON;
  const cookiesJson = process.env.LOVABLE_BROWSER_SUPABASE_COOKIES_JSON;

  if (cookiesJson) {
    const cookies = JSON.parse(cookiesJson).map((c: Record<string, unknown>) => ({
      ...c,
      url: APP_URL,
    }));
    await context.addCookies(cookies);
  }

  await page.goto(APP_URL);
  if (storageKey && sessionJson) {
    await page.evaluate(
      ([k, v]) => window.localStorage.setItem(k as string, v as string),
      [storageKey, sessionJson],
    );
  }
}

test.describe("/profile is a protected route", () => {
  test("unauthenticated visitor is redirected to /auth", async ({ page }) => {
    await page.goto(`${APP_URL}/profile`, { waitUntil: "domcontentloaded" });
    // The _authenticated layout uses ssr:false + beforeLoad redirect,
    // so the redirect happens after hydration on the client.
    await page.waitForURL(/\/auth(\?|$)/, { timeout: 10_000 });
    expect(page.url()).toMatch(/\/auth(\?|$)/);
  });

  test("authenticated visitor lands on /profile", async ({ context, page }) => {
    test.skip(
      process.env.LOVABLE_BROWSER_AUTH_STATUS !== "injected",
      `No Supabase session in sandbox (LOVABLE_BROWSER_AUTH_STATUS=${process.env.LOVABLE_BROWSER_AUTH_STATUS ?? "unset"}). Sign in via the preview to inject one.`,
    );

    await restoreSupabaseSession(context, page);
    await page.goto(`${APP_URL}/profile`, { waitUntil: "domcontentloaded" });

    // Should NOT be bounced to /auth.
    await page.waitForLoadState("networkidle").catch(() => undefined);
    expect(page.url()).toMatch(/\/profile(\?|$)/);

    // Profile UI is visible.
    await expect(
      page.getByRole("heading", { name: /Your Academy Profile/i }),
    ).toBeVisible({ timeout: 10_000 });
  });
});
