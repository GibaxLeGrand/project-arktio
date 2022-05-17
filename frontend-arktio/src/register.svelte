<script lang="ts">
	import {register} from "./scripts/userScripts";
	import {router} from "tinro";
	

	let email: string | null = null;
	let password: string | null = null;
	let name: string | null = null;
	let confirm_password: string | null = null;

	let mail_exist: boolean = false;
	function erreur() {
		mail_exist = !mail_exist;
	}

	let same_psw: boolean = true;
	function test_psw() {
		same_psw = password == confirm_password;
	}

</script>


<main>
	<div class="logo">
		<img alt="logo" src="logo.png"/>
	</div>

	<div class="boutons">
		<form
			class="connection"
			action="javascript:"
			on:submit={() => register(name, email, password, confirm_password)}
		>
			<label for="name">Nom du joueur:</label>
			<input required type="text" id="name" name="name" bind:value={name}/>

			<label for="email">Adresse mail:</label>
			<input required type="email" id="email" name="email" bind:value={email}/>
			
			{#if mail_exist}
				<h1>Ce mail à déjà était utilisé.</h1>
			{/if}

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

			{#if !same_psw}
				<h1>Les deux mots de passe ne sont pas identique.</h1>
			{/if}

			<button id="validate" type="submit" on:click={test_psw}>S'inscrire</button>
			<button id="retour" on:click={()=>router.goto("/")}>Retour</button>
				
		</form>
	</div>
	
	
</main>
