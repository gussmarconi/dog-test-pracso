<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import AuthReset from '../components/AuthReset.svelte';
	import { auth } from '../lib/firebase/firebase.client';
	import { browser } from '$app/environment';
	import { authHandlers, authStore } from '../stores/authStore';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let email;
	authStore.subscribe((curr) => {
		console.log('CURR', curr);
		email = curr?.currentUser?.email;
	});

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log(user);
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});

			if (
				browser &&
				!$authStore?.currentUser &&
				!$authStore.isLoading &&
				window.location.pathname !== '/'
			) {
				window.location.href = '/';
				console.log(authStore.currentUser, authStore.isLoading);
			}
		});
		return unsubscribe;
	});
</script>

<div class="flex flex-col">
	<div class="">
		{#if $authStore.currentUser}
			<div class="flex justify-end">
				<div>
					<h1>CURRENT USER: {email}</h1>
					<AuthReset />
					<button on:click={authHandlers.logout}>Logout</button>
				</div>
			</div>
		{:else}
			<div>Loading....</div>
		{/if}
	</div>
	<div class="">
		<slot />
	</div>
</div>
