export type GoogleSignInResponse = {
	client_id: string;
	credential: string;
};

export type CustomerAuthenticatedSuccessResponse = {
	email: string;
	firstName: string;
	lastName: string;
};
