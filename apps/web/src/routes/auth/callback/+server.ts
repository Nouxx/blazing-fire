import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	console.log(`GET /auth/callback`);

	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
		console.log(`code (${code}) exchanged!`);
	}
	// todo: handle errors

	throw redirect(303, '/auth/signup/success');
};
