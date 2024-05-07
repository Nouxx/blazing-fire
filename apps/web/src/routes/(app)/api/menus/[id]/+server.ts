import { redirectIfNoSession } from '$lib/server/auth';
import { error } from '@sveltejs/kit';

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
	if (!data) {
		return new Response(JSON.stringify({ message: 'BOUFFON' }));
	}
	if (data.length > 1) {
		console.log('WTF BRO?');
	}
	const res = JSON.stringify({ name: data[0].name });
	return new Response(res);
};

export const DELETE = async ({ locals, params }) => {
	const { session, user, supabase } = locals;
	if (!session || !user) {
		error(401);
	}
	const { id } = params;
	const { error: pgError } = await supabase
		.from('menus')
		.delete()
		.eq('id', id)
		.eq('user_id', user.id);
	if (pgError) {
		error(500, { message: pgError.message, name: 'DbError' });
	}
	const res = JSON.stringify({ message: `menu ${id} has been deleted!` });
	// todo: set status (201?)
	return new Response(res);
};
