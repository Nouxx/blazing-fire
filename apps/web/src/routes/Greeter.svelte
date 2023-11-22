<script lang="ts">
	import { userInformation, type UserInformation } from '$lib/stores/user-store';
	import { jwtDecode } from 'jwt-decode';

	export let idToken: string | undefined;

	function getUserInformation(idToken: string | undefined): UserInformation | undefined {
		if (!idToken) {
			return undefined;
		}
		if ($userInformation === null) {
			const decoded = jwtDecode(idToken);
			const userInfo: UserInformation = {
				firstName: decoded.given_name,
				lastName: decoded.family_name
			};
			userInformation.set(userInfo);
			return userInfo;
		}
		return $userInformation;
	}

	const userInfo = getUserInformation(idToken);
</script>

<span class="text-xl font-serif font-bold text-slate-900">
	Hello,
	{#if userInfo}
		{userInfo.firstName}.
	{:else}
		you.
	{/if}
</span>
