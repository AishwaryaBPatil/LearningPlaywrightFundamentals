# Learning Playwright Fundamentals

A hands-on project for learning the fundamentals of [Playwright](https://playwright.dev) end-to-end testing with TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/01_Basic1/example.spec.ts
```

Run tests headed (they will be visible in the browser):

```bash
npx playwright test --headed
```

Open the HTML test report:

```bash
npx playwright show-report
```

## VS Code

The official [Playwright Test](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension adds run buttons next to each test in the Testing sidebar.

## Project Structure

```
.
├── tests/                  # Test spec files
│   ├── 01_Basic1/          # First tests: title assertions, test annotations
│   │   ├── example.spec.ts             # Verify page title on app.vwo.com
│   │   └── testAnnotation.spec.ts      # test.skip, test.only, test.fail, conditional skip
│   ├── 02_firstTest/       # Browser, context and page (BCP) concepts
│   │   ├── 2_BCP.spec.ts                # Launch browser, contexts, pages manually
│   │   ├── 3_BCP_multipleContext.spec.ts
│   │   ├── 4_BCP_multiplePages.spec.ts
│   │   ├── 5_Test_I_PW.spec.ts
│   │   ├── 6_BCP_TEST_PW.spec.ts
│   │   ├── 7_BCP_Test_Options.spec.ts
│   │   └── first_running_verify.spec.ts # First end-to-end test
│   └── 03_Locators/        # Locators: CSS, XPath, getByRole, projects
│       ├── 1_LS.spec.ts
│       ├── 2_Project_VWO_login.spec.ts
│       ├── 3_Project_3_Singup_VWO_PW_Locator.spec.ts
│       ├── 4_PW.spec.ts
│       ├── 5_refer_PW.spec.ts
│       ├── 6_GetByRole_PW.spec.ts
│       ├── 7_space_Sequence.spec.ts
│       └── xpath_functions_explained.md
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## Topics Covered

- Setting up a Playwright + TypeScript project
- Writing your first end-to-end test
- Test annotations: `skip`, `only`, `fail`, conditional skips
- Browser, BrowserContext and Page lifecycle (BCP)
- Locators: CSS selectors, XPath, `getByRole` and accessibility-based queries
- Building small projects on real apps (VWO, Katalon, The Testing Academy)
