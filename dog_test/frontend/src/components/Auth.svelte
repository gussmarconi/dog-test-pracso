<script>
	import { authHandlers, authStore } from '../stores/authStore';

	let register = false;
	let email = '';
	let password = '';
	let confirmPassword = '';

	async function handleSubmit() {
		if (!email || !password || (register && !confirmPassword)) {
			return;
		}

		if (register && password === confirmPassword) {
			try {
				await authHandlers.signup(email, password);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await authHandlers.login(email, password);
			} catch (err) {
				console.log(err);
			}
		}
		if ($authStore.currentUser) {
			window.location.href = '/privatedashboard';
		}
	}
</script>

<div class="container">
	<h2 class="h2 mb-1">{register ? 'Register' : 'Log in'}</h2>
	<form>
		<label class="text-black">
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label class="text-black">
			<input bind:value={password} type="password" placeholder="Password" />
		</label>
		{#if register}
			<label class="text-black">
				<input bind:value={confirmPassword} type="password" placeholder="Confirm Password" />
			</label>
		{/if}
		<button class="btn variant-filled mt-2" on:click={handleSubmit}>Submit</button>
	</form>
	{#if register}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				register = false;
			}}
			on:keydown={() => {}}
		>
			Already have an account?
			<p>Log in</p>
		</div>
	{:else}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				register = true;
			}}
			on:keydown={() => {}}
		>
			<button class="my-2 hover:text-blue-500">Don't have an account? <p>Sign Up</p></button>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				authHandlers.resetPassword(email)
			}}
			on:keydown={() => {}}
		>
			<button class="hover:text-blue-500">Forgot Password?</button>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.container form {
		display: flex;
		flex-direction: column;
	}
</style>