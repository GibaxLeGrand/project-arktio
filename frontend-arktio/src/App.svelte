<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";

  let pions =[ 
    {id: 0, text: "Aucun"},
    {id: 1, text: "Boite de conserve"},
    {id: 2, text: "Terre"},
    {id: 3, text: "Plante"},
    {id: 4, text: "Grain de café"},
    {id: 5, text: "Bonnet"},
    {id: 6, text: "Papillon"},
    {id: 0, text: "Arosoir"},
    {id: 0, text: "Nuage"}
]
  let pion_selectionne;

  class Player_lobby{
    present: boolean;
    name: string;
    pion: number;

    constructor(present:boolean = false, name: string = ""){
      this.present = present;
      this.name = name;
    }

    set_pion(_pion: number){this.pion = _pion;}
  }

  let name_lobby: string = "XXXX";

  // Joueur-euse local
  let player_local: Player_lobby = new Player_lobby(true, "Honeyxilia");
  let is_lobby_owner: boolean = false;

  // Autres joueur-euses dans le lobby 
  let player_1: Player_lobby = new Player_lobby();
  let player_2: Player_lobby = new Player_lobby();
  let player_3: Player_lobby = new Player_lobby();

  let players = [player_1, player_2, player_3];

</script>

<Tailwindcss />

<main>
<div class="logo">logo ici</div>

<h id="lobby_name">Lobby {name_lobby}</h>
<label for="players">Joueur-euses :</label>  
<div id="players">
        <div class="player">{player_local.present ? player_local.name : "---------"} </div>
        <div class="player">{player_1.present ? player_1.name : "---------"} </div>
        <div class="player">{player_2.present ? player_1.name : "---------"} </div>
        <div class="player">{player_3.present ? player_1.name : "---------"} </div>
</div>

  <select id="select_pion" bind:value ={pion_selectionne} on:change="{() => player_local.pion = pion_selectionne.id}">
    {#each pions as pion}
      <option value={pion}>{pion.text}</option>
    {/each}
  </select>
  <p>Pion selectionné : {pion_selectionne ? pion_selectionne.text : "Aucun"}</p>
   

  {#if is_lobby_owner}
    <button aria-label="Lancer la partie" class="boutons">Commencer partie</button>
  {:else}
    <button aria-label="Lancer la partie" class="boutons" disabled>En attente du début de partie</button>
  {/if}

  <footer>this is the footer</footer>
</main>

<style lang="scss">
  $color: #286143; // PS : c'était juste un test ou ça va servir ?
  $turquoise: #00a19a;
  $blanc: #ffffff;
  $caramel: #ffd49a;

  main {
    @apply py-32;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  body {
    background-color: $turquoise;
  } // TODO pourquoi ça marche pas ça ?

  div {
    font-family: Raleway;
    text-decoration-color: $blanc;
    background-color: $turquoise;
  }

  h1 {
    color: $turquoise;
    text-decoration-color: $blanc;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .logo {
    color: $blanc;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5vh;
  }

  #players{
    color: $caramel;
  }

  .select_pion{
    display: flex;
    flex-direction: row;
  }

  .boutons {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    color: $blanc;
    block-size: 50vh;
  }

  button {
    color: $turquoise;
    display: inherit;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    background-color: $blanc;
    font-weight: 400;
    inline-size: 60vw;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
