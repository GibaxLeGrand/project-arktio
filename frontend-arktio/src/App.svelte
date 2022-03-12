<script lang="ts">
  import Lobby from "./Lobby.svelte";
</script>

<Lobby></Lobby>

<style lang="scss">
  $color: #286143; // PS : c'était juste un test ou ça va servir ?
  $turquoise: #00a19a;
  $blanc: #ffffff;
  $caramel: #ffd49a;

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

  .logo {
    color: $blanc;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5vh;
  }

  #players{
    display: flex;
    flex-direction: column;
  }

  .player{
    background-color: $caramel;
    padding: 1em;
    margin: 5px;
  }

  .droite{
    float: right;
  }

  .gauche{
    float: left;
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
    text-align: center;
    font-family: Raleway;
    color: $blanc;
    background-color: $turquoise;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 640px) {
    main {
      max-width: none;
    }

    #players {
      width: 95%;
    }
  }
</style>
