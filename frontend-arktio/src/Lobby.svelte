<script lang="ts">
    import Tailwindcss from "./Tailwindcss.svelte";
  
    let name_lobby: string = "XXXX";

    let pions =[ 
      {id: 0, text: "Aucun"},
      {id: 1, text: "Boite de conserve"},
      {id: 2, text: "Terre"},
      {id: 3, text: "Plante"},
      {id: 4, text: "Grain de café"},
      {id: 5, text: "Bonnet"},
      {id: 6, text: "Papillon"},
      {id: 7, text: "Arosoir"},
      {id: 8, text: "Nuage"}
  ]
  
    class Player_lobby{
      present: boolean;
      name: string;
      pion: {id: number, text: string};
  
      constructor(present:boolean = false, name: string = ""){
        this.present = present;
        this.name = name;
      }
    }
  
    // Joueur-euse local
    let player_local: Player_lobby = new Player_lobby(true, "Honeyxilia");
    let is_lobby_owner: boolean = false;
  
    // Autres joueur-euses dans le lobby 
    let player_1: Player_lobby = new Player_lobby();
    let player_2: Player_lobby = new Player_lobby();
    let player_3: Player_lobby = new Player_lobby();
  
    let players:Player_lobby[] = [player_1, player_2, player_3]

    /**
     * Fonction pour bloquer les options de pions déjà pris dans le select
     */
    function update_pions_occupes(){
      let choix_pions = document.getElementById('players').children;


      for(let i = 0; i++; i < choix_pions.length ){
        choix_pions[i].removeAttribute("disabled");
      }

      for(let player in players){
        choix_pions[player.pion.id+1].setAttribute("disabled", "");
      }
    }
  </script>
  
  <Tailwindcss />
  
  <main>
  <div class="logo">logo ici</div>
  
  <h id="lobby_name">Lobby {name_lobby}</h>
  <label for="players">Joueur-euses :</label>  
  <div id="players">
          <div class="player">
            <span class="gauche">{player_local.present ? player_local.name : "---------"}</span>
            <span class="droite">{player_local.pion ? player_local.pion.text : "---------"}</span>
          </div>
          <div class="player">
            <span class="gauche">{player_1.present ? player_1.name : "---------"}</span>
            <span class="droite">{player_1.present ? player_1.pion.text : "---------"}</span>
          </div>
          <div class="player">
            <span class="gauche">{player_2.present ? player_2.name : "---------"}</span>
            <span class="droite">{player_2.present ? player_2.pion.text : "---------"}</span>
          </div>
          <div class="player">
            <span class="gauche">{player_3.present ? player_3.name : "---------"}</span>
            <span class="droite">{player_3.present ? player_3.pion.text : "---------"}</span>
          </div>
  </div>
  
    <select id="select_pion" bind:value ={player_local.pion}>
      {#each pions as pion}
        <option value={pion}>{pion.text}</option>
      {/each}
    </select>
     
  
    {#if is_lobby_owner}
      <button aria-label="Lancer la partie" class="valider">Commencer partie</button>
    {:else}
      <button aria-label="Lancer la partie" class="valider" disabled>En attente du début de partie</button>
    {/if}
  
    <footer>this is the footer</footer>
  </main>
  
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

    .valider{
      padding: 3em;
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
  