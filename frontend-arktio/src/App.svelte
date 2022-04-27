<!-- Script -->
<script lang="ts">
	import {Route, router} from "tinro";
	import Login from "./login.svelte";
	import Lobby from "./Lobby.svelte";
	import Partie from "./partie.svelte";
	import Register from "./register.svelte";
	import {routerFetch} from "./scripts/fetchOverride";
	import {base} from "./stores/locationStore";
	import {get} from "svelte/store";
	import {env} from "./scripts/envfile";
	import {disconnect} from "./scripts/userScripts";
	import Regles from "./Regles.svelte";
	import Tailwindcss from "./Tailwindcss.svelte";
	import Jeu from "./Jeu.svelte";

	router.mode.hash();

	base.set(env.root)
	router.base(get(base));

	enum RULES {
		CONNECTED,
		GUEST,
	}

	let state: RULES = RULES.GUEST;

	async function isAuth() {
		const data = await routerFetch("/api/session/isAuth", {method: "GET"});
		if ((await data.json()).authenticated) {
			state = RULES.CONNECTED;
		} else {
			state = RULES.GUEST;
		}
	}

	router.subscribe(() => {
		isAuth()
	})
</script>


<!-- Page -->
<svelte:head>
	<title>Arktio</title>
	<link rel="icon" type="image/png" href="logo.png" />
	<html lang="fr"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8">
</svelte:head>

<main>
	<Route path="/">
		<div class="logo">
			<img alt="logo" src="logo.png"/>
		</div>
		<div class="boutons">
			{#if state === RULES.GUEST}
				<button
					id="connexion"
					on:click={() => {
					router.goto("/login");
					}}>Connexion
				</button>
				<button
					id="inscription"
					on:click={() => {
					router.goto("/register");
					}}>Inscription
				</button>
			{/if}
			
			{#if [RULES.CONNECTED, RULES.GUEST].includes(state)}
				<button
					id="create_join_party"
					on:click={() => {
					router.goto("/partie");
					}}>Créer / Rejoindre Partie
				</button>

			{/if}
			<button
				id="regles"
				title="afficher les règles"
				on:click={() => router.goto("/Regles")}>Règles</button
			>
			
			{#if [RULES.CONNECTED].includes(state)}
				<button
					id="disconnect"
					on:click={async () => {
					disconnect().then(isAuth);
					}}>Déconnexion
				</button>
			{/if}
		</div>

		<footer>
			<a href="https://m.facebook.com/Arktio/?locale2=fr_FR">Facebook</a>
			<a href="https://arktio.fr/">Site d'Arktio</a>
		</footer>
	</Route>

	<Route path="/login">
		<Login/>
	</Route>
	<Route path="/lobby">
		<Lobby/>
	</Route>
	<Route path="/register">
		<Register/>
	</Route>
	<Route path="/partie/">
		<Partie/>
	</Route>
	<Route path="/Regles/">
		<Regles/>
	</Route>
	<Route path="/jeu/">
		<Jeu />
	</Route>

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

button{
	align-items: center;
	text-align: center;
	background-color: $blanc;
	font-size: 100%;
	height: 6vh;
	color: $turquoise;
    margin: 2%;
    width: 50%;
<<<<<<< HEAD
    border-radius: 10em;
    border: solid $gris;
}

.boutons {
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 50vw;
	padding: 1em;
}

a {
	margin-inline: 1em;
	font-family: $font_arktio;
	color: $blanc;
}

footer {
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 0;
	width: 100vW;
	padding: 1em;
	margin: 0 auto;
	background-color: $turquoise_clair;
}

@media (max-width: 640px) {

	div {
		width: 100%;
	}

}
=======
    text-align: center;
    border-radius: 10px;
    min-width: 200px;
    border: solid rgb(150, 150, 150);
  }

  button:hover {
    background-color: rgb(41, 39, 39);
    color: $blanc;
  }

  button:active {
    background-color: rgb(150, 150, 150);
  }

  img {
    display: flex;
    align-self: center;
    height: auto;
    width: auto;
    max-width: $size;
    max-height: $size;
    margin-top: 5%;
  }
>>>>>>> main
</style>
  
-->