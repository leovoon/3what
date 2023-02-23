<script lang="ts">
	import { page } from '$app/stores'
</script>

<main>
	<h1>{$page.status}: {$page.error?.message}</h1>
	<h2>
		Go back to <a href="/">Home</a>.
	</h2>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
