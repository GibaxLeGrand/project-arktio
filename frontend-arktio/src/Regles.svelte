<script lang="ts">
  import { router } from "tinro";
  //   import { onMount } from "svelte";
  //   let PdfViewer;

  //   onMount(async () => {
  //     const module = await import("svelte-pdf");
  //     PdfViewer = module.default;
  //   });
</script>

<main>
  <!-- <svelte:component this={PdfViewer} url="regles.pdf" /> -->
  <button on:click={() => router.goto("/")}> Retourner à l'accueil </button>
  <!-- <PdfViewer showButtons="true" url="/regles.pdf" s /> -->
</main>

<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;
  $font_arktio: Raleway;

  main {
    width: 100%;
    height: 100%;
    font-family: $font_arktio;
  }

  //   button {
  //     display: flex;
  //     color: $blanc;
  //     position: fixed;
  //     width: 20%;
  //     height: 10%;
  //   }
</style>
