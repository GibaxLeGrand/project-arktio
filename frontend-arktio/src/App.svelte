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
                <!-- // TODO fix chemin pour créer partie -->

			{/if}
			<button id="regles" title="afficher les règles">Règles</button>
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
			<a href="url">Condition générale d'utilisation</a>
			<a href="non je déconne">Politique de cookie</a>
			<a href="Qui est tu ?">Qui sommes nous ?</a>
		</footer>

	</Route>
	<Route path="/login">
		<!--<Login/>-->
		<Lobby/>
	</Route>
	<Route path="/lobby">
		<Lobby/>
		<!-- TODO peut être comme partie avec /:id -->
	</Route>
	<Route path="/register">
		<Register/>
	</Route>
	<Route path="/partie/">
		<Partie/>
	</Route>
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
	bottom: 0;
	justify-content: center;
	width: 100%;
	padding: 1em;
	margin: 0 auto;
	background-color: $turquoise_clair;
}


/*
#rejoindre_creer_partie {
	visibility: hidden;
}
*/

@media (max-width: 640px) {

	div {
		width: 100%;
	}

}
</style>
  
