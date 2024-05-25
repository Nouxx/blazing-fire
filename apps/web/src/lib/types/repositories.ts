export type RepositoryResponse<T> =
	| { data: T; error: null }
	| { data: null; error: App.Error };
