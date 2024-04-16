import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { routes } from '$lib/types/routes';

export const load: PageServerLoad = async ({ parent, locals }) => {
	// todo: create a function for the redirect logic
	await parent();
	const { session } = locals;
	if (!session) {
		redirect(303, routes.notSignedIn);
	}
	return { session };
};
