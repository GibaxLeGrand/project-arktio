<!-- Script -->
<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import {router} from "tinro";

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

  function new_game() {
    // Create random 6 int id
    id_partie = "";
    for (let i = 0; i < 6; i++) {
      id_partie += Math.floor(Math.random() * 10);
    }
    router.goto(`/lobby/${id_partie}`)
  }

  function join_game() {
    if (validate_input(id_partie)) {
      router.goto(`/lobby/${id_partie}`)
    }
  }

</script>

<Tailwindcss />

<!-- Page -->
<main>
  <div class="logo">
    <a href="/">
      <img
        src="https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"
        alt="Logo Arktio"
      />
    </a>
  </div>

  <div class="page">
    <button id="creer" on:click={()=>new_game()}>Créer une partie</button>
    <div class="connection">
      <input bind:value={id_partie} on:input|preventDefault={(event)=>validate_input(event.target["value"])} />
      <button id="rejoindre" on:click={join_game}>Rejoindre une partie</button>
    </div>

    <button id="retour" on:click={()=>router.goto("/")}>Retour</button>
  </div>

  <footer>
    <a href="/url">condition générale d'utilisation</a>
    <a href="/non je déconne">Politique de cookie</a>
    <a href="/Qui est tu ?">Qui sommes nous ?</a>
  </footer>
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
    background-color: $turquoise;
    min-width: 100vw;
    min-height: 100vh;
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

  input {
    display: inherit;
    color: $turquoise;
    text-align: center;
    background-color: $blanc;
    font-size: x-large;
    height: 7vh;
    width: 40vw;
    padding: 1em;
  }

  button {
    align-items: center;
    text-align: center;
    background-color: $blanc;
    font-size: x-large;
    height: 6vh;
    width: 40vw;
    margin: 1em;
    color: $turquoise;
  }

  footer {
    display: inherit;
    bottom: 0;
    position: absolute;
    text-align: center;
    color: $blanc;
    padding: 1em;
  }

  .page {
    display: flex;
    flex-flow: column;
    align-items: center;
    block-size: 50vh;
  }

  .connection {
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: $blanc;
    padding: 1em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
