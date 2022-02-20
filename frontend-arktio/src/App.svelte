<script lang="ts">
	import Tailwindcss from './Tailwindcss.svelte';

	const test = () => {
		return true;
	}

	export let name: string;
</script>

<Tailwindcss />
<main>
	<h1 class="">Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">

	$color: #286143;

	main {
		@apply py-32;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: $color;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
