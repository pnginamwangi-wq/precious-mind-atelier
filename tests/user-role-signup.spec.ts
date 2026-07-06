/**
 * Verifies that a `user_roles` row with role `student` is created immediately
 * on signup (via the `handle_new_user` trigger) and that the /profile page
 * reads and renders that role.
 *
 * Strategy:
 *   1. Load the app so the Supabase browser client is available.
 *   2. Sign up a fresh, unique user via supabase.auth.signUp inside the page.
 *   3. If a session is returned (auto-confirm enabled), query user_roles as
 *      that user and assert exactly one row with role='student' exists.
 *   4. Navigate to /profile and assert the role badge shows "student".
 *   5. Skip gracefully if the project requires email confirmation (no session).
 */
import { test, expect } from "@playwright/test";

const APP_URL = process.env.APP_URL ?? "http://localhost:8080";

test("signup creates a student user_roles row that /profile displays", async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: "domcontentloaded" });

  const email = `pia-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  const password = "Passw0rd!Passw0rd!";
  const displayName = "Role Test User";

  const signup = await page.evaluate(
    async ({ email, password, displayName }) => {
      const { supabase } = (await import("/src/integrations/supabase/client.ts")) as {
        supabase: import("@supabase/supabase-js").SupabaseClient;
      };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      return {
        userId: data.user?.id ?? null,
        hasSession: Boolean(data.session),
        error: error?.message ?? null,
      };
    },
    { email, password, displayName },
  );

  expect(signup.error, `signUp error: ${signup.error}`).toBeNull();
  expect(signup.userId).toBeTruthy();

  test.skip(
    !signup.hasSession,
    "Signup requires email confirmation, cannot read user_roles as this user in a test.",
  );

  // The handle_new_user trigger runs synchronously with the auth.users insert,
  // so the row should already exist. Poll briefly just in case of replica lag.
  const roles = await page.evaluate(async (userId) => {
    const { supabase } = (await import("/src/integrations/supabase/client.ts")) as {
      supabase: import("@supabase/supabase-js").SupabaseClient;
    };
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (error) return { error: error.message, rows: null as null };
      if (data && data.length > 0) return { error: null, rows: data };
      await new Promise((r) => setTimeout(r, 200));
    }
    return { error: null, rows: [] as { role: string }[] };
  }, signup.userId!);

  expect(roles.error, `user_roles query error: ${roles.error}`).toBeNull();
  expect(roles.rows).not.toBeNull();
  expect(roles.rows!.length).toBe(1);
  expect(roles.rows![0].role).toBe("student");

  // Now confirm the /profile page reads that role and renders it.
  await page.goto(`${APP_URL}/profile`, { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/profile(\?|$)/);

  const badge = page.getByTestId("user-role");
  await expect(badge).toBeVisible({ timeout: 10_000 });
  await expect(badge).toHaveText(/student/i);
});
