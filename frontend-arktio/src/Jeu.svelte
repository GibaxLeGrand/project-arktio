<script lang="ts">
  import {socketStore} from "./stores/storeLibrary";
  import { router } from "tinro";
  import * as ioClient from "../../backend-arktio/node_modules/socket.io-client";
  import {get} from "svelte/store";
  const socket = get(socketStore);

  // import { loop_guard } from "svelte/internal"; // c'est quoi ça ?

  const NB_CASES = 30;

  let quit_game_button_text: string = "Quitter";
  let print_yes_no: boolean = false;
  let message: string;

  let Joueur_1 = "Joueur 1"; // nom du joueur en 1ere position
  let Joueur_2 = "Joueur 2"; // nom du joueur en 2e position
  let Joueur_3 = "Joueur 3"; // nom du joueur en 3e position
  let Joueur_4 = "Joueur 4"; // nom du joueur en 4e position

  socket.on("connect", () => {
    return;
  });

  /**
   * envoie un message à la base de donnée
   */
  function send_message() {
    if (message === undefined || message === "") {
      return;
    }

    if (socket.connected) {
      socket.emit("send message", message);
      message = "";
    }
    return;
  }

  // listener pour toute réception de message
  socket.on("recv message", ({player, message}) => {
    affiche_message(message);
  });

  /**
   * affiche le message dans le chat
   */
  function affiche_message(msg: string) {
    let chat_contener = document.getElementById("chat");
    const child = document.createElement("div");

    child.innerText = msg;
    child.style.backgroundColor = "#ba105a";
    child.style.width = "fit-content";
    child.style.height = "fit-content";
    child.style.display = "flex";
    child.style.flexDirection = "column";
    child.style.border = "solid grey";
    child.style.borderRadius = "10px";
    child.style.alignSelf = "space-around";
    child.style.marginTop = "1%";
    chat_contener.appendChild(child);
    chat_contener.scroll({
      top: 10000,
      behavior: "smooth",
    });
  }

  /**
   * handle the quit button
   */
  function quit_game_handler() {
    // change text on the button
    quit_game_button_text === "Abandonner la partie ?"
      ? (quit_game_button_text = "Quitter")
      : (quit_game_button_text = "Abandonner la partie ?");
    // toggle buttons yes and no
    print_yes_no == false ? (print_yes_no = true) : (print_yes_no = false);
  }

  /**
   * quit the game without asking if the button is yes
   */
  function quit() {
    // TODO
    router.goto("/");
  }

  enum Etat {
    intact, // cassable
    outil, // incassable
    cassé, // cassé
  }

  enum Statut {
    en_jeu,
    absent,
  }

  class Plateau {
    readonly cases: Case[];
    nombre_joueurs: number;

    // randomize_plateau(){}

    // TODO expliquer ou éclaircir mdr
    constructor(id_event: number[]) {
      this.cases = [];
      for (let i = 0; i < NB_CASES; i++) {
        this.cases.push(new Case(i, i));
      }
    }
  }

  class Case {
    id: number;
    event: number; // id de la fonction handler

    constructor(id: number, event: number) {
      this.id = id;
      this.event = event;
    }
  }

  class Inventaire {
    objets: { [key: number]: { etat: Etat } };

    possede_objet(id: number): boolean {
      return this.objets[id] !== undefined;
    }

    ajouter_objet(id_objet: number, etat: Etat) {
      this.objets[id_objet] = { etat: etat };
    }

    supprimer_objet(idx_objet: number) {
      if (!this.possede_objet(idx_objet)) return;
      delete this.objets[idx_objet];
    }

    __objets_cassables(): number[] {
      return Object.keys(this.objets)
        .filter((id) => this.objets[id].etat === Etat.intact)
        .map((id) => parseInt(id));
    }

    // renvoie l'indice d'un objet de l'inventaire
    objet_aleatoire(): number {
      let objets_cassables = this.__objets_cassables();
      if (objets_cassables.length == 0) return -1;

      let index_objet = Math.floor(Math.random() * objets_cassables.length);
      return objets_cassables[index_objet];
    }

    casser_objet(idx_objet: number) {
      if (!this.possede_objet(idx_objet)) return;
      this.objets[idx_objet].etat = Etat.cassé;
    }

    reparer_objet(idx_objet: number, idx_outil: number) {
      if (!this.possede_objet(idx_objet)) return;
      this.objets[idx_objet].etat = Etat.intact;
      this.supprimer_objet(idx_outil);
    }
  }

  class Joueur {
    private uid: number;
    protected statut: Statut = Statut.en_jeu;
    protected argent: number = 1000;
    protected pt_terre: number = 0;
    protected inventaire: Inventaire;
    protected pion: number;
    protected case_actuelle: Case;

    constructor(uid: number, pion: number) {
      this.uid = uid;
      this.pion = pion;
      this.inventaire = new Inventaire();
      this.case_actuelle = plateau.cases[0];
    }

    getUid(): number {
      return this.uid;
    }

    ajouter_argent(somme: number) {
      this.argent += somme;
    }

    retirer_argent(somme: number) {
      if (this.argent < somme) {
        this.statut = Statut.absent;
        this.argent = 0;
        return;
      }
      this.argent -= somme;
    }

    ajouter_pt_terre(pts: number) {
      this.pt_terre += pts;
    }

    retirer_pt_terre(pts: number) {
      this.pt_terre -= pts;
    }

    // actualise la case selon le lancé de dé
    nouvelle_case(dice_number: number) {
      this.case_actuelle =
        plateau.cases[(this.case_actuelle.id + dice_number) % 30];
    }
  }

  let plateau = new Plateau(null);

  /**
   * ajoute un item dans l'inventaire avec l'image path_to_img
   * @param path_to_img
   * @param item_name description brève de l'itème
   * @throws path_to_img is empty in add_item_inventory()
   */
  function add_item_inventory(path_to_img: string, item_name: string) {
    if (path_to_img == "" || path_to_img == undefined || path_to_img == null) {
      throw new Error("path_to_img is empty in add_item_inventory()");
    }
    let inventaire = document.getElementById("inventaire");
    const child = document.createElement("div");

    if (item_name == "" || item_name == undefined || item_name == null) {
      child.title = "item de l'inventaire";
      child.ariaLabel = "item de l'inventaire'";
    } else {
      child.title = item_name;
      child.ariaLabel = item_name;
    }
    child.style.cssText =
      "background-image: url(" +
      path_to_img +
      ");display:flex;max-width:100px;max-height:100px;width:100px;height:100px;background-size:100px;justify-self: space-between;";

    console.log(path_to_img);
    console.log(child.style.cssText);

    inventaire.appendChild(child);
  }
