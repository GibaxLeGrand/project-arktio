<!-- Script -->
<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import {router} from "tinro";
  import {lobbyStore, socketStore} from "./stores/storeLibrary";
  import {get} from "svelte/store";
  import type {LobbyJSON} from "./types/types";

  const test = () => {
    return true;
  };

  let id_partie = "";

  function validate_input(input: string) {
    console.log(id_partie)
    // test if input is a number
    if (isNaN(Number(input))) {
        return false;
    }
    // test if number is 6 digits
    if (input.length != 6) {
      return false;
    }
    return true;
  }

  async function new_game() {
    // Create random 6 int id
    get(socketStore).emit("create lobby", ({ lobby } : { lobby: LobbyJSON }) => {
      lobbyStore.set(lobby);
      router.goto("/lobby/" + lobby.uuid);
    });
  }

  function join_game() {
    get(socketStore).emit("join lobby", id_partie, ({valid, lobby} : {valid:boolean, lobby: LobbyJSON} ) => {
      if (valid) {
        lobbyStore.set(lobby);
        router.goto("/lobby/" + lobby.uuid);
      } else {
        alert("Invalid id");
      }
    });
  }

</script>

<Tailwindcss />

<!-- Page -->
<main>
	<div class="logo">
		<img alt="logo" src="logo.png"/>
	</div>

  <div class="boutons">
    <form class="connection">
      <button id="creer" on:click={()=>new_game()}>Créer une partie</button>
      <input bind:value={id_partie} on:input|preventDefault={(event)=>validate_input(event.target["value"])} />
      <button id="rejoindre" on:click={join_game}>Rejoindre une partie</button>
      <button id="retour" on:click={()=>router.goto("/")}>Retour</button>
    </form>


  </div>
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

.connection {
	padding: 1em;
}

@media (max-width: 640px) {

	div, form {
		width: 100%;
	}

}
</style>
  -->