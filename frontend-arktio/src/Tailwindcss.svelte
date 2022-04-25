<style global>
/*
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
*/
	

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
	font-family: Raleway;
}

img {
	width: 15rem;
	height: 15rem;
	margin: 1rem;
}

button{
	align-items: center;
	text-align: center;
	background-color: #ffffff;
	font-size: 100%;
	height: 6vh;
	color: #00a19a;
    margin: 2%;
    background-color: #ffffff;
    width: 50%;
    border-radius: 10em;
    border: solid #90908f;
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
	font-family: Raleway;
	color: #ffffff;
}

footer {
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 0;
	width: 100vW;
	padding: 1em;
	margin: 0 auto;
	background-color: #98d1cd;
}

@media (max-width: 640px) {

	div {
		width: 100%;
	}

} 


</style>
