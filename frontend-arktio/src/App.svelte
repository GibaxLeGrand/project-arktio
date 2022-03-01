<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";

  const test = () => {
    return true;
  };

  export let name: string;
</script>

<Tailwindcss />
<main />

<h1 class="">Hello {name}!</h1>
<p>
  Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how
  to build Svelte apps.
</p>
<div class="logo">logo ici</div>

<div class="boutons">
  <button id="player_name">nom du joueur</button>
  <button id="game_name">nom de la partie</button>
  <button id="pion_choice">choix du pion</button>
  <button id="validate">valider</button>
</div>

<footer>this is the footer</footer>

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
