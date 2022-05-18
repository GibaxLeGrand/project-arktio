<style global lang="scss">
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
    width: 100%;
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
    width: 100%;
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
    height: 1em;
    width: 60%;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 10em;
    border: solid var(--gris);
  }

  button {
    text-align: center;
    background-color: var(--blanc);
    font-size: x-large;
    height: fit-content;
    color: var(--turquoise);
    margin: 1em;
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
    display: inherit;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 1em;
    margin: 0 auto;
    background-color: var(--gris_fonce);
  }

  /* classe */
  .boutons {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
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

  /* id */
  #block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    padding: 1em;
    background-color: var(--caramel);
    border: solid var(--gris) 5px;
    border-radius: 1em;
  }

  #players {
    display: inherit;
    flex-direction: column;
    width: 50%;
    padding: 1em;
  }

  #tchat {
    display: inherit;
    flex-direction: column;
    text-align: left;
      justify-content: flex-start;
    padding: 1em;
    height: 100%;
    width: 50%;
  }

  #chat::-webkit-scrollbar {
    width: 16px;
    background-color: #F5F5F500;
  }

  #chat::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    width: 8px;
    -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.3);
    border: 3px solid var(--blanc);
    background-color: #555;
  }

  #month {
    font-family: var(--font_arktio);
    text-align: center;
    font-size: xx-large;
  }

  #msg,
  #envoyer {
    width: 100%;
  }

  #chatbox {
    overflow: hidden;
    text-align: left;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      word-break: break-all;
    margin: 1em auto;
    padding: 1em;
    background: var(--blanc);
    border-radius: 1em;
    border: solid var(--gris);
    width: 80%;
    height: 18em;
    color: var(--turquoise);
    overflow-y: scroll;
  }
  #chatbox::-webkit-scrollbar {
    width: 16px;
    background-color: #F5F5F500;
  }

  #chatbox::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    width: 8px;
    -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.3);
    border: 3px solid var(--blanc);
    background-color: #555;
  }


  #choix_pion {
    background-color: var(--caramel);
    padding: 1em;
    margin: 1em;
    align-items: center;
  }

  #msg {
    border-radius: 1em;
    border: solid var(--gris);
  }

  #envoyer {
    border-radius: 1em;
    border: solid var(--gris);
    color: var(--turquoise);
    margin: 0;
  }

  .option0 .option1 .option2 .option3 {
    border-radius: 0;
  }

  /* media */

  @media (max-width: 640px) {
    div {
      width: 100%;
    }
  }
</style>
