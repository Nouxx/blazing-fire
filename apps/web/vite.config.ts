import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.ts'],
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src'],
			thresholds: {
				100: true,
				autoUpdate: true
			}
		}
	}
});
