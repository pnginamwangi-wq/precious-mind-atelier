import { expect, test } from "@playwright/test";

test.describe("Loupe Room, Level Training wing", () => {
  test("levels tab appears in tablist with correct ARIA", async ({ page }) => {
    await page.goto("/loupe-room");
    const tablist = page.getByRole("tablist", { name: "Loupe Room wings" });
    await expect(tablist).toBeVisible();

    const levelsTab = page.getByTestId("loupe-tab-levels");
    await expect(levelsTab).toHaveAttribute("role", "tab");
    await expect(levelsTab).toHaveAttribute("aria-controls", "loupe-room-frame");
    await expect(levelsTab).toContainText(/Level Training/i);

    // Study is the default active tab
    await expect(page.getByTestId("loupe-tab-study")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(levelsTab).toHaveAttribute("aria-selected", "false");
  });

  test("?wing=levels deep-links to the levels iframe (search variant)", async ({ page }) => {
    await page.goto("/loupe-room?wing=levels");

    // The index route redirects levels to /loupe-room/levels
    await expect(page).toHaveURL(/\/loupe-room\/levels$/);

    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("data-wing", "levels");
    await expect(frame).toHaveAttribute("src", "/loupe-room-levels.html");
    await expect(frame).toHaveAttribute(
      "aria-labelledby",
      "loupe-tab-levels",
    );
    await expect(page.getByTestId("loupe-tab-levels")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("/loupe-room/levels loads the dedicated route directly", async ({ page }) => {
    await page.goto("/loupe-room/levels");
    await expect(page).toHaveTitle(/Level Training/i);

    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("data-wing", "levels");
    await expect(page.getByTestId("loupe-tab-levels")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("keyboard: Arrow keys move between tabs from study to levels", async ({ page }) => {
    await page.goto("/loupe-room");
    const studyTab = page.getByTestId("loupe-tab-study");
    await studyTab.focus();
    await expect(studyTab).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("loupe-tab-bench")).toBeFocused();
    await expect(page.getByTestId("loupe-tab-bench")).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await page.keyboard.press("ArrowRight");
    // Selecting levels routes to /loupe-room/levels
    await expect(page).toHaveURL(/\/loupe-room\/levels$/);
    await expect(page.getByTestId("loupe-tab-levels")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("keyboard: End key jumps to the last tab (levels)", async ({ page }) => {
    await page.goto("/loupe-room");
    await page.getByTestId("loupe-tab-study").focus();
    await page.keyboard.press("End");
    await expect(page).toHaveURL(/\/loupe-room\/levels$/);
    await expect(page.getByTestId("loupe-tab-levels")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("keyboard: Home key returns to the first tab (study)", async ({ page }) => {
    await page.goto("/loupe-room/levels");
    await page.getByTestId("loupe-tab-levels").focus();
    await page.keyboard.press("Home");
    await expect(page.getByTestId("loupe-tab-study")).toBeFocused();
    // Study lives on /loupe-room
    await expect(page).toHaveURL(/\/loupe-room(\?|$)/);
  });

  test("clicking the levels tab moves focus into the iframe", async ({ page }) => {
    await page.goto("/loupe-room");
    await page.getByTestId("loupe-tab-levels").click();
    await expect(page).toHaveURL(/\/loupe-room\/levels$/);

    const frame = page.getByTestId("loupe-room-frame");
    // Wait for iframe load, then verify our focus effect targeted it.
    await frame.waitFor();
    // Allow the load listener to run.
    await page.waitForTimeout(300);
    const activeIsIframe = await page.evaluate(
      () => document.activeElement?.tagName === "IFRAME",
    );
    expect(activeIsIframe).toBe(true);
  });

  test("skip-to-interactive link is keyboard reachable and targets the iframe", async ({
    page,
  }) => {
    await page.goto("/loupe-room/levels");
    const skip = page.getByRole("link", { name: /Skip to interactive/i });
    await skip.focus();
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#loupe-room-frame");
  });

  test("iframe has hardened sandbox attributes on the levels wing", async ({ page }) => {
    await page.goto("/loupe-room/levels");
    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("sandbox", /allow-scripts/);
    await expect(frame).toHaveAttribute("sandbox", /allow-same-origin/);
    await expect(frame).toHaveAttribute("referrerpolicy", "same-origin");
    await expect(frame).toHaveAttribute("title", /Level Training/i);
  });
});
