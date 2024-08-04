import { devices, type PlaywrightTestConfig } from '@playwright/test';

// @ts-expect-error: this configuration file can't be included in tsconfig.json since it extends the one from .svelte-kit
// thus, can't pick the "process" types from @types/node
const CI = process.env.CI;

const config: PlaywrightTestConfig = {
	outputDir: 'playwright-test-results',
	reporter: [['html', { open: CI ? 'never' : 'on-failure' }]],
	maxFailures: CI ? 0 : 1,
	workers: CI ? 1 : '100%',
	forbidOnly: !!CI,
	retries: 0,
	use: {
		trace: 'on',
		video: 'retain-on-failure',
		baseURL: 'http://localhost:3000'
	},
	timeout: CI ? 60 * 1000 : 30 * 1000,
	testDir: 'e2e',
	testMatch: /(.+\.)?(test)\.ts/,
	snapshotPathTemplate: '{testDir}/snapshots/{testFilePath}/{arg}{ext}',
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
};

export default config;
