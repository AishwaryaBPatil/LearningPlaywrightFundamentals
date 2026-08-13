const { execSync } = require('node:child_process');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/run-spec.cjs <spec-file>');
  process.exit(1);
}

const pattern = file.replace(/\\/g, '/');
execSync(`npx playwright test "${pattern}"`, { stdio: 'inherit' });
