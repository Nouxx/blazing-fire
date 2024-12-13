import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { routes } from '$lib/const/routes';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = locals;

	if (!session || !user) {
		redirect(303, routes.notSignedIn); // todo: refacto
	}
};
