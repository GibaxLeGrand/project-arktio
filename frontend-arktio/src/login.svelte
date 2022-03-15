<!-- Script -->
<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";

  const test = () => {
    return true;
  };

  function test_exist() {
    let test_login = true;
    let test_mdp = true;
    if (test_login) {
    }
  }

  let login = null;
  let mdp = null;
</script>

<Tailwindcss />

<!-- Page -->
<main>
  <div class="logo">
    <img
      src="https://cdn.discordapp.com/attachments/942433231599456307/952985982595104878/unknown.png"
      alt="Logo Arktio"
    />
  </div>

  <div class="page">
    <div class="connection">
      <p>Nom d'utilisateur</p>
      <input bind:value={login} />

      <p>Mot de passe</p>
      <input bind:value={mdp} />

      <button id="entrer" on:click={test_exist}>Valider</button>
    </div>

    <button id="nouveau_compte">Créer un nouveau compte</button>
    <button id="invite">Jouer en tant qu'invité</button>
    <button id="retour">Retour</button>
  </div>

  <footer>Contacte</footer>
</main>

<!-- CSS -->
<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;
  $framboise: #ba105a;
  $caramel: #ffd49a;
  $turquoise_clair: #98d1cd;
  $gris: #90908f;
  $gris_fonce: #2c2c2c;
  $font_arktio: Raleway;

  main {
    background-color: $turquoise;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: $font_arktio;
  }

  img {
    width: 15rem;
    height: 15rem;
    margin: 1rem;
  }

  input {
    display: inherit;
    color: $turquoise;
    text-align: center;
    background-color: $blanc;
    font-size: x-large;
    height: 7vh;
    width: 40vw;
    padding: 1em;
  }

  button {
    align-items: center;
    text-align: center;
    background-color: $blanc;
    font-size: x-large;
    height: 6vh;
    width: 40vw;
    margin: 1em;
    color: $turquoise;
  }

  footer {
    display: inherit;
    bottom: 0;
    position: absolute;
    text-align: center;
    color: $blanc;
    padding: 1em;
  }

  .page {
    display: flex;
    flex-flow: column;
    align-items: center;
    block-size: 50vh;
  }

  .connection {
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: $blanc;
    padding: 1em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
