<script lang="ts">
  import { Route, router } from "tinro";
  import Login from "./login.svelte";
  import Lobby from "./Lobby.svelte";
  import Partie from "./partie.svelte";
  import Register from "./register.svelte";

  router.mode.hash();

  enum RULES {
    CONNECTED,
    GUEST,
  }

  let state: RULES = RULES.GUEST;

  async function isAuth() {
    const data = await fetch("/api/session/isAuth", { method: "GET" });
    if ((await data.json()).authenticated) {
      state = RULES.CONNECTED;
    } else {
      state = RULES.GUEST;
    }
  }

  isAuth();
</script>

<main>
  <Route path="/">
    <div>
      <img
        src="https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"
        alt="Logo Arktio représentant un ours"
      />
    </div>
    <div class="boutons">
      {#if state === RULES.GUEST}
        <button
          id="connexion"
          on:click={() => {
            router.goto("/login");
          }}>Connexion</button
        >
        <button
          id="inscription"
          on:click={() => {
            router.goto("/register");
          }}>Inscription</button
        >
      {/if}
      {#if [RULES.CONNECTED, RULES.GUEST].includes(state)}
        <button
          id="create_join_party"
          on:click={() => {
            router.goto("/partie");
          }}>Créer / Rejoindre Partie</button
        >
        <!-- // TODO fix chemin pour créer partie -->
      {/if}
      <button id="regles">Règles</button>
    </div>
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/lobby">
    <Lobby /> // TODO peut être comme partie avec /:id
  </Route>
  <Route path="/register">
    <Register />
  </Route>
  <Route path="/partie/">
    <Partie />
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
    width: auto; // TODO
    max-width: $size;
    max-height: $size;
    margin-top: 5%;
  }

  #rejoindre_creer_partie {
    visibility: hidden;
  }

  @media (max-height: 800px) {
    .boutons {
      height: 50%;
    }
  }
</style>
