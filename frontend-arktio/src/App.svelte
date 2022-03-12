<!-- Script -->
<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import Accueil from "./accueil.svelte";
  const test = () => {
    return true;
  };

  // export let name: string;
</script>


<Tailwindcss />

<Accueil />

<!-- <main>
  <div class="logo">
    <img
      src="https://www.adobe.com/express/create/logo/media_1ba2722b76062fb428e1071c5cd59a5d9bc7fb94f.jpeg?width=400&format=jpeg&optimize=medium"
      alt="Logo Arktio"
    />
  </div>

  <div class="boutons">
    <button id="player_name">nom du joueur</button>
    <button id="game_name">nom de la partie</button>
    <button id="pion_choice">choix du pion</button>
    <button id="validate">valider</button>
  </div>

  <footer>this is the footer</footer>

  <style lang="scss">
    $turquoise: #00a19a;
    $blanc: #ffffff;

    main {
      @apply py-32;
      text-align: center;
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
      height: 100vh;
    }

    body {
      background-color: $turquoise;
    }

    div {
      font-family: Raleway;
      text-decoration-color: $blanc;
    }

    img {
      max-width: 200px;
      max-height: 200px;
    }
    // TODO Le logo est soumis à une zone de protection qui
    // s’applique autour de son encadré. Le « O » minuscule sert
    // de référence pour mesurer cette zone.

    .logo {
      color: $blanc;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 5vh;
    }

    .boutons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      color: $blanc;
    }

    button {
      color: $turquoise;
      display: inherit;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      background-color: $blanc;
      font-weight: 400;
      margin: 1%;
      inline-size: 60vw;
    }

    footer {
      text-align: center;
      font-family: Raleway;
      color: $blanc;
      display: flex;
      flex-direction: column;
      position: relative;
      bottom: 0;
      width: 100%;
    }

    // @media (min-width: 640px) {
    //   main {
    //     max-width: none;
    //   }
    // }
  </style>
</main> -->
