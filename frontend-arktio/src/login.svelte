<!-- Script -->
<script lang="ts">
	import {connect} from "./scripts/userScripts";
	import {router} from "tinro";


	let email: string | null = null;
	let mdp: string | null = null;

	let test = true;

	function erreur() {
		test = !test;
	}
</script>


<!-- Page -->
<main>
	<div class="logo">
		<img alt="logo" src="logo.png"/>
	</div>

	<div class="boutons">
		<form
			class="connection"
			action="javascript:"
			on:submit={() => {
			connect(email, mdp);
			}}
		>
			<label for="email">Email</label>
			<input required type="email" id="email" name="email" bind:value={email} />
			<br />
			<label for="password">Mot de passe</label>
			<input
				required
				type="password"
				id="password"
				name="password"
				bind:value={mdp}
			/>

			{#if !test}
				<h1>Le mail/mot de passe n'est pas correct.</h1>
			{/if}
			<button id="entrer" type="submit">Connexion</button>
			<button id="retour" on:click={()=>router.goto("/")}>Retour</button>
		</form>
	</div>
	
</main>

<!-- CSS -->

  