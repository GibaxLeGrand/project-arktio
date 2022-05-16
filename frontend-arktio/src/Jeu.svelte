<script lang="ts">
    import {lobbyStore, socketStore, stateStore, userStore} from "./stores/storeLibrary";
    import {router} from "tinro";
    import {get} from "svelte/store";
    import {State, TypeReponse} from "./types/types";

    // import { loop_guard } from "svelte/internal"; // c'est quoi ça ?

    let pions = [
        {id: 0, text: "Aucun"},
        {id: 1, text: "Boite de conserve"},
        {id: 2, text: "Terre"},
        {id: 3, text: "Plante"},
        {id: 4, text: "Grain de café"},
        {id: 5, text: "Bonnet"},
        {id: 6, text: "Papillon"},
        {id: 7, text: "Arrosoir"},
        {id: 8, text: "Nuage"},
    ];

    const NB_CASES = 30;

    let possibilites: { titre: string, messages: string[] };

    let local_uuid: string = $userStore.uuid;

    let quit_game_button_text: string = "Quitter";
    let print_yes_no: boolean = false;
    let message: string;

    /**
     * envoie un message à la base de donnée
     */
    function send_message() {
        if (message === undefined || message === "") {
            return;
        }
        $socketStore.emit("send message", message);
        message = "";

    }

    // listener pour toute réception de message
    $socketStore.on("recv message", ({player, message}) => {
        affiche_message(message);
    }).on("update gamestate", (state: State) => {
        stateStore.set(state);
    });

    $socketStore.on("start turn", (state: State)=> {
        stateStore.set(state);
        let container: HTMLElement = document.getElementById("conteneur");

        container.innerHTML = "";

        if (state.joueur_actuel === $userStore.uuid) {

            let titre: HTMLElement = document.createElement("div");
            titre.textContent = "Lancez votre dé";
            container.appendChild(titre);

            let _choix: HTMLElement = document.createElement("button");
            _choix.classList.add(`option0`);
            _choix.textContent = "Lancer le dé";
            _choix.onclick = () => {
                rollDice();
            };
            container.appendChild(_choix);
        } else {
            let elem: HTMLElement = document.createElement("span");
            elem.textContent = `C'est le tour de ${$lobbyStore.players.find(x => x.uuid === state.joueur_actuel).name}...`;
        }
    })

    $socketStore.on("end action", () => {
        let container: HTMLElement = document.getElementById("conteneur");

        container.innerHTML = "";


        if ($stateStore.joueur_actuel != local_uuid) {
            let elem: HTMLElement = document.createElement("span");
            elem.textContent = `C'est le tour de ${$lobbyStore.players.find(x => x.uuid === $stateStore.joueur_actuel).name}...`;
        } else {
            let titre: HTMLElement = document.createElement("div");
            titre.textContent = "Finissez votre tour";
            container.appendChild(titre);

            let _choix: HTMLElement = document.createElement("button");
            _choix.classList.add(`option0`);
            _choix.textContent = "Fin de tour";
            _choix.onclick = () => {
                $socketStore.emit("end turn");
            };
            container.appendChild(_choix);
        }
    })

    $socketStore.on("choix", (possibilites: TypeReponse, callback: (number) => void) => {
        let container: HTMLElement = document.getElementById("conteneur");

        container.innerHTML = "";


        if ($stateStore.joueur_actuel != local_uuid) {
            let elem: HTMLElement = document.createElement("span");
            elem.textContent = `C'est le tour de ${$lobbyStore.players.find(x => x.uuid === $stateStore.joueur_actuel).name}...`;
        } else {
            let titre: HTMLElement = document.createElement("div");
            titre.textContent = possibilites.titre;
            container.appendChild(titre);

            for (let i = 0; i < possibilites.messages.length; i++) {
                let _choix: HTMLElement = document.createElement("button");
                _choix.classList.add(`option${i}`);
                _choix.textContent = possibilites.messages[i];
                _choix.onclick = () => {
                    callback(i);
                };
                container.appendChild(_choix);
            }
        }
    });

    function rollDice() {
        $socketStore.emit("dice", (resultat: TypeReponse) => {
            let container: HTMLElement = document.getElementById("conteneur");
            container.innerHTML = "";

            let resultat_affiche: HTMLElement = document.createElement("div");
            resultat_affiche.textContent = resultat.titre;

            let _choix: HTMLElement = document.createElement("button");
            _choix.classList.add(`option0`);
            _choix.textContent = resultat.messages[0];
            _choix.onclick = (() => $socketStore.emit("play"));
            container.appendChild(_choix);

            container.appendChild(resultat_affiche);
        });
    }

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
        console.log("quit");
        get(socketStore).emit("quit", () => {
            router.goto("/");
            lobbyStore.set(null);
            stateStore.set(null);
        });

    }


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
            child["ariaLabel"] = "item de l'inventaire'";
        } else {
            child.title = item_name;
            child["ariaLabel"] = item_name;
        }
        child.style.cssText =
            "background-image: url(" +
            path_to_img +
            ");display:flex;max-width:100px;max-height:100px;width:100px;height:100px;background-size:100px;justify-self: space-between;";

        console.log(path_to_img);
        console.log(child.style.cssText);

        inventaire.appendChild(child);
    }

    function pos_case(number: number) {
        if (number < 7) {
            return "cases_haut";
        } else if (number < 15) {
            return "cases_droite";
        } else if (number < 22) {
            return "cases_bas";
        } else {
            return "cases_gauche";
        }
    }

    function affichage_pions() {
        document.querySelectorAll("pion").forEach(p => p.remove());

        for (let joueurID of $stateStore.ordre_joueurs) {
            let _pos: number = $stateStore.joueurs[joueurID].caseActuelle.position;
            let nom_pion: string = pions[$stateStore.joueurs[joueurID].pion].text;

            let _case: HTMLElement = document.getElementById(`x${_pos + 1}`);

            let _pion: HTMLImageElement = document.createElement("img");
            _pion.src = `./Pions/pion_${nom_pion}.PNG`
            _pion.alt = `Pion ${nom_pion} de ${$lobbyStore.players[joueurID].name}.`;
            _pion.classList.add("pion");

            _case.appendChild(_pion);
        }
    }

