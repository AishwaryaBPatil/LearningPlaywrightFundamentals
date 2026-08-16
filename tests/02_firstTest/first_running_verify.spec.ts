import { test, expect } from '@playwright/test';
test('verify our first testcase', async ({ page }) => {
    await page.goto("https://app.vwo.com");
    await expect(page).toHaveTitle('Login - Wingify');
    const logo = await page.locator('#vow-login-logo');
    await expect(logo).toBeVisible();

})