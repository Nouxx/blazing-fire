import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	// @ts-expect-error: this configuration file can't be included in tsconfig.json
	// since it extends the one from .svelte-kit, and thus, can't pick the process types from @types/node
	reporter: [['html', { open: process.env.CI ? 'never' : 'on-failure' }]],
	retries: 0,
	maxFailures: 1,
	use: {
		trace: 'retain-on-failure',
		video: 'retain-on-failure',
		baseURL: 'http://localhost:4173'
	},
	timeout: 10000,
	expect: {
		toHaveScreenshot: { maxDiffPixelRatio: 0.09 }
	},
	webServer: [
		{
			command: 'pnpm build -- --mode local && pnpm preview',
			url: 'http://localhost:4173',
			reuseExistingServer: true
		},
		{
			command: 'pnpm supa:start',
			url: 'http://localhost:54323',
			reuseExistingServer: true
		}
	],
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
