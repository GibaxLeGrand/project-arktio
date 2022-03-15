<!-- Script -->
<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte";


	let email : string | null = null;
	let mdp : string | null = null;

	async function connect() {
		if (email == null || mdp == null) {
			return;
		}

		fetch("/api/session/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: mdp
			})
		}).then(async response => {
			if (response.status == 200) {
				await response.json().then(data => {
					if (data.connected){
						window.location.href = "/";
					} else {
						alert("Identifiants incorrects");
					}
				});
			} else {
				alert("Erreur de connexion");
			}
		});
	}

</script>


<Tailwindcss />

<!-- Page -->
<main>

	<div class="logo">
		<img
			src="https://www.adobe.com/express/create/logo/media_1ba2722b76062fb428e1071c5cd59a5d9bc7fb94f.jpeg?width=400&format=jpeg&optimize=medium"
			alt="Logo Arktio"
		/>
	</div>
	
	<div class="page">
		<form class="connection" action="javascript:" on:submit={connect}>
			<label for="email">Email</label>
			<input required type="email" id="email" name="email" bind:value={email}>
			<br/>
			<label for="password">Mot de passe</label>
			<input required type="password" id="password" name="password" bind:value={mdp}>

			<button id="entrer" type="submit">Connexion</button>
		</form>
	</div>


  <footer>
    <a href="url">condition générale d'utilisation</a>
    <a href="non je déconne">Politique de cookie</a>
    <a href="Qui est tu ?">Qui sommes nous ?</a>
  </footer>
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
