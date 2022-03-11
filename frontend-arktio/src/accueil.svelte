<!-- TAGS -->
<!-- <div class="logo">
  <img
    src="https://www.adobe.com/express/create/logo/media_1ba2722b76062fb428e1071c5cd59a5d9bc7fb94f.jpeg?width=400&format=jpeg&optimize=medium"
    alt="Logo Arktio"
  />
</div> -->

<div class="boutons">
  <button id="player_name">nom du joueur</button>
  <button id="game_name">nom de la partie</button>
  <button id="pion_choice">choix du pion</button>
  <button id="validate">valider</button>
</div>

<footer>this is the footer</footer>

<!-- STYLE -->
<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;

  // main {
  //   @apply py-32;
  //   text-align: center;
  //   padding: 1em;
  //   max-width: 240px;
  //   // margin: 0 auto;
  //   margin: 0;
  // }

  html {
    // TODO
    background-color: $turquoise;
  }

  body {
    background-color: rgb(187, 95, 29);
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
    background-color: $turquoise;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5vh;
    margin-top: 0;
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

  // @media (min-width: 640px) {
  //   main {
  //     max-width: none;
  //   }
  // }
</style>
