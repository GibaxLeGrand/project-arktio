<script lang="ts">
    import Tailwindcss from "./Tailwindcss.svelte";

    const NB_CASES = 30;

    enum Etat{
        intact,
        outil
    }

    enum Statut{
        en_jeu,
        absent
    }

    class Plateau{
        readonly cases: Case[];

        constructor(id_event: number[]){
            for(let i = 0; i < NB_CASES; i++){
                this.cases.concat(new Case(i, id_event[i]));
            }
        }
    }

    class Case{
        id: number;
        event: number;
        // x: number;
        // y: number;

        constructor(id: number, event: number){
            this.id = id;
            this.event = event;
        }
    }

    class Inventaire{
        objets: number[];
        etat: Etat[];

        ajouter_objet(id_objet: number, etat: Etat){
            this.objets.concat(id_objet);
            this.etat.concat(etat);
        }

        supprimer_objet(idx_objet: number){
            if(idx_objet >= this.objets.length) return;

            this.objets.splice(idx_objet, 1);
            this.etat.splice(idx_objet, 1);
        }

        objet_aleatoire(): number{
            if(this.objets.length == 0 || this.etat.filter(et => et == Etat.intact).length == 0) return;

            let idx_objet: number;

            do{
                idx_objet = Math.floor(Math.random() * (this.objets.length))
            }while(this.etat[idx_objet] ==  Etat.outil);

            return idx_objet;
        }

        /*
        reparer_objet(idx_objet: number, idx_outil: number = -1){
            this.etat[idx_objet] = Etat.intact;

            if(idx_outil != -1) this.supprimer_objet(idx_outil);
        }
        */
    }
    
    class Joueur{
        private uid: number;
        protected statut: Statut = Statut.en_jeu;
        protected argent: number = 1000;
        protected pt_terre: number = 0;
        protected inventaire: Inventaire;
        protected pion: number;
        protected case_actuelle: Case;

        constructor(uid: number, pion: number){
            this.uid = uid;
            this.pion = pion;
        }

        getUid(): number { return this.uid; }

        ajouter_argent(somme: number){ this.argent += somme; }

        retirer_argent(somme: number){
            if(this.argent > somme){
                this.statut = Statut.absent;
                this.argent = 0;
                return;
            }
            this.argent -= somme;
        }

        ajouter_pt_terre(pts: number){ this.pt_terre += pts; }

        nouvelle_case(dice_number: number){ this.case_actuelle = plateau.cases[(this.case_actuelle.id + dice_number)%30]; }
    }

    let plateau = new Plateau(null);

</script>

<main>
    <Tailwindcss/>
</main>

<style lang="scss">
    $nb_cases_horizontal: 5;
    $nb_cases_vertical: 8;
    $taille_case: 1fr;

    $turquoise: #00a19a;
    $blanc: #ffffff;
    $framboise: #ba105a;
    $caramel: #ffd49a;
    $turquoise_clair: #98d1cd;
    $gris: #90908f;
    $gris_fonce: #2c2c2c;
    $font_arktio: Raleway;

    #plateau{
        grid-template-areas: 
            "case cases_horizontal case"
            "cases_vertical event cases_vertical"
            "case cases_horizontal case"
            ;
    }

    #event{
        grid-area: event;

        width: #{$nb_cases_horizontal*$taille_case};
        height: #{$nb_cases_vertical*$taille_case};
    }

    .case{
        grid-area: case;

        width: $taille_case;
        height: $taille_case;
    }

    .cases_horizontal{
        grid-area: cases_horizontal;

        width: #{$nb_cases_horizontal*$taille_case};
        height: $taille_case;
    }

    .cases_vertical{
        grid-area: cases_vertical;

        width: $taille_case;
        height: #{$nb_cases_vertical*$taille_case};
    }

</style>