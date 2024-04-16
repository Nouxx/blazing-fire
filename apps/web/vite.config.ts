import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.ts'],
		mockReset: true
		// coverage: {
		// 	enabled: true,
		// 	provider: 'v8',
		// 	include: ['src/**/*.ts'],
		// 	exclude: [
		// 		'src/**/*.d.ts',
		// 		'src/lib/types',
		// 		'src/lib/database/types.ts',
		// 		'src/hooks.server.ts'
		// 	],
		// 	thresholds: {
		// 		100: true,
		// 		autoUpdate: true
		// 	}
		// }
	}
});
