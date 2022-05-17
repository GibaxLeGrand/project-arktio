<!-- Script -->
<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import {router} from "tinro";
  import {lobbyStore, socketStore, userStore} from "./stores/storeLibrary";
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
