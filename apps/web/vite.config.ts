import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': './src' // Styles in src/styles will be accessible as '@/styles/whatever.scss'
		}
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.ts'],
		mockReset: true
	},
	server: {
		port: 3000,
		strictPort: true
	}
});
