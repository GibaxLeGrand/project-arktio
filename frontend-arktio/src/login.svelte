<!-- Script -->
<script lang="ts">
	import {connect} from "./scripts/userScripts";
	import {router} from "tinro";


	let email: string | null = null;
	let mdp: string | null = null;

	let test = true;

	function erreur() {
		test = !test;
	}
</script>


<!-- Page -->
<main>
	<div class="logo">
		<img alt="logo" src="logo.png"/>
	</div>

	<div class="boutons">
		<form
			class="connection"
			action="javascript:"
			on:submit={() => {
			connect(email, mdp);
			}}
		>
			<label for="email">Email</label>
			<input required type="email" id="email" name="email" bind:value={email} />
			<br />
			<label for="password">Mot de passe</label>
			<input
				required
				type="password"
				id="password"
				name="password"
				bind:value={mdp}
			/>

			{#if !test}
				<h1>Le mail/mot de passe n'est pas correct.</h1>
			{/if}
			<button id="entrer" type="submit">Connexion</button>
			<button id="retour" on:click={()=>router.goto("/")}>Retour</button>
		</form>
	</div>
	
</main>

<!-- CSS -->
<style lang="scss">
	$turquoise: #00a19a;
	$blanc: #ffffff;
	$framboise: #ba105a;
	$caramel: #ffd49a;
	$turquoise_clair: #98d1cd;
	$gris: #90908f;
	$gris_fonce: #2c2c2c;
	$font_arktio: Raleway;


main {
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
}


div {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: $font_arktio;
}

img {
	width: 15rem;
	height: 15rem;
	margin: 1rem;
}

form {
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 50vw;
}

label {
	color: $blanc;
	font-size: x-large;
}

h1 {
	color: $framboise;
	font-size: x-large;
	text-align: center;
}

input {
	display: inherit;
	color: $turquoise;
	text-align: center;
	background-color: $blanc;
	font-size: x-large;
	height: 5vh;
	width: 60%;
	padding: 1em;
	margin: 2%;
    border-radius: 10em;
    border: solid $gris;
}


button{
	align-items: center;
	text-align: center;
	background-color: $blanc;
	font-size: 100%;
	height: 6vh;
	color: $turquoise;
    margin: 2%;
    background-color: #ffffff;
    width: 50%;
    border-radius: 10em;
    border: solid $gris;
}

.connection {
	padding: 1em;
}

@media (max-width: 640px) {

	div, form {
		width: 100%;
	}

}

</style>
  