import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.ts'],
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }], // nasty config to make vitest run onMount() - https://github.com/vitest-dev/vitest/issues/2834
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
