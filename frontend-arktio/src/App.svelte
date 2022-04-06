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
</script>

<main>
  <div class="case">
    <div id="x1" class="cases_horizontal">X 1</div>
    <div id="x2" class="cases_horizontal">X 2</div>
    <div id="x3" class="cases_horizontal">X 3</div>
    <div id="x4" class="cases_horizontal">X 4</div>
    <div id="x5" class="cases_horizontal">X 5</div>
    <div id="x6" class="cases_horizontal">X 6</div>
    <div id="x7" class="cases_horizontal">X 7</div>
    <div id="x8" class="cases_vertical">X 8</div>
    <div id="x9" class="cases_vertical">X 9</div>
    <div id="x10" class="cases_vertical">X 10</div>
    <div id="x11" class="cases_vertical">X 11</div>
    <div id="x12" class="cases_vertical">X 12</div>
    <div id="x13" class="cases_vertical">X 13</div>
    <div id="x14" class="cases_horizontal">X 14</div>
    <div id="x15" class="cases_horizontal">X 15</div>
    <div id="x16" class="cases_horizontal">X 16</div>
    <div id="x17" class="cases_horizontal">X 17</div>
    <div id="x18" class="cases_horizontal">X18</div>
    <div id="x19" class="cases_vertical">X 19</div>
    <div id="x20" class="cases_vertical">X 20</div>
    <div id="x21" class="cases_vertical">X 21</div>
    <div id="x22" class="cases_vertical">X 22</div>
    <div id="x23" class="cases_vertical">X 23</div>
    <div id="x24" class="cases_vertical">X 24</div>
    <div id="x25" class="cases_vertical">X 25</div>
    <div id="x26" class="cases_vertical">X 26</div>
    <div id="x27" class="cases_horizontal">X 27</div>
    <div id="x28" class="cases_horizontal">X 28</div>
    <div id="x29" class="cases_horizontal">X 29</div>
    <div id="x30" class="cases_horizontal">X 30</div>
    <div id="conteneur">
      "ÉVÉNEMENTS ( tu dois payer ...)"
      <div id="image">image</div>
      <button id="option1">options</button>
      <button id="option2">options</button>
      <button id="option3">options</button>
      <button id="option4">options</button>
    </div>
  </div>
</main>

<style lang="scss">
  $nb_cases_horizontal: 5;
  $nb_cases_vertical: 8;
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
  }

  #plateau {
    grid-template-areas:
      "case cases_horizontal case"
      "cases_vertical event cases_vertical"
      "case cases_horizontal case";
  }

  #event {
    grid-area: event;

    width: $nb_cases_horizontal * $taille_case;
    height: $nb_cases_vertical * $taille_case;
  }

  .case {
    // grid-area: case;
    // grid-template-columns: repeat(5, 10px) repeat(5, 10px);
    // grid-template-rows: repeat(5, 10px) repeat(5, 10px);

    // width: $taille_case;
    // height: $taille_case;

    width: 100%;
    height: 100%;

    border: solid $framboise;
    border-width: 5px;

    display: grid;
    grid-gap: 5px;
    grid-template-rows: repeat(10, $taille_case);
    grid-template-columns: repeat(7, $taille_case);
  }

  .cases_horizontal {
    // grid-area: cases_horizontal;

    // background-color: blue;
    width: $nb_cases_horizontal * $taille_case;
    height: $taille_case;

    border: dashed $gris_fonce;
    border-width: 5px;

    position: static;
    justify-content: right;
  }

  // // 7 premiers éléments horizontaux
  // .cases_horizontal:nth-child(-n + 7) {
  //   background-color: #2c2c2c;
  // }
  // // 8 derniers éléments horizontaux ( 30-8 )
  // .cases:nth-child(n + 22) {
  //   background-color: deeppink;
  // }

  .cases_vertical {
    // grid-area: cases_vertical;

    width: $taille_case;
    height: $nb_cases_vertical * $taille_case;

    border: dashed $gris_fonce;
    border-width: 5px;
  }

  #conteneur {
    grid-column-start: 2;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: 10;

    border: dashed red;
    color: #2c2c2c;

    // justify-self: center;
    // align-self: center;
    display: flexbox;
  }

  // TODO mettre les boutons en bas
  button {
    width: fit-content;
    height: fit-content;
    align-self: flex-end;
    display: inline-flex;
    justify-self: space-around;
  }

  #image {
    align-self: center;
  }

  #x8 {
    grid-column-start: 7;
    grid-row-start: 2;
  }
  #x9 {
    grid-column-start: 7;
    grid-row-start: 3;
  }
  #x10 {
    grid-column-start: 7;
    grid-row-start: 4;
  }
  #x11 {
    grid-column-start: 7;
    grid-row-start: 5;
  }
  #x12 {
    grid-column-start: 7;
    grid-row-start: 6;
  }
  #x13 {
    grid-column-start: 7;
    grid-row-start: 7;
  }
  #x14 {
    grid-column-start: 7;
    grid-row-start: 8;
  }
  #x15 {
    grid-column-start: 7;
    grid-row-start: 9;
  }
  #x16 {
    grid-column-start: 7;
    grid-row-start: 10;
  }
  #x17 {
    grid-column-start: 6;
    grid-row-start: 10;
  }
  #x18 {
    grid-column-start: 5;
    grid-row-start: 10;
  }
  #x19 {
    grid-column-start: 4;
    grid-row-start: 10;
  }
  #x20 {
    grid-column-start: 3;
    grid-row-start: 10;
  }
  #x21 {
    grid-column-start: 2;
    grid-row-start: 10;
  }
  #x22 {
    grid-column-start: 1;
    grid-row-start: 10;
  }
  #x23 {
    grid-column-start: 1;
    grid-row-start: 9;
  }
  #x24 {
    grid-column-start: 1;
    grid-row-start: 8;
  }
  #x25 {
    grid-column-start: 1;
    grid-row-start: 7;
  }
  #x26 {
    grid-column-start: 1;
    grid-row-start: 6;
  }
  #x27 {
    grid-column-start: 1;
    grid-row-start: 5;
  }
  #x28 {
    grid-column-start: 1;
    grid-row-start: 4;
  }
  #x29 {
    grid-column-start: 1;
    grid-row-start: 3;
  }
  #x30 {
    grid-column-start: 1;
    grid-row-start: 2;
  }
</style>
