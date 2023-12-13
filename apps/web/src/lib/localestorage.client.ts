// todo: enum for keys

// keep null values because local storage can be disabled
// what do we do then?

export function readFromLocalStorage(key: string): string | null {
	return window.localStorage.getItem(key);
}

export function setLocalStorage(key: string, value: string): void {
	try {
		window.localStorage.setItem(key, value);
	} catch (exception) {
		console.error(`exception in setLocalStorage for key '${key}'`, exception);
	}
}
