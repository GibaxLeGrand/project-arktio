<script lang="ts">
	import {Route, router} from "tinro";
	let name_lobby: string = "XXXX";

	let pions = [
		{ id: 0, text: "Aucun" },
		{ id: 1, text: "Boite de conserve" },
		{ id: 2, text: "Terre" },
		{ id: 3, text: "Plante" },
		{ id: 4, text: "Grain de café" },
		{ id: 5, text: "Bonnet" },
		{ id: 6, text: "Papillon" },
		{ id: 7, text: "Arosoir" },
		{ id: 8, text: "Nuage" },
	];

	class Player_lobby {
		present: boolean;
		name: string;
		uuid: string;
		pion: { id: number; text: string };

		constructor(present: boolean = false, name: string = "") {
			this.present = present;
			this.name = name;
		}
	}

	// Joueur-euse local
	let player_local: Player_lobby = new Player_lobby(true, "Player 1");
	let is_lobby_owner: boolean = true;

	// Autres joueur-euses dans le lobby
	let player_1: Player_lobby = new Player_lobby();
	let player_2: Player_lobby = new Player_lobby();
	let player_3: Player_lobby = new Player_lobby();

	let players: Player_lobby[] = [player_1, player_2, player_3];

	/**
	* Fonction pour bloquer les options de pions déjà pris dans le select
	*/
		// function update_pions_occupes(){
		//   let choix_pions = document.getElementById('players').children;

		//   for(let i = 0; i++; i < choix_pions.length ){
		//     choix_pions[i].removeAttribute("disabled");
		//   }

		//   for(let player in players){
		//     choix_pions[player.pion.id+1].setAttribute("disabled", "");
		//   }
	// }
</script>

<main>
	<div class="logo">
		<img alt="logo" src="logo.png"/>
	</div>
	<button id="retour" on:click={()=>router.goto("/")}>Quitter partie</button>

	<div id="players">
		<h id="lobby_name">Lobby {name_lobby}</h>
		<label for="players">Joueur-euses :</label>

		<div class="player">
			<span class="gauche"
				>{player_local.present ? player_local.name : "---------"}</span
			>
			<span class="droite"
				>{player_local.pion ? player_local.pion.text : "---------"}</span
			>
		</div>

		<div class="player">
			<span class="gauche"
				>{player_1.present ? player_1.name : "---------"}</span
			>
			<span class="droite"
				>{player_1.present ? player_1.pion.text : "---------"}</span
			>
		</div>

		<div class="player">
			<span class="gauche"
				>{player_2.present ? player_2.name : "---------"}</span
			>
			<span class="droite"
				>{player_2.present ? player_2.pion.text : "---------"}</span
			>
		</div>

		<div class="player">
			<span class="gauche"
				>{player_3.present ? player_3.name : "---------"}</span
			>
			<span class="droite"
				>{player_3.present ? player_3.pion.text : "---------"}</span
			>
		</div>
	</div>

	<div id="choix_pion">
		<span>Choissisez un pion :</span>
		<select bind:value={player_local.pion}>
			{#each pions as pion}
				<option value={pion}>{pion.text}</option>
			{/each}
		</select>
	</div>

	{#if is_lobby_owner}
		<button aria-label="Lancer la partie">Commencer partie</button>
	{:else}
		<button aria-label="Lancer la partie" disabled>
			En attente du début de partie
		</button>
	{/if}
<!--
	<footer>
		<a href="url">condition générale d'utilisation</a>
		<a href="non je déconne">Politique de cookie</a>
		<a href="Qui est tu ?">Qui sommes nous ?</a>
	</footer>
-->
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
	width: 100vw;
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

label {
	color: $blanc;
	font-size: x-large;
}

button{
	align-items: center;
	text-align: center;
	background-color: $blanc;
	height: 6vh;
	color: $turquoise;
    margin: 2%;
    background-color: #ffffff;
    width: 50%;
    border-radius: 10em;
    border: solid $gris;
	font-size: x-large;
}

#players {
	display: flex;
	flex-direction: column;
	background-color: $caramel;
	border: solid $gris 5px;
	border-radius: 1em;
	width: 50%;
	padding: 1em;
}

.player {
	background-color: $blanc;
	padding: 1em;
	margin: 5px;
	width: 80%;
}

.droite {
	float: right;
}

.gauche {
	float: left;
}

#choix_pion {
	background-color: $blanc;
	padding: 2px;
	margin: 1em;
	align-items: center;
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

	div {
		width: 100%;
	}

}
/*
@media (max-width: 900px) {
	button, input, select, option {
		width: 60vw;
	}
}
*/
</style>
  
<!--
<style lang="scss">
	$color: #286143; // PS : c'était juste un test ou ça va servir ?
	$turquoise: #00a19a;
	$blanc: #ffffff;
	$caramel: #ffd49a;

	body {
		background-color: $turquoise;
	}

	main {
		@apply py-32;
		text-align: center;
		align-items: center;
		padding: 1em;
		margin: 0 auto;
	}

	div {
		font-family: Raleway;
		text-decoration-color: $blanc;
		background-color: $turquoise;
	}

	.logo {
		color: $blanc;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 5vh;
	}

	#players {
		background-color: $blanc;
		display: flex;
		flex-direction: column;
	}

	.player {
		background-color: $caramel;
		padding: 1em;
		margin: 5px;
	}

	.droite {
		float: right;
	}

	.gauche {
		float: left;
	}

	#choix_pion {
		background-color: $blanc;
		padding: 2px;
		margin: 1em;
		align-items: center;
	}

	button {
		color: $turquoise;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		background-color: $blanc;
		font-weight: 400;
		font-size: x-large;
		height: 7vh;
		width: 40vw;
	}

	footer {
		text-align: center;
		font-family: Raleway;
		color: $blanc;
		background-color: $turquoise;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	@media (max-width: 900px) {
		button,
		input,
		select,
		option {
			width: 60vw;
		}
	}
</style>


-->