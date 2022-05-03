<script lang="ts">
    import Tailwindcss from "./Tailwindcss.svelte";
    import {router} from "tinro";
    import {lobbyStore, socketStore, stateStore, userStore} from "./stores/storeLibrary";
    import {get} from "svelte/store";
    import type {LobbyJSON, PlayerJSON} from "./types/types";
    import {State} from "./types/types";

    export let id: string;

    let pions = [
        {id: 0, text: "Aucun"},
        {id: 1, text: "Boite de conserve"},
        {id: 2, text: "Terre"},
        {id: 3, text: "Plante"},
        {id: 4, text: "Grain de café"},
        {id: 5, text: "Bonnet"},
        {id: 6, text: "Papillon"},
        {id: 7, text: "Arrosoir"},
        {id: 8, text: "Nuage"},
    ];

    let availablePions: { id: number, text: string }[] = [];
    let currentPion: number = 0;


    function players_ready(): boolean {
        return $lobbyStore.players.filter(x => x.token != 0).length == $lobbyStore.players.length;
    }

    function set_token(tokenEvent: Event) {
        let tokenId = availablePions[tokenEvent.target["selectedIndex"]].id;
        $socketStore.emit("update token", tokenId);
    }

    function player_quit() {
        get(socketStore).emit("quit", () => {
            router.goto("/");
        });
    }

    function start_game() {
        get(socketStore).emit("launch game", () => {
        });
    }


    $socketStore
        .on("update lobby", (lobby: LobbyJSON) => {
            lobbyStore.set(lobby);
            userStore.set(lobby.players.find(x => x.uuid == $userStore.uuid));
        })
        .on("update gamestate", (state: State) => {
            console.log("update gamestate");
            stateStore.set(state);
            console.log(state);
            router.goto("/jeu/");
        });

    lobbyStore.subscribe(lobby => {
        availablePions = pions.filter(pion => {
            return !$lobbyStore.players.find(player => player.token != 0 && player.token === pion.id && $userStore.uuid != player.uuid && (() => {
                currentPion = pion.id;
                return true;
            })());
        });
    })

</script>

<Tailwindcss/>

<main>
    <div class="logo">
        <a href="/"> logo ici </a>
    </div>
    <button on:click={player_quit}>Quitter partie</button>
    <label for="players">Joueur-euses :</label>
    <div id="players">
        <h id="lobby_name">Lobby {id}</h>
        {#each $lobbyStore.players as player}
            <div class="player">
                <span class="gauche">{player.name}</span>
                <span class="droite">{pions[player.token].text}</span>
            </div>
        {/each}
        {#each [1, 2, 3, 4].splice(0, 4 - $lobbyStore.players.length) as i}
            <div class="player">
                <span> | </span>
            </div>
        {/each}

        <div id="choix_pion">
            <span>Choissisez un pion :</span>
            <select value={$userStore.token} on:change={set_token}>
                {#each availablePions as pion}
                    <option value={pion.id}>{pion.text}</option>
                {/each}
            </select>
        </div>


        {#if $lobbyStore, players_ready()}
            {#if $lobbyStore.owner.uuid === $userStore.uuid}
                <button aria-label="Lancer la partie" on:click={start_game}>Commencer partie</button>
            {:else}
                <button aria-label="Lancer la partie" disabled
                >En attente du début de partie
                </button
                >
            {/if}
        {:else}
            <button aria-label="Lancer la partie" disabled
            >En attente des autres joueurs
            </button
            >
        {/if}

        <footer>
            <a href="url">condition générale d'utilisation</a>
            <a href="non je déconne">Politique de cookie</a>
            <a href="Qui est tu ?">Qui sommes nous ?</a>
        </footer>
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
    width: 50%;
    border-radius: 10em;
    border: solid $gris;
	font-size: x-large;
}

#block {
	display: flex;
	flex-direction: row;
	width: 50%;
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
	border-radius: 1em;
}

.droite {
	float: right;
}

.gauche {
	float: left;
}

#choix_pion {
	background-color: $caramel;
	padding: 1em;
	margin: 1em;
	align-items: center;
	border: solid $gris 5px;
	border-radius: 1em;
}

select {
	background-color: $blanc;
	border-radius: 1em;
}

#chatbox {
    text-align:left;
    margin: 1em auto;
    padding: 1em;
    background: $blanc;
	border-radius: 1em;
    border: solid $gris;
	width: 70%;
	height: 20em;
	color: $turquoise;
}

#msg {
    width: 50%;
    border-radius: 1em;
    border: solid $gris;
	color: $turquoise;
}

#envoyer {
	width: 5em;
	border-radius: 1em;
    border: solid $gris;
	color: $turquoise;
	background-color: $blanc;
}

@media (max-width: 640px) {

	div {
		width: 100%;
	}

}
</style>
-->