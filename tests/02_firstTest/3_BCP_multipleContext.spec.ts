import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('multiple contexts', async () => {
    let browser = await chromium.launch({ headless: false });
    let adminContext = await browser.newContext();
    let adminpage = await adminContext.newPage();
    await adminpage.goto("https://app.vwo.com/login");
    console.log("Admin: on login page");

    // Viewer
    let viewerContext = await browser.newContext();
    let viewerPage = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer: on login page");

    await adminContext.close();
    await viewerContext.close();
    await browser.close();
});