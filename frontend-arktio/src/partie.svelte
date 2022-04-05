<!-- Script -->
<script lang="ts">
	import {router} from "tinro";

	const test = () => {
		return true;
	};

	let id_partie = "";

	function new_game() {
		id_partie = "000000";
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
		>
			<button id="creer" on:click={new_game}>Créer une partie</button>
			<input bind:value={id_partie} />
			<button id="rejoidre">Rejoidre une partie</button>
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
  