</script>

<main>
    <div class="plateau">
        {#each $stateStore.plateau as _case, index}
            <div id={"x" + (index+1)}
                 class={pos_case($stateStore.plateau.indexOf(_case))}
                 style={`background-size: contain; background-repeat: no-repeat; background-color: #ffffff; background-position:center; background-image: url(./Cases/case_${_case.id_name}.PNG);`}>

            </div>
        {/each}
        <div id="conteneur">

        </div>

        <div id="titre_inventaire">Inventaire</div>
        <div id="inventaire"/>
        <div id="chat"/>
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
            {#each $stateStore.ordre_joueurs as joueurID}
                <div id={`classement_1`}>{joueurID}</div>
            {/each}
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

<!-- CSS -->
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
    display: block;
    width: 100%;
    background-color: $turquoise;
    font-size: x-large;
    color: #ffffff;
  }

  div {
    display: grid;
    align-items: normal;
  }

  button {
    width: fit-content;
    height: fit-content;
    align-self: flex-end;
    display: inline-flex;
    justify-self: space-around;
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
    color: black;
    padding: 0.4em;
    margin-bottom: initial;
    border-radius: 10px;
  }


  // plateau
  .plateau {
    display: grid;
    width: 100%;
    height: 100%;
    //border: solid $framboise;
    //border-width: 5px;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: repeat(10, $taille_case);
    grid-template-columns: repeat(11, $taille_case);
  }

  // toutes les cases y compris contener + autres div
  /*
  .plateau > div {
    border: dashed black;
  }
*/
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


  // bloc action
  #conteneur {
    display: block;
    grid-column-start: 4;
    grid-column-end: 9;
    grid-row-start: 2;
    grid-row-end: 10;
    border: dashed red;
    color: $gris_fonce;
  }

  #event {
    background-color: $framboise;
    height: 20%;
  }

  #image {
    background-color: #fff;
    height: 50%;
  }

  .options {
    width: 40%;
    align-items: center;
    justify-content: space-around;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-right: 4.5%;
    margin-left: 4.5%;
  }


  // bouton quitter
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


  // classement
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


  // inventaire
  #titre_inventaire {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    justify-content: center;
    align-items: flex-end;
    font-size: 3vw;
    color: $gris_fonce;
    border: none;
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


  // tchat
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
    height: 25em;
  }

  #send_message {
    width: 80%;
    font-size: 70%;
    justify-content: center;
    justify-self: flex-end;
    align-self: center;
    margin: 0.4em;
    grid-column-start: 11;
    grid-row-start: 6;
  }


  // grille
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
