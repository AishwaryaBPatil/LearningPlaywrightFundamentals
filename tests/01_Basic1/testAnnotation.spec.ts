import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);

});

//skip test
test.skip('this test is skipped', async ({ page }) => {
    //this test is skipped
});

//only run this test
test.only('this test only runs', async ({ page }) => {
    //if you wanted to run this test only
});

//expect to fail test
test.fail('expect to  fail', async ({ page }) => {
    //this test fails
});


// Conditional skip
test('conditional', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Not supported in Firefox');
});