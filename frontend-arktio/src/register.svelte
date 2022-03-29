<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte";
	import {register} from "./scripts/userScripts";
	import {router} from "tinro";

	let email = null;
	let password = null;
	let name = null;
	let confirm_password = null;
</script>


<main>
	<div class="logo">
		<img alt="logo" src="logo.png"/>
	</div>

	<div class="boutons">
		<form
			action="javascript:"
			on:submit={() => register(name, email, password, confirm_password)}
		>
			<label for="name">Nom du joueur:</label>
			<input required type="text" id="name" name="name" bind:value={name}/>

			<label for="email">Adresse mail:</label>
			<input required type="email" id="email" name="email" bind:value={email}/>

			<label for="password">Mot de passe:</label>
			<input
				required
				type="password"
				id="password"
				name="password"
				bind:value={password}
			/>

			<label for="confirm_password">Confirmer le mot de passe:</label>
			<input
				required
				type="password"
				id="confirm_password"
				name="confirm_password"
				bind:value={confirm_password}
			/>

			<button id="validate" type="submit">S'inscrire</button>
			<button id="retour" on:click={()=>router.goto("/")}>Retour</button>
				
		</form>
	</div>

	<footer>
		<a href="/url">condition générale d'utilisation</a>
		<a href="/non je déconne">Politique de cookie</a>
		<a href="/Qui est tu ?">Qui sommes nous ?</a>
	</footer>

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

a {
	margin-inline: 1em;
	font-family: $font_arktio;
	color: $blanc;
}

footer {
	display: flex;
	bottom: 0;
	justify-content: center;
	width: 100%;
	padding: 1em;
	margin: 0 auto;
	background-color: $turquoise_clair;
}

@media (max-width: 640px) {

	div, form {
		width: 100%;
	}

}
</style>
