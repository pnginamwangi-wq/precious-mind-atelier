import { test, expect } from "@playwright/test";

const WINGS: { path: string; src: string }[] = [
  { path: "/loupe-room", src: "/loupe-room.html" },
  { path: "/loupe-room/study", src: "/loupe-room.html" },
  { path: "/loupe-room/bench", src: "/loupe-room-training.html" },
  { path: "/loupe-room/levels", src: "/loupe-room-levels.html" },
];

test("Loupe Room appears in the primary header nav and links to /loupe-room", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Loupe Room" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/loupe-room");
});

for (const { path, src } of WINGS) {
  test(`wing route ${path} renders the Loupe Room iframe with ${src}`, async ({ page }) => {
    await page.goto(path);
    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toBeVisible();
    await expect(frame).toHaveAttribute("src", new RegExp(src.replace(/[/.]/g, "\\$&")));
  });
}
