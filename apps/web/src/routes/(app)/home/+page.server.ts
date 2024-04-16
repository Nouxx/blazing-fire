import type { PageServerLoad } from './$types';
import { redirectIfNoSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session } = locals;
	redirectIfNoSession(session);
};
