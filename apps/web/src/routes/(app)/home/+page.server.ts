import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session } = locals;
	if (!session) {
		redirect(303, '/error/not-signed-in');
	}
	return { session };
};
