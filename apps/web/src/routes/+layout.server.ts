import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getUserSession } }) => {
	const { session, user } = await getUserSession();
	return {
		session,
		user
	};
};
