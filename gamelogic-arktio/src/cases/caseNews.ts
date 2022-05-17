import {Case, TypeReponse} from "../caseManager";
import {State} from "../state";

export default class CaseNews implements Case {
    name = "News";
    id_name = "news";
    max_number = 2;

    private static publicite: [string, number, number][]= [];
    private static bufferChoice: Map<string, [string, number, number]> = new Map();

    static {
        CaseNews.publicite.push(["Pars à la rencontre des associations universitaires lors de l'Agora de rentrée. C'est l'occasion de rencontrer des étudiants impliqués et créer de nouveaux liens.", 5, 5]);
        CaseNews.publicite.push(["Un.e nouvel.le ami.e te propose d'aller au Street Bouche Festival. Rendez-vous place de Zurich pour découvrir la \"Food éco-responsable\" : https://streetbouche.com/", 10, 2]);
        CaseNews.publicite.push(["Campus Vert Strasbourg organise avec la Cellule de développement durable des ateliers DIY ! Au programme : confection de tawashi, dentifice et déodorant solides.", 5, 10]);
        CaseNews.publicite.push(["La place d'Austerlitz accueille le Jardin des Créateurs. Tu pourras rencontrer ses joaillier.e.s, couturier.e.s, modistes, spécialistes du bien-être et bien d'autres artisan.e.s.", 5, 5]);
        CaseNews.publicite.push(["Un duo composé d'une productrice en permaculture et un épicier en vrac expose les enjeux de l'empreinte carbone de nos aliments. Quelques personnes de ta promo y vont, te joins-tu à eux ?", 2, 5]);
        CaseNews.publicite.push(["On t'a parlé d'une petite épicerie proposant des produits bio et locaux à deux pas de chez toi. Ce serait l'occasion d'y faire un tour et de voir si tu peux y trouver ton bonheur, tu ne crois pas ?", 10, 10]);
        CaseNews.publicite.push(["Une association locale a monté un opéra ! Iels sont sur scène toute la semaine. Tenté.e d'assister à l'une de leurs représentations ?", 25, 5]);
        CaseNews.publicite.push(["Une librairie indépendante accueille Jeanne Burgart Goutal (écoféminisme), Camille Etienne (activisme) et Laëticia van de Walle (zéro déchet). Elles discuteront des enjeux et des connexions de leurs actions en faveur de la transition écologique.", 5, 15]);
        CaseNews.publicite.push(["Le département met en place un budget écocitoyen. De nombreux projets éco-responsables ont été soumis et tu peux soutenir ceux de ton choix. Les lauréats obtiendront une subvention et un accompagnement pour la mise en œuvre de leur projet.", 15, 20]);
        CaseNews.publicite.push(["Après des mois de préparation des créateurs que tu suis depuis la première heure s'apprêtent à lancer leur marque éco-responsable à Strasbourg. Une soiré est organisée à cette occasion. Souhaites-tu participer ?", 30, 20]);
        CaseNews.publicite.push(["C'est la journée locale du tri des mails ! Prends le temps de supprimer les messages dont tu n'as plus l'utilité et de bien organiser les autres. Tu te sentiras certainement un peu plus léger.e avec une boîte mail bien rangée et tu participes à limiter le stockage des données inutiles.", 0, 15]);
        CaseNews.publicite.push(["La CTS lance une nouvelle offre à destination des étudiants. C'est peut-être l'occasion d'adopter les transports en commun ?", 20, 20]);
        CaseNews.publicite.push(["Tu aimes les sensations mais le vélo n'est pas trop ton truc ? Pourquoi ne pas pencher pour les rollers ? Original, sportif et ludique, tu ne verras plus la ville de la même façon tout en limitant ton impact carbone !", 50, 15]);
        CaseNews.publicite.push(["La LPO et le CEN Alsace organisent une journée nature dans une réserve naturelle alsacienne (https://www.visit.alsace/nature-et-bien-etre/parcs-et-reserves-naturelles/). L'objectif est de participer à l'entretien du site et d'observer la faune et la flore locales. Et si tu rejoignais l'équipe ?", 5, 20]);
        CaseNews.publicite.push(["L'association Zero Waste Strasbourg organise un CleanUp Day sur les berges de l'Ill. Tu verras que collecter les déchets peut être convivial et gratifiant une fois le travail accompli !", 0, 20]);
        CaseNews.publicite.push(["Une sélection d'entrepreneurs présentent leur projet de start-up sous forme de pitch court mais percutant !", 0, 5]);
        CaseNews.publicite.push(["Le Shadok organise une Game Jam. Le principe : le temps d'un weekend des équipes de passionné.e.s aux profils hétéroclites travaillent sans relache pour pésenter un jeu, une application, un produit. Une expérience créative et intense qui peut donner lieu à de belles rencontres et d'incroyables projets !", 0, 5]);
    }

    play(state: State, playerID: string, choices: number[]) : State {
        let news: [string, number, number] = CaseNews.bufferChoice.get(playerID)!;

        state.joueurs[playerID].pointTerre += news[2];
        state.joueurs[playerID].argent -= news[1];

        CaseNews.bufferChoice.delete(playerID);
        return state;
    }

    getNews() : [string, number, number] {
        return CaseNews.publicite[Math.floor(Math.random() * CaseNews.publicite.length)];
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let messages: string[] = ["Je ne suis pas intéressé.e"];
        let news: [string, number, number] = this.getNews();
        CaseNews.bufferChoice.set(playerID, news);
        
        if (news[1] !== 0) 
            messages.push(`Verser ${news[1]}€ / Gagner ${news[2]} Points Terre`)
        else 
            messages.push(`Participer / Gagner ${news[2]} Points Terre`);
        
        return { titre: news[0], messages: messages };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}