<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import { register } from "./scripts/userScripts";
  import { Route } from "tinro";

  let email = null;
  let password = null;
  let name = null;
  let confirm_password = null;
</script>

<Tailwindcss />
<main>
  <div class="logo">
    <img alt="logo" src="logo.png" />
  </div>

  <div class="boutons">
    <form
      action="javascript:"
      on:submit={() => register(name, email, password, confirm_password)}
    >
      <label for="name">Nom du joueur:</label>
      <input required type="text" id="name" name="name" bind:value={name} />

      <label for="email">Adresse mail:</label>
      <input required type="email" id="email" name="email" bind:value={email} />

      <label for="password">Mot de passe:</label>
      <input
        required
        type="password"
        id="password"
        name="password"
        bind:value={password}
      />

      <label for="confirm_password">Confirmer le mot de passe:</label>
      <input
        required
        type="password"
        id="confirm_password"
        name="confirm_password"
        bind:value={confirm_password}
      />

      <button id="validate" type="submit">S'inscrire</button>
    </form>
  </div>

  <footer>
    <a href="/url">condition générale d'utilisation</a>
    <a href="/non je déconne">Politique de cookie</a>
    <a href="/Qui est tu ?">Qui sommes nous ?</a>
  </footer>
</main>

<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;

  main {
    @apply py-32;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  // body {
  //   background-color: $turquoise;
  // }

  // TODO pourquoi ça marche pas ça ?

  div {
    font-family: Raleway;
    text-decoration-color: $blanc;
    background-color: $turquoise;
  }

  // h1 {
  //   color: $turquoise;
  //   text-decoration-color: $blanc;
  //   text-transform: uppercase;
  //   font-size: 4em;
  //   font-weight: 100;
  // }

  .logo {
    color: $blanc;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5vh;
  }

  img {
    max-width: 40%;
    height: auto;
  }

  form {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    color: $blanc;
    block-size: 5vh;
  }

  label {
    color: $blanc;
    display: inherit;
    justify-content: center;
    text-align: center;
    background-color: $turquoise;
    font-weight: 100;
    inline-size: 60vw;
  }

  input {
    color: $turquoise;
    background-color: $blanc;
    display: inherit;
    justify-content: center;
    text-align: center;
    font-weight: 10;
    inline-size: 30vw;
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

  footer > a {
    padding: 5%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
