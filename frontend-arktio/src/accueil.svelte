<!-- <script lang="ts">
  const cookies = document.cookie;

  var current_pion: string = null;
  var game_name: string = "partie";

  // check si le joueur a renseigné son type de pion
  function infos_check() {
    if (current_pion == null) {
      console.log("pas de pion");
    } else {
      console.log("pion sélectionné :)");
    }
  }

  // TODO à modifier selon les cookies
  // function setCookie(cname, cvalue, exdays) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //   let expires = "expires="+d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }

  // function getCookie(cname) {
  //   let name = cname + "=";
  //   let ca = document.cookie.split(';');
  //   for(let i = 0; i <script ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  // function checkCookie() {
  //   let user = getCookie("username");
  //   if (user != "") {
  //     alert("Welcome again " + user);
  //   } else {
  //     user = prompt("Please enter your name:", "");
  //     if (user != "" && user != null) {
  //       setCookie("username", user, 365);
  //     }
  //   }
  // }
</script>

<main>
  <div class="logo">
    <img
      src="https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"
      alt="Logo Arktio"
    />
  </div>
  <h1>{document.cookie}</h1>
  <div class="boutons">
    <div id="game_name">
      {game_name}
    </div>
    <div id="joueur_pions">Liste des joueurs et leur pion</div>
    <select bind:value={current_pion}>
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

    #game_name {
      display: flex;
      justify-content: center;
      width: 40vw;
      font-size: xx-large;
      background-color: $blanc;
      color: $turquoise;
    }

    #joueur_pions {
      display: flex;
      width: 40vw;
      font-size: xx-large;
      text-align: center;
      color: $turquoise;
      background-color: $blanc;
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
      align-items: center;
      font-size: xx-large;

      position: absolute;
      bottom: 0;
      width: 100%;
    }

    @media (max-width: 900px) {
      button,
      input,
      select,
      option,
      #game_name,
      #joueur_pions {
        width: 60vw;
      }
    }
  </style>
</main> -->
<script lang="ts">
  // TODO créer fonction de création du bouton selon l'état de l'utilisateur
  // "connecté" ou pas

  var btn_cree: boolean = false;

  // TODO cookies

  function create_button() {
    // bouton déjà créé
    if (btn_cree) return;

    // variables
    let old_btn = document.getElementById("inscription");
    let new_btn = document.createElement("button");
    let text = document.createTextNode("Créer / Rejoindre une partie");

    // style
    new_btn.appendChild(text);
    new_btn.style.backgroundColor = "white";
    new_btn.style.display = "flex";
    new_btn.style.margin = "2.5%";
    new_btn.style.color = "#00a19a";
    new_btn.style.width = "50vw";
    new_btn.style.textAlign = "center";
    new_btn.style.borderRadius = "10px";
    new_btn.style.minWidth = "200px";
    new_btn.style.justifyContent = "space-around";
    // new_btn.style; // TODO hover ? mouseover sinon

    // insertion
    var div = document
      .getElementsByClassName("boutons svelte-m1780r")
      .item(0).children;

    div.item(0).remove();
    div.item(0).remove();
    div.item(0).parentNode.insertBefore(new_btn, div.item(0));
    btn_cree = true;
  }
</script>

<main>
  <div>
    <img
      src="https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"
      alt="Logo Arktio représentant un ours"
    />
  </div>
  <div id="titre">
    <p>Arktio</p>
  </div>
  <div class="boutons">
    <button id="connexion">Connexion</button>
    <button id="inscription">Inscription</button>
    <!-- TODO retirer le on:click -->
    <button id="regles" on:click={create_button}>Règles</button>
  </div>
</main>

<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;

  main {
    background-color: $turquoise;
    height: 100%;
    width: 100%;
    padding: 0;
  }

  // TODO target le bon body .. ( bords blancs)
  body {
    background-color: $turquoise;
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: xx-large;
    background-color: $turquoise;
    height: 30vh;
  }

  #titre {
    height: 20vh;
  }

  p {
    background-color: $blanc;
    color: $turquoise;
    text-align: center;
    border-radius: 5px;
    width: 40%;
    min-width: 150px;
  }

  button {
    margin: 2.5%;
    background-color: $blanc;
    color: $turquoise;
    width: 50vw;
    text-align: center;
    border-radius: 10px;
    min-width: 200px;
  }

  button:hover {
    background-color: rgb(41, 39, 39);
    color: $blanc;
  }

  button:active {
    background-color: rgb(150, 150, 150);
  }

  img {
    display: flex;
    align-self: center;
    max-width: 300px;
    max-height: 300px;
    padding: 5px;
  }

  #rejoindre_creer_partie {
    visibility: hidden;
  }
</style>
