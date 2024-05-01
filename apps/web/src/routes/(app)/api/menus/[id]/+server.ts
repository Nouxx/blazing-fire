import { redirectIfNoSession } from '$lib/server/auth';

export const PUT = async ({ locals, request, params }) => {
	const { session, user, supabase } = locals;
	redirectIfNoSession(session); // not sure it will redirect the user
	if (!user) {
		return new Response(null);
	}
	const { name } = await request.json();
	// todo: check if name is different? -> done in front
	// todo: sanity Check on the name?
	const { data, error } = await supabase
		.from('menus')
		.update({ name: name })
		.eq('id', params.id)
		.eq('user_id', user.id)
		.select();
	console.log('data', data);
	if (!data) {
		return new Response(JSON.stringify({ message: 'BOUFFON' }));
	}
	if (data.length > 1) {
		console.log('WTF BRO?');
	}
	const res = JSON.stringify({ name: data[0].name });
	return new Response(res);
};
