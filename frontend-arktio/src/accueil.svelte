<script lang="ts">
  // infos à transmettre pour la création de la partie
  var infos = {
    player_name: "Nom du Joueur",
    game_name: "Nom de la Partie",
    pion: "Choix du pion",
  };

  function infos_check() {
    var check: boolean;
    if (infos.player_name == null || infos.player_name == "Nom du Joueur") {
      check = false;
    } else if (
      infos.game_name == null ||
      infos.game_name == "Nom de la Partie"
    ) {
      check = false;
    } else if (infos.pion == null || infos.pion == "Choix du pion") {
      check = false;
    } else {
      check = true;
    }
    if (check) {
      console.log("true");
    } else {
      console.log("false");
    }
  }
</script>

<main>
  <div class="logo">
    <img
      src="https://www.adobe.com/express/create/logo/media_1ba2722b76062fb428e1071c5cd59a5d9bc7fb94f.jpeg?width=400&format=jpeg&optimize=medium"
      alt="Logo Arktio"
    />
  </div>
  <div class="boutons">
    <input bind:value={infos.player_name} required />
    <input bind:value={infos.game_name} required />
    <select bind:value={infos.pion}>
      <option value="pion 1">pion 1</option>
      <option value="pion 2">pion 2</option>
      <option value="pion 3">pion 3</option>
    </select>
    <button on:click={infos_check} id="valider">valider</button>
  </div>

  <footer>this is the footer</footer>

  <style lang="scss">
    $turquoise: #00a19a;
    $blanc: #ffffff;

    body {
      background-color: $turquoise;
    }

    img {
      width: 100;
      heigth: 100;
      margin: 5px;
    }

    div {
      font-family: Raleway;
      text-decoration-color: $blanc;
    }

    input,
    select,
    option {
      color: $turquoise;
      text-align: center;
      font-weight: 400;
      font-size: x-large;
      height: 7vh;
      width: 40vw;
    }

    .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0;
    }

    .boutons {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-evenly;
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
      font-size: x-large;
      height: 7vh;
      width: 40vw;
    }

    footer {
      text-align: center;
      font-family: Raleway;
      color: $blanc;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: xx-large;

      width: 100%;
    }

    // @media (min-width: 640px) {
    //   main {
    //     max-width: none;
    //   }
    // }

    @media (max-width: 900px) {
      button,
      input,
      select,
      option {
        width: 60vw;
      }
    }
  </style>
</main>
