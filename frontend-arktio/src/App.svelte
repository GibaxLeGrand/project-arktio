<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";

  const test = () => {
    return true;
  };

  export let name: string;
</script>

<Tailwindcss />
<main />

<div class="logo"><img alt="logo" src="logo.png" /></div>

<div class="boutons">

  <form>
    <label for="name">Nom du joeueur:</label>
    <input type="text" id="name" name="name">
    <label for="mail">Adresse mail:</label>
    <input type="text" id="mail" name="mail">
    <label for="password">Mot de passe:</label>
    <input type="text" id="password" name="password">
  </form>

  <button id="validate">valider</button>

</div>

<footer>
  <a href="url">condition générale d'utilisation</a>
  <a href="non je déconne">Politique de cookie</a>
  <a href="Qui est tu ?">Qui sommes nous ?</a>
</footer>

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

  body {
    background-color: $turquoise;
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
    color: $blanc;
    display: inherit;
    justify-content: center;
    text-align: right;
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

  footer {
    position: fixed;
    padding: 10px 10px 0px 10px;
    bottom: 0;
    text-align: center;
    font-family: Raleway;
    color: $blanc;
    background-color: $turquoise;
    width: 100%;
  }

  footer>a{
    padding: 5%;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
