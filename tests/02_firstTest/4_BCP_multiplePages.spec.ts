import { chromium } from "playwright";

async function multipletabs() {
    let browser = await chromium.launch({ headless: false });
    let browsercontext = await browser.newContext();

    //tab1 
    let page1 = await browsercontext.newPage();
    await page1.goto("https://app.vwo.com/#login");
    console.log("Tab 1: Dashboard");

    //tab2
    let page2 = await browsercontext.newPage();
    await page2.goto("https://app.vwo.com/#dashboard");
    console.log("Tab 2: Settings");

}
multipletabs();