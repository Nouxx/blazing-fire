import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	reporter: [['html', { open: process.env.CI ? 'never' : 'on-failure' }]],
	retries: 0,
	use: {
		trace: 'retain-on-failure',
		video: 'retain-on-failure'
	},
	webServer: {
		command: 'npm run build -- --mode playwright && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
