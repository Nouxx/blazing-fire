export type LoginNavigationProperties = {
	title: string;
	buttonLabel: string;
	buttonLink: string;
};

type LoginNavigation = 'signIn' | 'signUp';

export const loginNavigationTypes: Record<LoginNavigation, LoginNavigationProperties> = {
	signIn: {
		title: 'Have an account already?',
		buttonLabel: 'Go to Sign In',
		buttonLink: '/auth/signin'
	},
	signUp: {
		title: "Don't have an account?",
		buttonLabel: 'Go to Sign Up',
		buttonLink: '/auth/signup'
	}
};