</script>

<main>
  <div class="plateau">
    <div id="x1" class="cases_haut">X 1</div>
    <div id="x2" class="cases_haut">X 2</div>
    <div id="x3" class="cases_haut">X 3</div>
    <div id="x4" class="cases_haut">X 4</div>
    <div id="x5" class="cases_haut">X 5</div>
    <div id="x6" class="cases_haut">X 6</div>
    <div id="x7" class="cases_haut">X 7</div>
    <div id="x8" class="cases_droite">X 8</div>
    <div id="x9" class="cases_droite">X 9</div>
    <div id="x10" class="cases_droite">X 10</div>
    <div id="x11" class="cases_droite">X 11</div>
    <div id="x12" class="cases_droite">X 12</div>
    <div id="x13" class="cases_droite">X 13</div>
    <div id="x14" class="cases_droite">X 14</div>
    <div id="x15" class="cases_droite">X 15</div>
    <div id="x16" class="cases_bas">X 16</div>
    <div id="x17" class="cases_bas">X 17</div>
    <div id="x18" class="cases_bas">X18</div>
    <div id="x19" class="cases_bas">X 19</div>
    <div id="x20" class="cases_bas">X 20</div>
    <div id="x21" class="cases_bas">X 21</div>
    <div id="x22" class="cases_bas">X 22</div>
    <div id="x23" class="cases_gauche">X 23</div>
    <div id="x24" class="cases_gauche">X 24</div>
    <div id="x25" class="cases_gauche">X 25</div>
    <div id="x26" class="cases_gauche">X 26</div>
    <div id="x27" class="cases_gauche">X 27</div>
    <div id="x28" class="cases_gauche">X 28</div>
    <div id="x29" class="cases_gauche">X 29</div>
    <div id="x30" class="cases_gauche">X 30</div>
    <div id="conteneur">
      <div id="event">"ÉVÉNEMENTS ( tu dois payer ...)"</div>
      <div id="image">image</div>
      <!-- // TODO remove on:click={() => {
                add_item_inventory("../logo.png", "informations");
              }} -->

      <button id="option1" class="options">options 1</button>
      <button id="option2" class="options">options 2</button>
      <button id="option3" class="options">options 3</button>
      <button id="option4" class="options">options 4</button>
    </div>

    <div id="titre_inventaire">Inventaire</div>
    <div id="inventaire" />
    <div id="chat" />
    <input
      type="text"
      method="POST"
      id="input"
      bind:value={message}
      on:keydown={(key) => {
        if (key.key == "Enter") send_message();
      }}
    />
    <button type="submit" id="send_message" on:click={send_message}>
      Envoyer
    </button>
    <div id="classement">
      <div id="classement_1">{Joueur_1}</div>
      <div id="classement_2">{Joueur_2}</div>
      <div id="classement_3">{Joueur_3}</div>
      <div id="classement_4">{Joueur_4}</div>
    </div>
    <button id="quit_game" on:click={quit_game_handler}
      >{quit_game_button_text}</button
    >
    {#if print_yes_no}
      <button on:click={quit} class="bouton_choix" id="boutonoui">OUI</button>
      <button on:click={quit_game_handler} class="bouton_choix" id="boutonnon"
        >NON
      </button>
    {/if}
  </div>
</main>

<style lang="scss">
  $nb_cases_horizontal: 5;
  $nb_cases_vertical: 10; // les cases dans les coins sont comptées
  $taille_case: 1fr;

  $turquoise: #00a19a;
  $blanc: #ffffff;
  $framboise: #ba105a;
  $caramel: #ffd49a;
  $turquoise_clair: #98d1cd;
  $gris: #90908f;
  $gris_fonce: #2c2c2c;
  $font_arktio: Raleway;

  main {
    width: 100%;
    height: 100%;
    background-color: $turquoise_clair;

    justify-content: center;
    align-items: center;

    font-size: xx-large;
    color: #ffffff;
    font-family: $font_arktio;
  }

  .plateau {
    width: 100%;
    height: 100%;
    border: solid $framboise;
    border-width: 5px;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: repeat(10, $taille_case);
    grid-template-columns: repeat(11, $taille_case);
  }

  // toutes les cases y compris contener + autres div
  .plateau > div {
    border: dashed black;
  }

  // 1 -> 7
  .cases_haut {
    grid-row-start: 1;
  }

  // 8 -> 15
  .cases_droite {
    grid-column-start: 9;
  }

  // 16 -> 22
  .cases_bas {
    grid-row-start: 10;
  }

  // 23 -> 30
  .cases_gauche {
    grid-column-start: 3;
  }

  #conteneur {
    grid-column-start: 4;
    grid-column-end: 9;
    grid-row-start: 2;
    grid-row-end: 10;

    border: dashed red;
    color: #2c2c2c;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  // actualise la case selon le lancé de dé

  #event {
    background-color: $framboise;
    height: 20%;
  }

  #image {
    background-color: #fff;
    height: 50%;
  }

  button {
    width: fit-content;
    height: fit-content;
    align-self: flex-end;
    display: inline-flex;
    justify-content: space-around;
    border: solid $gris;
    background-color: $blanc;
    border-radius: 10px;
    color: $gris_fonce;
  }

  button:hover {
    background-color: rgb(41, 39, 39);
    color: $blanc;
  }

  button:active {
    background-color: rgb(150, 150, 150);
  }

  .options {
    height: 7%;
    width: 40%;
    align-items: center;
    justify-content: space-around;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-right: 4.5%;
    margin-left: 4.5%;
  }

  .bouton_choix {
    width: 80%;
    justify-content: center;
    align-items: center;
    justify-self: center;
  }

  #boutonoui {
    grid-column-start: 2;
    grid-row-start: 2;
  }

  #boutonnon {
    grid-column-start: 1;
    grid-row-start: 2;
  }

  #quit_game {
    grid-column-start: 1;
    grid-column-end: 3;
    height: 100%;
    width: 70%;
    font-size: 2vw;

    justify-content: center;
    align-items: center;
    justify-self: left;
    margin-top: auto;
  }

  #titre_inventaire {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 3vw;
    color: $gris_fonce;
    border: none;
  }

  #classement {
    grid-column-start: 10;
    grid-column-end: 12;
    grid-row-start: 7;
    grid-row-end: 11;
    display: flex;
    border: dashed $caramel;
    color: $gris_fonce;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  #classement_1 {
    background-color: #fff;
    width: 80%;
  }

  #classement_2 {
    background-color: rgb(255, 232, 232);
    width: 80%;
  }

  #classement_3 {
    background-color: rgb(255, 174, 174);
    width: 80%;
  }

  #classement_4 {
    background-color: rgb(255, 134, 134);
    width: 80%;
  }

  #inventaire {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 11;
    border: dashed $caramel;

    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
  }

  #chat {
    grid-column-start: 10;
    grid-column-end: 12;
    grid-row-start: 1;
    grid-row-end: 6;

    width: 100%;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-direction: column;
    overflow: auto;
    overflow-wrap: anywhere;
    overflow-x: unset;
  }

  // TODO gérer la taille de ce truc
  input {
    width: 55%;
    height: fit-content;
    font-size: 60%;
    font-family: $font_arktio;
    display: flex;
    justify-content: center;
    justify-self: flex-start;
    align-self: center;
    grid-column-start: 10;
    grid-column-end: 13;
    grid-row-start: 6;

    color: #000000;
  }

  // bouton
  #send_message {
    width: 80%;
    font-size: 70%;
    justify-content: center;
    justify-self: flex-end;
    align-self: center;

    grid-column-start: 11;
    grid-row-start: 6;
  }

  #image {
    align-self: center;
  }

  #x1 {
    grid-column-start: 3;
  }

  #x2 {
    grid-column-start: 4;
  }

  #x3 {
    grid-column-start: 5;
  }

  #x4 {
    grid-column-start: 6;
  }

  #x5 {
    grid-column-start: 7;
  }

  #x6 {
    grid-column-start: 8;
  }

  #x7 {
    grid-column-start: 9;
  }

  #x8 {
    grid-row-start: 2;
  }

  #x9 {
    grid-row-start: 3;
  }

  #x10 {
    grid-row-start: 4;
  }

  #x11 {
    grid-row-start: 5;
  }

  #x12 {
    grid-row-start: 6;
  }

  #x13 {
    grid-row-start: 7;
  }

  #x14 {
    grid-row-start: 8;
  }

  #x15 {
    grid-row-start: 9;
  }

  #x16 {
    grid-column-start: 9;
  }

  #x17 {
    grid-column-start: 8;
  }

  #x18 {
    grid-column-start: 7;
  }

  #x19 {
    grid-column-start: 6;
  }

  #x20 {
    grid-column-start: 5;
  }

  #x21 {
    grid-column-start: 4;
  }

  #x22 {
    grid-column-start: 3;
  }

  #x23 {
    grid-row-start: 9;
  }

  #x24 {
    grid-row-start: 8;
  }

  #x25 {
    grid-row-start: 7;
  }

  #x26 {
    grid-row-start: 6;
  }

  #x27 {
    grid-row-start: 5;
  }

  #x28 {
    grid-row-start: 4;
  }

  #x29 {
    grid-row-start: 3;
  }

  #x30 {
    grid-row-start: 2;
  }
</style>
