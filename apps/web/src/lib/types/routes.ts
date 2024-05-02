export const routes = {
	landing: '/',
	home: '/home',
	account: '/account',
	signin: '/auth/signin',
	signup: '/auth/signup',
	signupSuccess: '/auth/signup/success',
	signupPending: '/auth/signup/pending',
	signupConfirm: '/auth/confirm',
	notSignedIn: '/error/not-signed-in',
	alreadySignedIn: '/error/already-signed-in',
	signupError: '/error/signup',
	menus: '/menus'
} as const;

export const apiRoutes = {
	menus: 'api/menus'
} as const

export type Route = (typeof routes)[keyof typeof routes];
