import { test } from "@playwright/test"

import { signIn } from "./methods/sign-in"

test("user can sign in", async ({ page }) => {
  await signIn(page)
})
