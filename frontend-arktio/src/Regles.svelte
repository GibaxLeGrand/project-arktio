<script lang="ts">
  import { router } from "tinro";

  let page = 1;
</script>

<!-- TODO idiot   -->
<main>
  <div>
    <button id="accueil" on:click={() => router.goto("/")}>
      Retourner à l'accueil
    </button>
    <span class="texte">texte</span>
    <button id="next" on:click={() => page++}> Page Suivante </button>
    <button id="previous" on:click={() => page++}> Page précédente </button>
  </div>
</main>

<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;
  $font_arktio: Raleway;

  main {
    width: 100%;
    height: 100%;
    font-family: $font_arktio;
    align-items: center;
    display: ;
  }

  div {
    display: flex;
    width: 99%;
    height: 99%;
    position: fixed;
    padding: 1%;
    margin: 1%;
    background-color: rgb(150, 48, 150);
    flex-direction: column;
  }

  .texte {
    display: flex;

    justify-content: center;
    background-color: forestgreen;
    width: max-content;
  }

  button {
    display: flex;
    align-items: center;
    width: 20%;
    height: 10%;
  }

  #accueil {
    color: white;
    background-color: coral;
  }

  #next {
    color: purple;
    background-color: slategray;
  }
  #previous {
    color: white;
    background-color: blue;
  }
</style>
