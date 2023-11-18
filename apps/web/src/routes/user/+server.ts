// GET route to get user info from an id token
// should verify the idtoken anyway (even if the hook)
// then store it in a store svelte after fetch

export const GET = async ({ request }) => {
	// const idToken = request.headers;
	console.log(request.headers.get('cookie'));
    // get the access toke
    // get the user data from Google
    // the data from Google are not persisted in Firestore
	return new Response(JSON.stringify({ firstname: 'Clément' }), { status: 201 });
};
