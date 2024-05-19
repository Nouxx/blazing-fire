export type RepositoryResponse<T = null> = {
	data: T | null;
	error: App.Error | null;
};
