import { fail, type ActionFailure } from '@sveltejs/kit';

/** Generic success response for form actions, sent to the frontend.
 *
 * Use this type with `satisfies Actions` in form actions files (`+page.server.ts`).
 *
 * Example usage:
 * ```
 * import type { Actions } from './$types';
 * import type { FormActionsSuccessResponse } from '$lib/server/form';
 *
 * type MyPageActionsName = 'firstAction' | 'secondAction';
 *
 * type MyPageFormActionsSuccess = FormActionsSuccessResponse<MyPageActionsName, any>;
 *
 * export const actions = {
 *     firstAction: ...
 *     secondAction: ...
 * } satisfies Actions<MyPageFormActionsSuccess>;
 * ```
 *
 * @template ActionsName - list of named actions for this `+page.server.ts`.
 * @template ResponseData - `+page.server.ts` specific data.
 */
export type FormActionsSuccessResponse<ActionsName, ResponseData> = {
	success: true;
	action: ActionsName;
	data?: ResponseData;
};

export function createFormActionsSuccessResponse<ActionsName, ResponseData>(
	actionName: ActionsName,
	data: ResponseData
): FormActionsSuccessResponse<ActionsName, ResponseData> {
	return {
		success: true,
		action: actionName,
		data
	};
}

/** Generic failure response for form actions, sent to the frontend.
 *
 * Use this type with `satisfies Actions` in form actions files (`+page.server.ts`).
 *
 * Example usage:
 * ```
 * import type { Actions } from './$types';
 * import type { FormActionsFailureResponse } from '$lib/server/form';
 *
 * type MyPageActionsName = 'firstAction' | 'secondAction';
 *
 * type MyPageFormActionsFailure = FormActionsFailureResponse<MyPageActionsName, any>;
 *
 * export const actions = {
 *     firstAction: ...
 *     secondAction: ...
 * } satisfies Actions<... | ActionFailure<MyPageFormActionsFailure>>;
 * ```
 *
 * @template ActionsName - list of named actions for this `+page.server.ts`.
 * @template ResponseData - `+page.server.ts` specific data.
 */
export type FormActionsFailureResponse<ActionsName, ResponseData> = {
	action: ActionsName;
	error: App.Error;
	data?: ResponseData;
};

export function createFormActionsFailureResponse<ActionsName, ResponseData>(
	status: number,
	response: FormActionsFailureResponse<ActionsName, ResponseData>
): ActionFailure<FormActionsFailureResponse<ActionsName, ResponseData>> {
	return fail(status, response);
}

/**
 * Returns a string value from a FormDataEntryValue.
 * If the provided value is not a string or is null, returns an empty string.
 *
 * @param value - The `FormDataEntryValue` to extract the string from.
 * @returns The string value if valid, or an empty string if the input is null or not a string.
 */
export function getString(value: FormDataEntryValue | null): string {
	return typeof value === 'string' ? value : '';
}
