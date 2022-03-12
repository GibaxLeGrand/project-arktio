<!-- Script -->
<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte";

	const test = () => {
		return true;
	};

	let login = '';
	let mdp = '';
</script>


<Tailwindcss />


<!-- Page -->
<main>

<div class="logo">logo ici</div>

	<div class="page">
		<div class="connection">
			<p>Nom d'utilisateur</p>
			<input bind:value={login}>

			<p>Mot de passe</p>
			<input bind:value={mdp}>
		</div>

		<button id="entrer">Valider</button>
		<button id="invite">Jouer en tant qu'invité</button>
		<button id="retour">Retour</button>
	</div>

	<footer>Contacte</footer>
</main>


<!-- CSS -->
<style lang="scss">
	$turquoise: #00a19a;
	$blanc: #ffffff;
	$framboise:#ba105a;
	$caramel:#ffd49a;
	$turquoise_clair:#98d1cd;
	$gris:#90908f;
	$gris_fonce:#2c2c2c;
	$font_arktio: Raleway;

	main {
		text-align: center;
		padding: 1em ;
		margin: 0 auto;
		background-color: $turquoise;
		height: 100%;
		width: 100%;
		font-family: $font_arktio;
	}

	.logo {
		color: $blanc;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 5vh;
	}

	.page {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: space-around;
		block-size: 50vh;
	}

	.connection {
		background-color: $blanc;
		text-align: center;
		font-family: $font_arktio;
		color: $turquoise;
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 60%;
		padding: 1em;
	}

	input {
		color: $turquoise;
		display: inherit;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		background-color: $blanc;
		font-weight: 400;
		inline-size: 60vw;
		width: 60%;
		padding: 1em;
	}

	button {
		color: $turquoise;
		display: inherit;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		background-color: $blanc;
		font-weight: 400;
		inline-size: 60vw;
		width: 60%;
		padding: 1em;
	}

	footer {
		text-align: center;
		font-family: $font_arktio;
		color: $blanc;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		bottom: 0;
		position:absolute;
		padding: 1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
