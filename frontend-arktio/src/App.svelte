<script lang="ts">
  import { get } from "svelte/store";
  import { Route, router } from "tinro";
  import Lobby from "./Lobby.svelte";
  import Login from "./login.svelte";
  import Partie from "./partie.svelte";
  import Register from "./register.svelte";
  import { env } from "./scripts/envfile";
  import { routerFetch } from "./scripts/fetchOverride";
  import { disconnect, getPlayerInfos } from "./scripts/userScripts";
  import {
    base,
    lobbyStore,
    socketStore,
    userStore,
  } from "./stores/storeLibrary";
  import Regles from "./Regles.svelte";
  import Jeu from "./Jeu.svelte";
  import * as io from "socket.io-client";
  import Tailwindcss from "./Tailwindcss.svelte";
  import type { LobbyJSON } from "./types/types";

  let cnt = 0;

  router.mode.hash();
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
        socketStore.set(
          io.connect({
            path: get(base) + "/socket.io",
            transports: ["polling"],
          })
        );
        const pinfos = await getPlayerInfos();
        get(socketStore).on("connect", () =>
          get(socketStore).emit(
            "player information",
            pinfos.userUUID,
            ({ player }) => userStore.set(player)
          )
        );
      }
    } else {
      socketStore.set(null);
      state = RULES.GUEST;
    }
  }

  router.subscribe(() => {
    isAuth();
    console.log($router.path);
  });
</script>

<svelte:head>
    <title>Arktio</title>
    <meta charset="UTF-8">

</svelte:head>

<main>
  <Route path="/">
    <div class="logo">
      <img
        on:click={() => {
          if (cnt < 10) {
            cnt++;
          } else {
            cnt = 0;
          }
        }}
        alt="logo"
        src={cnt < 10
          ? "logo.png"
          : "https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"}
      />
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
      {#if [RULES.CONNECTED].includes(state)}
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
        on:click={() => router.goto("/Regles")}
        >Règles
      </button>
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
    <footer>
      <a href="https://m.facebook.com/Arktio/?locale2=fr_FR" target="_blank"
        >Facebook</a
      >
      <a href="https://arktio.fr/" target="_blank">Site d'Arktio</a>
    </footer>
  </Route>
  <Route path="/login">
    <Login />
  </Route>

  <Route path="/register">
    <Register />
  </Route>

  <Route path="/Regles/">
    <Regles />
  </Route>
  {#if [RULES.CONNECTED].includes(state) && $socketStore}
    <Route path="/jeu/">
      <Jeu />
    </Route>
    <Route path="/partie/">
      <Partie />
    </Route>
    <Route path="/lobby/:id" let:meta>
      {#if meta.params.id.length === 6 && !isNaN(meta.params.id)}
        <Lobby id={meta.params.id} />
      {:else}
        <Route redirect="/partie/" />
      {/if}
    </Route>
  {/if}

  <Route fallback redirect="/" />
</main>
