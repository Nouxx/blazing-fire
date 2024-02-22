export function extractCodeFromUrl(url: URL): string | null {
	return url.searchParams.get('code');
}
