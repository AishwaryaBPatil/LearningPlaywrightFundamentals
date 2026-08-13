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
npx playwright test tests/Basic1/example.spec.ts
```

Open the HTML test report:

```bash
npx playwright show-report
```

## VS Code

The official [Playwright Test](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension adds run buttons next to each test in the Testing sidebar. The Code Runner "Run Code" button is configured to run the open spec file via Playwright (see `.vscode/settings.json`).

## Project Structure

```
.
├── tests/                 # Test spec files
│   └── Basic1/
│       └── example.spec.ts
├── scripts/
│   └── run-spec.cjs       # Helper for the Code Runner "Run Code" button
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```
