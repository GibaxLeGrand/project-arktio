<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";

  enum Pions{
    Boite_conserve,
    Terre,

  }

  class Player_lobby{
    present: boolean;
    name: string;
    pion: Pions;

    constructor(present:boolean = false, ){
      this.present = present;
    }
  }

  const test = () => {
    return true;
  };

  let name_lobby: string = "XXXX";

  let player_1:Player_lobby = new Player_lobby();
  let player_2:Player_lobby = new Player_lobby();
  let player_3:Player_lobby = new Player_lobby();
  let player_4:Player_lobby = new Player_lobby();

</script>

<Tailwindcss />

<main>
<div class="logo">logo ici</div>

<h id="lobby_name">Lobby {name_lobby}</h>
  <div>
    <label for="players">Joueur-euses :</label>
      <ol id="players">
        <li class="player"></li>
        <li class="player"></li>
        <li class="player"></li>
        <li class="player"></li>
      </ol>
  </div>

  <div>
    <input type="radio" value="boite-conserve">
    <input type="radio" value="terre">
    <input type="radio" value="plante">
    <input type="radio" value="grain-cafe">
    <input type="radio" value="bonnet">
    <input type="radio" value="papillon">
    <input type="radio" value="arosoir">
    <input type="radio" value="nuage">
  </div>

  <button aria-label="Lancer la partie" id="start_game">Commencer partie</button>

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
