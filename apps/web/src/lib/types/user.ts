export type UserDao = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
};

export type User = {
	userId: string;
	auth: 'google';
};

export function mapToUser(userDao: UserDao): User {
	return {
		userId: userDao.sub,
		auth: 'google'
	};
}
