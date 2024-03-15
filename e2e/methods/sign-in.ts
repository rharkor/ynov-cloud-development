import { expect, Page } from "@playwright/test"

const HOME_PAGE_URL = "http://localhost:3000"
const SIGN_IN_PAGE_URL = "http://localhost:3000/sign-in"
const EMAIL_SELECTOR = 'input[name="email"]'
const PASSWORD_SELECTOR = 'input[name="password"]'
const SUBMIT_BUTTON_SELECTOR = 'button[type="submit"]'

export const signIn = async (page: Page) => {
  // Navigate to the signin page
  await page.goto(SIGN_IN_PAGE_URL)

  // Fill in the email and password fields
  await page.fill(EMAIL_SELECTOR, "test@mail.com")
  await page.fill(PASSWORD_SELECTOR, "Azerty123!")

  // Click the submit button
  await page.click(SUBMIT_BUTTON_SELECTOR)

  // Wait for navigation to complete or for success indicator to be visible
  await expect(page).toHaveURL(HOME_PAGE_URL)
}
