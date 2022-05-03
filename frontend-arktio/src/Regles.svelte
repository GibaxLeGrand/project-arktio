<script lang="ts">
  import { router } from "tinro";

  let page = 1; // numéro de page actuelle
  const NB_PAGE = 0; // nombre de pages total // TODO

  // incrémente et décrémente page avec vérification
  function button_next_handler() {
    if (page == NB_PAGE) return;
    page++;
  }
  function button_previous_handler() {
    if (page == 1) return;
    page--;
  }
</script>

<main>
  <div>
    {#if page == 1}
      <section>page 1</section>
    {/if}
    {#if page == 2}
      <section>page 2</section>
    {/if}
    {#if page == 3}
      <section>page 3</section>
    {/if}
    {#if page == 4}
      <section>page 4</section>
    {/if}
    {#if page == 5}
      <section>page 5</section>
    {/if}
    {#if page == 6}
      <section>page 6</section>
    {/if}
    {#if page == 7}
      <section>coucou</section>
    {/if}
  </div>
  <button
    title="retourner à l'accueil"
    id="accueil"
    on:click={() => router.goto("/")}
  >
    Retourner à l'accueil
  </button>
  <button
    title="aller à la prochaine page"
    id="next"
    on:click={button_next_handler}
  >
    Page Suivante
  </button>
  <button
    title="aller à la page précédente"
    id="previous"
    on:click={button_previous_handler}
  >
    Page précédente
  </button>
</main>

<style lang="scss">
  $font_arktio: Raleway;

  $turquoise: #00a19a;
  $blanc: #ffffff;
  $caramel: #ffd49a;
  $gris: #90908f;
  $hover_button: rgb(41, 39, 39);

  main {
    display: flex;
    width: 100%;
    height: 100%;
    font-family: $font_arktio;
    align-items: center;
    font-size: 300%;
    font-family: $font_arktio;
  }

  button {
    display: flex;
    align-items: center;
    width: 20%;
    height: 10%;
    justify-content: center;
    border-radius: 10px;
    border: solid $gris;
    background-color: $caramel;
  }

  button:hover {
    background-color: $hover_button;
    color: $blanc;
  }

  button:active {
    background-color: $gris;
  }

  div {
    display: flex;
    width: 90%;
    height: 50%;
    position: fixed;
    padding-bottom: 5%;
    margin: 5%;
    margin-top: 10%;
    border: solid $blanc;
    border-radius: 10px;
    flex-direction: column;
  }

  section {
    display: flex;
    width: 90%;
    height: 90%;
    margin: 5%;
    padding: 2%;
    overflow: auto;
    overflow-x: unset;
    overflow-wrap: anywhere;
  }

  #accueil {
    position: fixed;
    align-self: flex-start;
  }

  #next {
    position: fixed;
    display: inherit;
    bottom: 0;
    right: 0;
    font-size: 70%;

    // align-self: flex-end;
    // justify-items: right;
  }
  #previous {
    position: fixed;
    display: inherit;
    bottom: 0;
    left: 0;
    font-size: 70%;
    // flex-direction: row;
    // align-self: flex-end;
    // font-size: 75%;
  }

  // WIDTH
  @media (max-width: 1100px) {
    main {
      font-size: 200%;
    }
  }
  @media (max-width: 700px) {
    main {
      font-size: 100%;
    }
  }
  // HEIGHT
  @media (max-height: 1100px) {
    #accueil {
      font-size: 75%;
    }
  }
</style>
