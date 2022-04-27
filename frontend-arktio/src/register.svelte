<script lang="ts">
	import {register} from "./scripts/userScripts";
	import {router} from "tinro";
	import Tailwindcss from "./Tailwindcss.svelte";

	let email = null;
	let password = null;
	let name = null;
	let confirm_password = null;
	let mail_exist = false;

	function erreur() {
		mail_exist = !mail_exist;
	}

	let same_psw = true;
	function test_psw() {
		same_psw = password == confirm_password;
	}

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
			
			{#if mail_exist}
				<h1>Ce mail à déjà était utilisé.</h1>
			{/if}

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

			{#if !same_psw}
				<h1>Les deux mots de passe ne sont pas identique.</h1>
			{/if}

			<button id="validate" type="submit" on:click={test_psw}>S'inscrire</button>
			<button id="retour" on:click={()=>router.goto("/")}>Retour</button>
				
		</form>
	</div>
	<Tailwindcss/>
	
</main>

<!-- CSS 
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

h1 {
	color: $framboise;
	font-size: x-large;
	text-align: center;
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

@media (max-width: 640px) {

	div, form {
		width: 100%;
	}

}
</style>
-->