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

/* balise */
main {
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
	width: 100vw;
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


select {
	background-color: var(--blanc);
	border-radius: 1em;
}


a {
	margin-inline: 1em;
	font-family: var(--font_arktio);
}

a:link {
  color: var(--blanc);
}

a:visited {
  color: var(--blanc);
}

a:focus {
  background: var(--turquoise);
}

a:hover {
  background: var(--turquoise);
}

a:active {
  background: var(--turquoise);
  color: var(--blanc);
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


/* classe */
.boutons {
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 50vw;
	padding: 1em;
}


.player {
	background-color: var(--blanc);
	padding: 1em;
	margin: 5px;
	width: 80%;
	border-radius: 1em;
}


.droite {
	float: right;
}


.gauche {
	float: left;
}


.connection {
	padding: 1em;
}


/* id */
#block {
	display: flex;
	flex-direction: row;
	width: 50%;
}


#players {
	display: flex;
	flex-direction: column;
	background-color: var(--caramel);
	border: solid var(--gris) 5px;
	border-radius: 1em;
	width: 50%;
	padding: 1em;
}


#choix_pion {
	background-color: var(--caramel);
	padding: 1em;
	margin: 1em;
	align-items: center;
	border: solid var(--gris) 5px;
	border-radius: 1em;
}


#chatbox {
    text-align:left;
    margin: 1em auto;
    padding: 1em;
    background: var(--blanc);
	border-radius: 1em;
    border: solid var(--gris);
	width: 70%;
	height: 20em;
	color: var(--turquoise);
}


#msg {
    width: 50%;
    border-radius: 1em;
    border: solid var(--gris);
	color: var(--turquoise);
}


#envoyer {
	width: 5em; 
	border-radius: 1em;
    border: solid var(--gris);
	color: var(--turquoise);
	background-color: var(--blanc);
}


/* media */

@media (max-width: 640px) {

	div {
		width: 100%;
	}

} 
</style>



