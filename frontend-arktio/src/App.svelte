<script lang="ts">
  import { get } from "svelte/store";
  import { Route, router } from "tinro";
  import Lobby from "./Lobby.svelte";
  import Login from "./login.svelte";
  import Partie from "./partie.svelte";
  import Register from "./register.svelte";
  import { env } from "./scripts/envfile";
  import { routerFetch } from "./scripts/fetchOverride";
  import {disconnect, getPlayerInfos} from "./scripts/userScripts";
  import {base, socketStore, userStore} from "./stores/storeLibrary";
  import Regles from "./Regles.svelte";
  import Jeu from "./Jeu.svelte";
  import * as io from "socket.io-client"

  router.mode.hash();
  export let name: string;

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
      if (get(socketStore) == null) {
        socketStore.set(io.connect());
        const pinfos = await getPlayerInfos();
        get(socketStore).on("connect", () => get(socketStore).emit("player information", pinfos.userUUID, userStore.set));
      }
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
  <Route path="/lobby/:id" let:meta>
    {#if meta.params.id.length == 6 && !isNaN(meta.params.id)}
      <Lobby id={meta.params.id}/>
    {/if}
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
  <Route path="/jeu/">
    <Jeu />
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
</style>
