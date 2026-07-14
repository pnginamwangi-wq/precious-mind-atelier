import { expect, test } from "@playwright/test";

test.describe("Loupe Room, The Hallmark & Karat Lab wing", () => {
  test("lab tab appears in tablist with correct ARIA", async ({ page }) => {
    await page.goto("/loupe-room");
    const tablist = page.getByRole("tablist", { name: "Loupe Room wings" });
    await expect(tablist).toBeVisible();

    const labTab = page.getByTestId("loupe-tab-hallmark-karat-lab");
    await expect(labTab).toHaveAttribute("role", "tab");
    await expect(labTab).toHaveAttribute("aria-controls", "loupe-room-frame");
    await expect(labTab).toContainText(/Hallmark & Karat Lab/i);

    // Study is the default active tab
    await expect(page.getByTestId("loupe-tab-study")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(labTab).toHaveAttribute("aria-selected", "false");
  });

  test("?wing=hallmark-karat-lab deep-links to the lab iframe (search variant)", async ({ page }) => {
    await page.goto("/loupe-room?wing=hallmark-karat-lab");

    // The index route redirects the lab to /loupe-room/hallmark-karat-lab
    await expect(page).toHaveURL(/\/loupe-room\/hallmark-karat-lab$/);

    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("data-wing", "hallmark-karat-lab");
    await expect(frame).toHaveAttribute("src", "/loupe-room-hallmark-karat-lab.html");
    await expect(frame).toHaveAttribute(
      "aria-labelledby",
      "loupe-tab-hallmark-karat-lab",
    );
    await expect(page.getByTestId("loupe-tab-hallmark-karat-lab")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("/loupe-room/hallmark-karat-lab loads the dedicated route directly", async ({ page }) => {
    await page.goto("/loupe-room/hallmark-karat-lab");
    await expect(page).toHaveTitle(/Hallmark & Karat Lab/i);

    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("data-wing", "hallmark-karat-lab");
    await expect(page.getByTestId("loupe-tab-hallmark-karat-lab")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("keyboard: Arrow keys move between tabs from study to the lab", async ({ page }) => {
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
    // Selecting the lab routes to /loupe-room/hallmark-karat-lab
    await expect(page).toHaveURL(/\/loupe-room\/hallmark-karat-lab$/);
    await expect(page.getByTestId("loupe-tab-hallmark-karat-lab")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("keyboard: End key jumps to the last tab (the lab)", async ({ page }) => {
    await page.goto("/loupe-room");
    await page.getByTestId("loupe-tab-study").focus();
    await page.keyboard.press("End");
    await expect(page).toHaveURL(/\/loupe-room\/hallmark-karat-lab$/);
    await expect(page.getByTestId("loupe-tab-hallmark-karat-lab")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("keyboard: Home key returns to the first tab (study)", async ({ page }) => {
    await page.goto("/loupe-room/hallmark-karat-lab");
    await page.getByTestId("loupe-tab-hallmark-karat-lab").focus();
    await page.keyboard.press("Home");
    await expect(page.getByTestId("loupe-tab-study")).toBeFocused();
    // Study lives on /loupe-room
    await expect(page).toHaveURL(/\/loupe-room(\?|$)/);
  });

  test("clicking the lab tab moves focus into the iframe", async ({ page }) => {
    await page.goto("/loupe-room");
    await page.getByTestId("loupe-tab-hallmark-karat-lab").click();
    await expect(page).toHaveURL(/\/loupe-room\/hallmark-karat-lab$/);

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
    await page.goto("/loupe-room/hallmark-karat-lab");
    const skip = page.getByRole("link", { name: /Skip to interactive/i });
    await skip.focus();
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#loupe-room-frame");
  });

  test("iframe has hardened sandbox attributes on the lab wing", async ({ page }) => {
    await page.goto("/loupe-room/hallmark-karat-lab");
    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("sandbox", /allow-scripts/);
    await expect(frame).toHaveAttribute("sandbox", /allow-same-origin/);
    await expect(frame).toHaveAttribute("referrerpolicy", "same-origin");
    await expect(frame).toHaveAttribute("title", /Hallmark & Karat Lab/i);
  });
});
