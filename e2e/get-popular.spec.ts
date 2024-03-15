import { test } from "@playwright/test"

import { signIn } from "./methods/sign-in"

test("get popular films", async ({ page }) => {
  await signIn(page)

  // Navigate to the popular films page
  await page.goto("http://localhost:3000/")

  // Wait for the popular films to be visible
  await page.waitForSelector('h2:has-text("Popular movies")')
})
