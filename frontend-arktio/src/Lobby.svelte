<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import { router } from "tinro";
  import {
    lobbyStore,
    socketStore,
    stateStore,
    userStore,
  } from "./stores/storeLibrary";
  import { get } from "svelte/store";
  import type { LobbyJSON, PlayerJSON } from "./types/types";
  import type { State } from "./types/types";
  import { onDestroy, onMount } from "svelte";

  export let id: string;

  let pions = [
    { id: 0, text: "Aucun" },
    { id: 1, text: "Boite de conserve" },
    { id: 2, text: "Terre" },
    { id: 3, text: "Plante" },
    { id: 4, text: "Grain de café" },
    { id: 5, text: "Bonnet" },
    { id: 6, text: "Papillon" },
    { id: 7, text: "Arrosoir" },
    { id: 8, text: "Nuage" },
  ];

  let availablePions: { id: number; text: string }[] = [];
  let currentPion: number = $userStore.token;

  function players_ready(): boolean {
    return (
      $lobbyStore.players.filter((x) => x.token != 0).length ==
      $lobbyStore.players.length
    );
  }

  function set_token(tokenEvent: Event) {
    let tokenId = availablePions[tokenEvent.target["selectedIndex"]].id;
    $socketStore.emit("update token", tokenId);
  }

  function player_quit() {
    get(socketStore).emit("quit", () => {
      $userStore.token = 0;
      router.goto("/");
    });
  }

  let message: string;

  /**
   * envoie un message à la base de donnée
   */
  function send_message() {
    if (message === undefined || message === "") {
      return;
    }
    $socketStore.emit("send message", message);
    message = "";
  }

  /**
   * affiche le message dans le chat
   * // TODO vérifier que ça marche
   */
  function affiche_message(player: string, msg: string) {
    let chat_contener = document.getElementById("chatbox");
    const child = document.createElement("div");
    const player_name = $lobbyStore.players.find((x) => x.uuid === player).name;
    child.innerText = `${player_name} : ${msg}`;
    child.style.backgroundColor = "#98d1cd";
    child.style.width = "fit-content";
    child.style.height = "fit-content";
    child.style.display = "flex";
    child.style.flexDirection = "column";
    child.style.border = "solid grey";
    child.style.borderRadius = "10px";
    child.style.alignSelf = "space-around";
    child.style.marginTop = "1%";
    child.style.marginLeft = "2%";
    child.style.padding = "1%";
    chat_contener.appendChild(child);
    chat_contener.scroll({
      top: 10000,
      behavior: "smooth",
    });
  }

  function start_game() {
    get(socketStore).emit("launch game", () => {});
  }

  onMount(() => {
    $socketStore
      .on("update lobby", (lobby: LobbyJSON) => {
        console.log(lobby);
        lobbyStore.set(lobby);
        userStore.set(lobby.players.find((x) => x.uuid == $userStore.uuid));
      })
      .on("recv message", ({ player, message }) => {
        affiche_message(player, message);
      })
      .on("start turn", (state: State) => {
        console.log(state);
        stateStore.set(state);
        state.plateau.forEach((_case, index) => {
          console.log(_case.name, index);
        });
        router.goto("/jeu/");
      });

    $: {
      availablePions = pions.filter((pion) => {
        return !$lobbyStore.players.find(
          (player) =>
            player.token != 0 &&
            player.token === pion.id &&
            $userStore.uuid != player.uuid &&
            (() => {
              currentPion = pion.id;
              return true;
            })()
        );
      });
    }
  });

  onDestroy(() => {
    $socketStore.off("update lobby");
    $socketStore.off("start turn");
    $socketStore.off("recv message");
  });
</script>

<Tailwindcss />

<main>
  <button on:click={player_quit}>Quitter partie</button>
  <div id="block">
    <div id="players">
      <h2 id="lobby_name">Lobby {id}</h2>
      <label for="players">Joueur-euses :</label>
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
        <span>Choississez un pion :</span>
        <select value={$userStore.token} on:change={set_token}>
          {#each availablePions as pion}
            <option value={pion.id}>{pion.text}</option>
          {/each}
        </select>
      </div>
    </div>

    <div id="tchat">
      <div id="chatbox">
        <span>Yo</span>
      </div>
      <input name="msg" type="text" id="msg" bind:value={message} />
      <button id="envoyer" type="submit" on:click={send_message}>Envoyer</button
      >
    </div>
  </div>

  {#if ($lobbyStore, players_ready())}
    {#if $lobbyStore.owner.uuid === $userStore.uuid}
      <button aria-label="Lancer la partie" on:click={start_game}
        >Commencer partie
      </button>
    {:else}
      <button aria-label="Lancer la partie" disabled>
        En attente du début de partie
      </button>
    {/if}
  {:else}
    <button aria-label="Lancer la partie" disabled>
      En attente des autres joueurs
    </button>
  {/if}
</main>
