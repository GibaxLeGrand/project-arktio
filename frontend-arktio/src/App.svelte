<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";

  enum Pions{
    Aucun,
    Boite_conserve,
    Terre,
    Plante,
    Grain_cafe,
    Bonnet,
    Papillon,
    Arosoir,
    Nuage
  }

  class Player_lobby{
    present: boolean;
    name: string;
    pion: Pions;

    constructor(present:boolean = false, name: string = "", pion: Pions = Pions.Aucun){
      this.present = present;
      this.name = name;
      this.pion = pion;
    }
  }

  let name_lobby: string = "XXXX";

  // Joueur-euse local
  let player_local: Player_lobby = new Player_lobby();
  let is_lobby_owner: boolean = false;

  // Autres joueur-euses dans le lobby 
  let player_1: Player_lobby = new Player_lobby();
  let player_2: Player_lobby = new Player_lobby();
  let player_3: Player_lobby = new Player_lobby();

</script>

<Tailwindcss />

<main>
<div class="logo">logo ici</div>

<h id="lobby_name">Lobby {name_lobby}</h>
<label for="players">Joueur-euses :</label>  
<div id="players">
        <div class="player">{player_local.name}</div>
        <div class="player">{player_1.name} </div>
        <div class="player">{player_2.name} </div>
        <div class="player">{player_3.name} </div>
</div>

  <form id="select_pion">
    <input type="radio" id="boite-conserve" value="boite-conserve">
    <label for="boite-conserve">Boite de conserve.</label>
    <input type="radio" id="terre" value="terre">
    <label for="terre">Terre.</label>
    <input type="radio" id="plante" value="plante">
    <label for="plante">Plante.</label>
    <input type="radio" id="grain-cafe" value="grain-cafe">
    <label for="grain-cafe">Grain de cafe.</label> <br>

    <input type="radio" id="bonnet" value="bonnet">
    <label for="bonnet">Bonnet.</label>
    <input type="radio" id="papillon" value="papillon">
    <label for="papillon">Papillon.</label>
    <input type="radio" id="arosoir" value="arosoir">
    <label for="boite-conserve">Boite de conserve.</label>
    <input type="radio" id="nuage" value="nuage">
    <label for="boite-conserve">Boite de conserve.</label>
  </form>

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
