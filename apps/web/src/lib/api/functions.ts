export function extractCodeFromUrl(url: URL): string | null {
	return url.searchParams.get('code');
}

export function getHttpStatusOrDefault(status: number | undefined): number {
	return status ?? 500;
}
