<script lang="ts">
  // infos à transmettre pour la création de la partie
  // interface player_pion {
  //   player_name: string;
  //   pion: string;
  // }
  const cookies = document.cookie;

  var current_pion: string;
  // current_player.player_name = null;
  // current_player.pion = null;

  // var players_list: string[];
  // var game_name: string;
  // var pion: string;

  // check si le joueur a renseigné son nom et son type de pion
  function infos_check() {
    if (current_pion == null) {
      console.log("true");
    } else {
      console.log("false");
    }
  }
</script>

<main>
  <div class="logo">
    <img
      src="https://scontent-frx5-1.xx.fbcdn.net/v/t1.6435-9/116880518_623427318290913_6257283846465477901_n.png?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Y5I303qKc5kAX9_hsUF&_nc_ht=scontent-frx5-1.xx&oh=00_AT8B6aWNIMcK5RfCj3BJZV-pJ39qOzvsZFVu6Ob8_Y36lQ&oe=625634A9"
      alt="Logo Arktio"
    />
  </div>
  <h1>{document.cookie}</h1>
  <div class="boutons">
    <!-- <input bind:value={current_player.player_name} required /> -->
    <!-- <input bind:value={.game_name} required /> -->
    <!-- <select bind:value={current_player.pion}>
      <option value="pion 1">pion 1</option>
      <option value="pion 2">pion 2</option>
      <option value="pion 3">pion 3</option>
    </select> -->
    <button on:click={infos_check} id="valider">valider</button>
  </div>

  <footer>this is the footer</footer>

  <style lang="scss">
    $turquoise: #00a19a;
    $blanc: #ffffff;

    body {
      background-color: $turquoise;
      padding: 0;
    }

    img {
      max-width: 300px;
      max-height: 300px;
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
      color: $turquoise;
      background-color: $blanc;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: xx-large;

      width: 100%;
    }

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
