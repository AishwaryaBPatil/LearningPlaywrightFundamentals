import { test, expect } from '@playwright/test';
test('verify page titile', async ({ page }) => {
  await page.goto("https://app.vwo.com");
  await expect(page).toHaveTitle("Login - Wingify");

})