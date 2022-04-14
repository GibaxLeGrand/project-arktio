<!-- <script lang="ts">
  import { get } from "svelte/store";
  import { Route, router } from "tinro";
  import Lobby from "./Lobby.svelte";
  import Login from "./login.svelte";
  import Partie from "./partie.svelte";
  import Register from "./register.svelte";
  import { env } from "./scripts/envfile";
  import { routerFetch } from "./scripts/fetchOverride";
  import { disconnect } from "./scripts/userScripts";
  import { base } from "./stores/locationStore";
  import Regles from "./Regles.svelte";

  router.mode.hash();

  base.set(env.root);
  router.base(get(base));

  enum RULES {
    CONNECTED,
    GUEST,
  }

  let state: RULES = RULES.GUEST;

  async function isAuth() {
    const data = await routerFetch("/api/session/isAuth", { method: "GET" });
    if ((await data.json()).authenticated) {
      state = RULES.CONNECTED;
    } else {
      state = RULES.GUEST;
    }
  }

  router.subscribe(() => {
    isAuth();
  });
</script>

<main>
  <Route path="/">
    <div>
      <a href="/">
        <img
          src="https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"
          alt="Logo Arktio représentant un ours"
        />
      </a>
    </div>
    <div class="boutons">
      {#if state === RULES.GUEST}
        <button
          id="connexion"
          on:click={() => {
            router.goto("/login");
          }}
          >Connexion
        </button>
        <button
          id="inscription"
          on:click={() => {
            router.goto("/register");
          }}
          >Inscription
        </button>
      {/if}
      {#if [RULES.CONNECTED, RULES.GUEST].includes(state)}
        <button
          id="create_join_party"
          on:click={() => {
            router.goto("/partie");
          }}
          >Créer / Rejoindre Partie
        </button>
      {/if}
      <button
        id="regles"
        title="afficher les règles"
        on:click={() => router.goto("/Regles")}>Règles</button
      >
      {#if [RULES.CONNECTED].includes(state)}
        <button
          id="disconnect"
          on:click={async () => {
            disconnect().then(isAuth);
          }}
          >Déconnexion
        </button>
      {/if}
    </div>
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/lobby">
    <Lobby />
    // TODO peut être comme partie avec /:id
  </Route>
  <Route path="/register">
    <Register />
  </Route>
  <Route path="/partie/">
    <Partie />
  </Route>
  <Route path="/Regles/">
    <Regles />
  </Route>
</main>

<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;

  $size: 256px;

  main {
    background-color: $turquoise;
    height: 100%;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    font-size: xx-large;
    background-color: $turquoise;
    padding: 2%;
  }

  button {
    margin: 2%;
    background-color: $blanc;
    color: $turquoise;
    width: 50%;
    text-align: center;
    border-radius: 10px;
    min-width: 200px;
    border: solid rgb(150, 150, 150);
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
    height: auto;
    width: auto;
    max-width: $size;
    max-height: $size;
    margin-top: 5%;
  }
</style> -->
<script lang="ts">
  const NB_CASES = 30;

  let quit_game_button_text = "Quitter";
  let print_yes_no = false;

  let Joueur_1 = "Joueur 1"; // nom du joueur en 1ere position
  let Joueur_2 = "Joueur 2"; // nom du joueur en 2e position
  let Joueur_3 = "Joueur 3"; // nom du joueur en 3e position
  let Joueur_4 = "Joueur 4"; // nom du joueur en 4e position

  /**
   * handle the quit button
   */
  function quit_game_handler() {
    // change text on the button
    quit_game_button_text === "Abandonner la partie ?"
      ? (quit_game_button_text = "Quitter")
      : (quit_game_button_text = "Abandonner la partie ?");
    // toggle buttons yes and no
    print_yes_no == false ? (print_yes_no = true) : (print_yes_no = false);
  }

  /**
   * quit the game without asking if the button is yes
   */
  function quit() {
    // TODO
  }

  /**
   * ajoute un item dans l'inventaire avec l'image path_to_img
   * @param path_to_img
   */
  function add_item_inventory(path_to_img: string) {
    // TODO ajouter un titre pour l'accessibilité ?
    let inventaire = document.getElementById("inventaire");
    const child = document.createElement("div");

    // FIXME n'affiche pas d'image :(
    if (path_to_img != null) {
      child.style.backgroundImage = path_to_img;
    } else {
      child.style.backgroundImage = "";
    }
    child.style.backgroundColor = "white";
    child.style.width = "50px";
    child.style.height = "50px";
    child.style.display = "flex";
    child.style.justifySelf = "space-between";
    child.style.border = "solid grey";

    inventaire.appendChild(child);
  }

  /**
   * envoie un message // TODO ajouter les div dans le chat et bien les aligner
   */
  function send_message() {
    let text = document.getElementById("input").innerText;
    console.log(text); // TODO remove

    let chat_contener = document.getElementById("chat");
    const child = document.createElement("div");

    child.innerText = text;
    child.style.backgroundColor = "white";
    child.style.width = "70px";
    child.style.height = "20px";
    child.style.display = "flex";
    child.style.justifySelf = "space-between";
    child.style.border = "solid grey";

    chat_contener.appendChild(child);
  }
</script>

<main>
  <div class="plateau">
    <div id="x1" class="cases_haut">X 1</div>
    <div id="x2" class="cases_haut">X 2</div>
    <div id="x3" class="cases_haut">X 3</div>
    <div id="x4" class="cases_haut">X 4</div>
    <div id="x5" class="cases_haut">X 5</div>
    <div id="x6" class="cases_haut">X 6</div>
    <div id="x7" class="cases_haut">X 7</div>
    <div id="x8" class="cases_droite">X 8</div>
    <div id="x9" class="cases_droite">X 9</div>
    <div id="x10" class="cases_droite">X 10</div>
    <div id="x11" class="cases_droite">X 11</div>
    <div id="x12" class="cases_droite">X 12</div>
    <div id="x13" class="cases_droite">X 13</div>
    <div id="x14" class="cases_droite">X 14</div>
    <div id="x15" class="cases_droite">X 15</div>
    <div id="x16" class="cases_bas">X 16</div>
    <div id="x17" class="cases_bas">X 17</div>
    <div id="x18" class="cases_bas">X18</div>
    <div id="x19" class="cases_bas">X 19</div>
    <div id="x20" class="cases_bas">X 20</div>
    <div id="x21" class="cases_bas">X 21</div>
    <div id="x22" class="cases_bas">X 22</div>
    <div id="x23" class="cases_gauche">X 23</div>
    <div id="x24" class="cases_gauche">X 24</div>
    <div id="x25" class="cases_gauche">X 25</div>
    <div id="x26" class="cases_gauche">X 26</div>
    <div id="x27" class="cases_gauche">X 27</div>
    <div id="x28" class="cases_gauche">X 28</div>
    <div id="x29" class="cases_gauche">X 29</div>
    <div id="x30" class="cases_gauche">X 30</div>
    <div id="conteneur">
      <div id="event">"ÉVÉNEMENTS ( tu dois payer ...)"</div>
      <div id="image">image</div>
      <button id="option1" class="options">options 1</button>
      <button id="option2" class="options">options 2</button>
      <button id="option3" class="options">options 3</button>
      <button id="option4" class="options">options 4</button>
    </div>

    <div id="titre_inventaire">Inventaire</div>
    <div id="inventaire" />
    <div id="chat">
      <div class="message">hey</div>
      <!-- <div class="input_area">
      </div> -->
    </div>
    <input type="text" method="POST" />
    <button type="submit" id="send_message" on:click={send_message}>
      Envoyer
    </button>
    <div id="classement">
      <div id="classement_1">{Joueur_1}</div>
      <div id="classement_2">{Joueur_2}</div>
      <div id="classement_3">{Joueur_3}</div>
      <div id="classement_4">{Joueur_4}</div>
    </div>
    <button id="quit_game" on:click={quit_game_handler}
      >{quit_game_button_text}</button
    >
    {#if print_yes_no}
      <button on:click={quit} class="bouton_choix">OUI</button>
      <button on:click={quit_game_handler} class="bouton_choix">NON</button>
    {/if}
  </div>
</main>

<style lang="scss">
  $nb_cases_horizontal: 5;
  $nb_cases_vertical: 10; // les cases dans les coins sont comptées
  $taille_case: 1fr;

  $turquoise: #00a19a;
  $blanc: #ffffff;
  $framboise: #ba105a;
  $caramel: #ffd49a;
  $turquoise_clair: #98d1cd;
  $gris: #90908f;
  $gris_fonce: #2c2c2c;
  $font_arktio: Raleway;

  main {
    width: 100%;
    height: 100%;
    background-color: $turquoise_clair;

    justify-content: center;
    align-items: center;

    font-size: xx-large;
    color: #ffffff;
    font-family: $font_arktio;
  }

  .plateau {
    width: 100%;
    height: 100%;

    border: solid $framboise;
    border-width: 5px;

    display: grid;
    grid-gap: 5px;
    grid-template-rows: repeat(10, $taille_case);
    grid-template-columns: repeat(11, $taille_case);
  }

  // toutes les cases y compris contener + autres div
  .plateau > div {
    border: dashed black;
  }

  // 1 -> 7
  .cases_haut {
    grid-row-start: 1;
  }

  // 8 -> 15
  .cases_droite {
    grid-column-start: 9;
  }

  // 16 -> 22
  .cases_bas {
    grid-row-start: 10;
  }

  // 23 -> 30
  .cases_gauche {
    grid-column-start: 3;
  }

  #conteneur {
    grid-column-start: 4;
    grid-column-end: 9;
    grid-row-start: 2;
    grid-row-end: 10;

    border: dashed red;
    color: #2c2c2c;

    display: flexbox;
  }

  #event {
    background-color: $framboise;
    height: 20%;
  }
  #image {
    background-color: #fff;
    height: 50%;
  }

  button {
    width: fit-content;
    height: fit-content;
    align-self: flex-end;
    display: inline-flex;
    justify-self: space-around;
    border: solid $gris;
    background-color: $blanc;
    border-radius: 10px;
    color: $gris_fonce;
  }

  button:hover {
    background-color: rgb(41, 39, 39);
    color: $blanc;
  }

  button:active {
    background-color: rgb(150, 150, 150);
  }
  .options {
    height: 7%;
    width: 40%;
    align-items: center;
    justify-content: space-around;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-right: 4.5%;
    margin-left: 4.5%;
  }

  .bouton_choix {
    width: 80%;
    justify-content: center;
    align-items: center;
    justify-self: center;
  }

  #quit_game {
    grid-column-start: 1;
    grid-column-end: 3;
    height: 100%;
    width: 70%;
    font-size: 2vw;

    justify-content: center;
    align-items: center;
    justify-self: left;
  }

  #titre_inventaire {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 3vw;
    color: $gris_fonce;
    border: none;
  }

  #classement {
    grid-column-start: 10;
    grid-column-end: 12;
    grid-row-start: 7;
    grid-row-end: 11;
    display: flex;
    border: dashed $caramel;
    color: $gris_fonce;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  #classement_1 {
    background-color: #fff;
    width: 80%;
  }
  #classement_2 {
    background-color: rgb(255, 232, 232);
    width: 80%;
  }
  #classement_3 {
    background-color: rgb(255, 174, 174);
    width: 80%;
  }
  #classement_4 {
    background-color: rgb(255, 134, 134);
    width: 80%;
  }

  #inventaire {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 11;
    border: dashed $caramel;

    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    overflow: scroll;
    flex-wrap: wrap;
  }

  #chat {
    grid-column-start: 10;
    grid-column-end: 12;
    grid-row-start: 1;
    grid-row-end: 6;

    width: 100%;
    display: flex;
    align-items: flex-end;
    align-content: center;
    justify-content: flex-end;
  }

  .input_area {
    display: inline-flex;
  }

  .message {
    display: flex;
    justify-content: left;
  }

  // TODO gérer la taille de ce truc
  input {
    width: 50%;
    font-size: 60%;
    font-family: $font_arktio;
    display: flex;
    grid-column-start: 10;
    grid-column-end: 13;
    grid-row-start: 6;
  }
  #send_message {
    width: 80%;
    font-size: 70%;
    justify-content: center;
    justify-self: flex-end;

    grid-column-start: 11;
    grid-row-start: 6;
  }

  #image {
    align-self: center;
  }

  #x1 {
    grid-column-start: 3;
  }
  #x2 {
    grid-column-start: 4;
  }
  #x3 {
    grid-column-start: 5;
  }
  #x4 {
    grid-column-start: 6;
  }
  #x5 {
    grid-column-start: 7;
  }
  #x6 {
    grid-column-start: 8;
  }
  #x7 {
    grid-column-start: 9;
  }

  #x8 {
    grid-row-start: 2;
  }
  #x9 {
    grid-row-start: 3;
  }
  #x10 {
    grid-row-start: 4;
  }
  #x11 {
    grid-row-start: 5;
  }
  #x12 {
    grid-row-start: 6;
  }
  #x13 {
    grid-row-start: 7;
  }
  #x14 {
    grid-row-start: 8;
  }
  #x15 {
    grid-row-start: 9;
  }
  #x16 {
    grid-column-start: 9;
  }
  #x17 {
    grid-column-start: 8;
  }
  #x18 {
    grid-column-start: 7;
  }
  #x19 {
    grid-column-start: 6;
  }
  #x20 {
    grid-column-start: 5;
  }
  #x21 {
    grid-column-start: 4;
  }
  #x22 {
    grid-column-start: 3;
  }
  #x23 {
    grid-row-start: 9;
  }
  #x24 {
    grid-row-start: 8;
  }
  #x25 {
    grid-row-start: 7;
  }
  #x26 {
    grid-row-start: 6;
  }
  #x27 {
    grid-row-start: 5;
  }
  #x28 {
    grid-row-start: 4;
  }
  #x29 {
    grid-row-start: 3;
  }
  #x30 {
    grid-row-start: 2;
  }
</style>
