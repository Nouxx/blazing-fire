import type { RequestEvent } from '@sveltejs/kit';

export type ActionFormInput = RequestEvent<Partial<Record<string, string>>, string | null>;

export function createFakeSignInFormData(email: string, password: string): FormData {
	const formDataMock = new FormData();
	formDataMock.append('email', email);
	formDataMock.append('password', password);
	return formDataMock;
}

export function createFakeActionFormRequest(form: FormData) {
	return { formData: formDataRequestMock(form) } as Request;
}

function formDataRequestMock(form: FormData) {
	return async () => {
		return new Promise<FormData>((resolve) => {
			resolve(form);
		});
	};
}
