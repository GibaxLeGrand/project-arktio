<style global>

:root {
	--turquoise: #00a19a;
	--blanc: #ffffff;
	--framboise: #ba105a;
	--caramel: #ffd49a;
	--turquoise_clair: #98d1cd;
	--gris: #90908f;
	--gris_fonce: #2c2c2c;
	--font_arktio: Raleway;
}

main {
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
}


div {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: var(--font_arktio);
}


img {
	width: 15rem;
	height: 15rem;
	margin: 1rem;
}


form {
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 50vw;
}


label {
	color: var(--blanc);
	font-size: x-large;
}


input {
	display: inherit;
	color: var(--turquoise);
	text-align: center;
	background-color: var(--blanc);
	font-size: x-large;
	height: 5vh;
	width: 60%;
	padding: 1em;
	margin: 2%;
    border-radius: 10em;
    border: solid var(--gris);
}


button{
	align-items: center;
	text-align: center;
	background-color: var(--blanc);
	font-size: 100%;
	height: 6vh;
	color: var(--turquoise);
	margin: 2%;
	width: 50%;
	border-radius: 10em;
	border: solid var(--gris);
}


.boutons {
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 50vw;
	padding: 1em;
}

a {
	margin-inline: 1em;
	font-family: var(--font_arktio);
	color: #ffffff;
}


h1 {
	color: var(--framboise);
	font-size: x-large;
	text-align: center;
}


footer {
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 0;
	width: 100vW;
	padding: 1em;
	margin: 0 auto;
	background-color: var(--turquoise_clair);
}


.connection {
	padding: 1em;
}


@media (max-width: 640px) {

	div {
		width: 100%;
	}

} 
</style>



