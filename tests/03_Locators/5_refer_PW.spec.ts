import { test, expect } from "@playwright/test";

test("simple goto — uses load by default", async ({ page }) => {
    // No waitUntil specified — defaults to "load"
    await page.goto("https://example.com");

    let title = await page.title();
    console.log("Title:", title);

    await test.expect(page).toHaveURL("https://example.com/");
    console.log("URL verified");
});

test("nevigate to referrer url", async ({ page }) => {
    await page.goto("https://app.com/landing", {
        referer: "https://google.com/search?q=testing+academy"
    });
    console.log("Page loaded with Google as referer");
    console.log("URL:", page.url());
})