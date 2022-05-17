<script lang="ts">
  import { router } from "tinro";

  let page = 1; // numéro de page actuelle
  const NB_PAGE = 55; // nombre de pages total

  // incrémente et décrémente page avec vérification
  function button_next_handler() {
    if (page == NB_PAGE) {
      return;
    }
    page++;
  }
  function button_previous_handler() {
    if (page == 1) {
      return;
    }
    page--;
  }
</script>

<main>
  <div>
    {#if page == 1}
      <section>
        Arktio est un jeu de plateau jouable de 1 à 4 joueurs avec comme thème
        centrale la transition écologique !<br /> L'objectif du jeu est d'obtenir
        un maximum de points terres tout en évitant de perdre tout son argent.
      </section>
    {/if}
    {#if page == 2}
      <section>
        Comment joue-t-on ? <br /> Les joueurs jouent chacun leur tour en
        lançant un dé allant de 1 à 6, désignant le nombre de cases qu'ils
        auront à traverser.<br />
        Lorsque les joueurs atterrissent sur une case, ils devront prendre part à
        l'action associé à cette dernière : <br />cela peut aller du troc entre
        joueurs à l'achat de nouveaux objets en passant par des bonus ou des
        problèmes.
      </section>
    {/if}
    {#if page == 3}
      <section>
        Condition de jeu<br />
        Le plateau d'Arktio possède 30 cases différentes que les joueurs vont parcourir
        au fur et à mesure de la manche.<br /> Une partie d'Arktio se déroule en
        10 manches, chaque manche représente un mois qui est associé à une
        thématique qui change les interactions possibles avec les cases
        présentes sur le plateau. <br />Chaque mois possède ses propres actions
        particulières qui seront précisé dans la section sur les mois.
      </section>
    {/if}
    {#if page == 4}
      <section>
        Au début de la première manche, chaque joueur commence avec 0 points
        terres et 1000€. A la fin de chaque manche, les joueurs récupèrent
        1000€. <br />Une manche d'Arktio se finit lorsque tous les joueurs ont
        atteint la case Jour de Paie, avant de démarrer la manche suivante.
        Lorsque la dernière manche est finie, un classement final est établi et
        le joueur avec le plus de points terres est élu vainqueur !
      </section>
    {/if}
    {#if page == 5}
      <section>
        Les joueurs :<br /> Dans Arktio, les joueurs incarnent un étudiant
        entamant sa transition écologique en parallèle de ses études. <br />Les
        joueurs pourront accumuler autant d'objet qu'ils le souhaitent. Certains
        objets possèdent des effets qui les fait interagir avec une action sur
        le plateau, comme des outils. Le joueur peut aussi adhérer à une
        association, ce qui leur fait gagner des points terres en fonction des
        évènements sur la carte.
      </section>
    {/if}
    {#if page == 6}
      <section>
        Petites précisions :<br /><br /> Si je n'ai plus d'argent ?<br /> Si à
        un moment vous tombez à court d'argent, vous aurez le droit de demander
        une fois par manche un don aux autres joueurs. Si ces derniers
        acceptent, ils pourront vous donner la somme qu'ils souhaitent, que vous
        devrez rembourser à la prochaine manche.<br /> Si vous avez déjà effectué
        une demande de don où que les autres joueurs refusent, alors vous arrêtez
        de jouer pour cette manche et devrez attendre la prochaine manche pour recommencer
        à jouer.
      </section>
    {/if}
    {#if page == 7}
      <section>
        Que faire si un joueur est AFK ?<br /> Chaque joueur a 60 secondes pour envoyer
        son dé et si le joueur doit effectuer un choix sur son action, il a entre
        60 et 120 secondes pour l'effectuer. Si le temps est écoulé, alors soit son
        tour est passé, soit il effectue une action choisie « par défaut ». Dans
        ces deux cas, le joueur reçoit un avertissement. Lorsque le joueur accumule
        3 avertissements, il sera expulsé de la partie en cours
      </section>
    {/if}
    {#if page == 8}<section>
        Précision sur les cases :<br />
        - Case Facture :<br /> Lorsque le joueur atterit sur cette case, il
        devra régler une facture choisie au hasard et payer la somme indiquée.<br
        /> Il y a une case de ce type sur le plateau.
      </section>{/if}
    {#if page == 9}<section>
        - Case achat objet :<br /> Lorsque le joueur atterrit sur cette case, il
        pourra choisir d'acheter un objet parmi les objets proposés à la somme
        proposée, lui faisant gagner ou perdre des points terres, ou de ne rien
        acheter. Les objets disponibles sont dépendants du mois.<br /> Il y a 3 cases
        de ce type sur le plateau.
      </section>{/if}
    {#if page == 10}<section>
        - Case Troc :<br /> Lorsque le joueur tombe sur cette case, il aura le
        choix de pouvoir faire un échange d'objet obtenu sur les cases outils
        avec un autre joueur.<br /> Il y a 2 cases de ce type sur le plateau.
      </section>{/if}
    {#if page == 11}<section>
        - Case Dimanche pour soi :<br /> Lorsque le joueur tombe sur cette case,
        le joueur prendra son dimanche pour effectuer une action sympathique. A
        noter que si le joueur possède certains objets, alors il sera capable
        d'effectuer certaines actions lui rapportant des points terres.<br /> Il
        y a 4 cases de ce type sur le plateau.
      </section>{/if}
    {#if page == 12}<section>
        - Case Engagement/Césure :<br /> Lorsque le joueur atterrit sur cette
        case, il pourra choisir d'adhérer à une des 4 causes différentes :<br
        /><br />
        - Engagement dans une association humanitaire / de justice sociale (Unicef,
        Amnesty international).<br />
        - Engagement pour une action de préservation d'une population, espèce ou
        d'un milieu menacé.e (Greenpeace, Sea Shepherd...) <br />- Engagement
        dans un groupe d'action local (Zéro déchet Strasbourg, Alternatiba...)
        <br />- Se former à des modes de production alternatifs (permaculture,
        agroécologie...) <br /><br />Chacune de ces causes permettent aux
        joueurs de gagner 20 points terres et d'avancer de 5 cases ! A note que
        le joueur ne peut qu'adhérer à une seule association à la fois.<br /> Il
        y a une case de ce type sur le plateau.
      </section>{/if}
    {#if page == 13}<section>
        Case Jour de course :<br />
        Lorsque le joueur tombe sur cette case, il devra choisir entre faire ses
        courses dans un magasin spécialisé, lui coûtant 45€ mais lui faisant gagner
        20 points terres (+ 15 points terres s'il possède un sac ou un vélo), ou
        alors il ira dans un magasin conventionnel, ce qui coûte 30€ mais faisant
        perdre 20 points terres.<br /> Il y a 4 cases de ce type sur le plateau
      </section>
    {/if}
    {#if page == 14}<section>
        - Case Problème :<br /> Lorsque le joueur tombe sur cette case, il lui
        arrivera un problème auquel il devra répondre. Selon le problème le
        joueur aura différents choix pour répondre aux problèmes :<br /> ces
        derniers seront précisés dans une partie leur étant réservé.<br /> Il y a
        2 cases de ce type sur le plateau.
      </section>{/if}
    {#if page == 15}<section>
        - Case informations générales :<br /> Lorsque le joueur atterrit sur
        cette case, le joueur recevra une information en rapport avec
        l'écologie. De plus, il gagnera 10 points terre.<br /> Il y a 3 cases de
        ce type sur le plateau
      </section>{/if}
    {#if page == 16}<section>
        - Case outils :<br /> Lorsque le joueur tombe sur cette case, le joueur
        recevra au hasard un objet entre 2 outils par mois qui peuvent être
        troqué ou utilisé pour résoudre un problème.<br /> Il y a 2 cases de ce type
        sur le plateau.
      </section>{/if}
    {#if page == 17}<section>
        - Case Publicité locale :<br /> Lorsque le joueur tombe sur cette case,
        il aura la possibilité de participer à une activité locale : il devra
        payer l'entrée, mais gagnera des points terre.<br /> Il y a 2 cases de ce
        type sur le plateau.
      </section>{/if}
    {#if page == 18}<section>
        - Case événements :<br /> Lorsque le joueur tombe sur cette case, il
        obtiendra 10 points terre.<br /> Il y a une case de ce type sur le plateau
      </section>{/if}
    {#if page == 19}<section>
        - Case cours : accessible si le joueur est en possession d'un
        ordinateur, dans ce cas le joueur avance d'une case, sinon il passe son
        tour.
      </section>{/if}
    {#if page == 20}<section>
        - Case jour de paie :<br /> la dernière case du plateau, les joueurs s'arrêteront
        dessus peu importe la valeur qu'ils ont eu lors de leur lancer de dé. Les
        joueurs gagneront 1000€, et attendent la fin de la manche avant de passer
        à la prochaine.
      </section>{/if}
    {#if page == 21}<section>
        Précision sur les thématiques :<br />
        Légende : PT = Point Terre<br /> <br />Aucune thématique : Ici seront
        présentés les entités pouvant arriver à n'importe quel mois de l'année :<br
        /><br />
        Objets : Ordinateur (300€/0 PT) proposé dans les choix jusqu'à son achat.<br
        /><br />
        Dimanche pour Soi : Promenade en pleine nature, Jeux de société en familles/entre
        amis, Détente/Lecture/Film/Gaming, Activité en famille/entre amis. (all 0
        PT) <br /><br />Magasin spécialisé : Le Bocal, Day by Day, Biocoop,
        Coopalim, Panier bio ?
      </section>{/if}
    {#if page == 22}<section>
        Septembre :<br /> Intégration dans un campus durable (outils scolaire et
        acteurs universitaires) <br /><br />Objets associés :<br /> - Abonnement
        cinéma engagé (60€ / 0 PT) : Donne des points terre si le joueur tombe
        sur l'évènement « Un dimanche pour soi » (valable une fois). <br />-
        Casque audio : (60€ / 0 PT)
      </section>{/if}
    {#if page == 23}<section>
        Septembre :<br /><br />Dimanche pour soi :<br /> - Sortie cinéma :
        arrive si le joueur possède l'objet Abonnement cinéma engagé, si c'est
        le cas alors le joueur gagne 5 PT. <br /><br />Outils : <br />- Pièce
        électronique <br />- Clé anglaise
      </section>{/if}
    {#if page == 24}<section>
        Septembre : <br /><br />Problème :<br />
        Clavier d'ordinateur défaillant : 3 choix possibles : <br />- Aller à un
        Repair Café si en possession d'une pièce électronique. (0€/20PT)
        <br />- Donner l'objet à une recyclerie et acheter un objet d'occasion.
        (10€ /10PT) <br />- Jeter l'objet et en racheter un nouveau (30€/-15PT)
        <br /><br />Fuite d'eau dans l'appartement : 2 choix possibles :
        <br />- Faire appel à une association d'entraide si en possession d'une
        clé anglaise (0€/20PT) <br />- Faire appel à un professionnel (75€/0PT)
      </section>{/if}
    {#if page == 25}<section>
        Septembre :<br /><br />Informations générales :<br />
        - Campus vert <br />- Eco-Volontariat <br />- Cellule de développement
        durable <br /><br />Publicité Locales : <br />- Participer à l'Agora de
        rentrée (5€/5PT) <br />- Aller au Street Bouche Festival (10€/2PT)
        <br /><br />Evènements du mois : 20 septembre : Journée mondiale du
        développement durable
      </section>{/if}
    {#if page == 26}<section>
        Octobre :<br /><br />
        Objet associés : <br />- Pot en verre (7€ / 0 PT) : Donne des points
        terre supplémentaires lors de course en vrac <br />- Eponge lavable :
        (4€ / 5 PT) : Donne des points terre lors de l'achat <br />- Pompe à
        savon liquide : (3€ / 0 PT)<br /><br /> Outils : <br />- Tourne de vis
        <br />- Peinture
      </section>{/if}
    {#if page == 27}<section>
        Octobre :<br /><br />Problème :<br /><br /> Aspirateur en panne : 3
        choix possibles : <br />- Aller à un Repair Café si en possession d'un
        tourne de vis. (0€/20PT)
        <br />- Donner l'objet à une recyclerie et acheter un objet d'occasion.
        (80€ /10PT)
        <br />- Jeter l'objet et en racheter un nouveau (150€/-20PT) <br /><br
        />Meuble abimé : 3 choix possibles : <br />- Aller à un Repair Café si
        en possession de peinture. (0€/20PT) <br />- Revendre l'objet sur
        leboncoin.org ou sur trombinoscope.fr (+75€/15PT)
        <br />- Jeter l'objet et en racheter un nouveau (150€/-20PT)
      </section>{/if}
    {#if page == 28}<section>
        Octobre :<br /><br />Informations générales :<br />
        - A quoi sert le vinaigre blanc? <br />- Privilégier le lavable au
        jetable <br />- Composition de produits éco-responsable<br /><br />
        Publicité Locales :<br /> - Atelier DIY sur le campus (5€/10PT) <br />-
        Aller au Jardin des Créateurs (5€/5PT) <br /><br />Evènements du mois :
        4 octobre : Journée mondiale des animaux
      </section>{/if}
    {#if page == 29}<section>
        Novembre :<br /><br />
        Objet associés :<br /> - Gourde (25€ / 5 PT) <br />- Sac pour achat en
        vrac : (5€ / 0 PT) : Donne des points terre supplémentaires lors de
        course en vrac <br />- Couverts en bambou : (5€ / -5 PT) <br /><br
        />Outils : <br />- Tourne de vis <br />- Ecran de téléphone
      </section>{/if}
    {#if page == 30}<section>
        Problème :<br />
        <br />Four en panne : 3 choix possibles : <br />- Aller à un Repair Café
        si en possession d'un tourne de vis. (0€/20PT) <br />- Donner l'objet à
        une recyclerie et acheter un objet d'occasion. (150€ /15PT) <br />-
        Jeter l'objet et en racheter un nouveau (300€/-20PT) <br /><br />Ecran
        de téléphone fissuré : 3 choix possibles : <br />-Faire changer l'écran
        en magasin spécialisé si en possession d'un ecran de téléphone.
        (50€/20PT)
        <br />- Donner l'objet à une recyclerie (75€/15PT) <br />- Jeter l'objet
        et en racheter un nouveau (500€/-20PT)
      </section>{/if}
    {#if page == 31}<section>
        Informations générales : <br />- Demain, tous végans ?<br /> - S'y
        retrouver au millieu des labels et certifications <br />- Plutôt 100%
        bio ou 100% local ?<br /><br />
        Publicité Locales : <br />- Conférence sur l'empreinte carbone de nos
        aliments (2€/5PT)<br /> - Aller dans une épicerie locale (10€/10PT)<br
        /><br /> Evènements du mois : 1 novembre : Journée mondiale végane
      </section>{/if}
    {#if page == 32}<section>
        Décembre :<br /><br />
        Objet associés :<br />
        - Jean neuf (25€ / -20 PT)
        <br />- Livre d'occasion : (5€ / 5 PT) : Donne des points terre si tombe
        sur Un dimanche pour soi (valable une fois)
        <br />- Séjour ski dans les Vosges : (200€ / 10 PT) :Donne des points
        terre si tombe sur Un dimanche pour soi (valable une fois)<br /><br />

        Outils :
        <br />- Nécéssaire à couture
        <br />- Colle
      </section>{/if}
    {#if page == 33}<section>
        Dimanche pour soi :<br /> - Club de lecture: arrive si le joueur possède
        l'objet Livre d'occasion, si c'est le cas alors le joueur gagne 5 PT.
        <br />- Sejour ski Vosges: arrive si le joueur possède l'objet Séjour
        Ski dans les Vosges, si c'est le cas alors le joueur gagne 10 PT.
      </section>{/if}
    {#if page == 34}<section>
        Problème : <br />- Vêtement troué : 3 choix possibles : <br />-
        Participer à un atelier de couture si en possession d'un nécéssaire à
        coutre. (0€/20PT)
        <br />- Donner l'objet à une recyclerie et acheter un objet d'occasion.
        (20€ /15PT) <br />- Jeter l'objet et en racheter un nouveau (50€/-20PT)
        <br /><br />Objet cassé : 3 choix possibles : <br />- Aller à un Repair
        Café si en possession de colle. (0€/20PT) <br />- Donner l'objet à une
        recyclerie (25€/15PT) <br />- Jeter l'objet et en racheter un nouveau
        (50€/-20PT)
      </section>{/if}
    {#if page == 35}<section>
        Informations générales : <br />- Le cycle de vie d'un produit <br />-
        Les 5 R <br />- les Magasisn d'occasion à Strasbourg <br /><br
        />Publicité Locales : <br />- Atelier bredele (5€/5PT) <br />- Aller à
        l'opéra voir une pièce locale (25€/5PT) <br /><br />Evènements du mois :
        marché de Noël
      </section>{/if}
    {#if page == 36}<section>
        Janvier: <br /><br />Objet associés : <br />- Adhésion à une asso à
        visée humanitaire, écologique ou de justice sociale (10€ / 0 PT) : Donne
        des points terre supplémentaire si tombe sur case césure/engagement
        <br />- Adhésion à une asso (recyclerie, repair café...): (10€ / 0 PT) :
        Résolution immédiate de la case problème <br />- Livre neuf sur une
        cause écoresponsable : (18€ / 10 PT)<br /><br />
        Outils : <br />- Joint <br />- Tourne de vis
      </section>{/if}
    {#if page == 37}<section>
        Problème : <br />- Fuite d'eau dans l'appartement : 2 choix possibles :
        <br />- Faire appel à une association d'entraide si en possession d'une
        clé anglaise (0€/20PT) <br />- Faire appel à un professionnel (75€/0PT)
        <br /><br />- Panne de frigo : 3 choix possibles : <br />- Aller à un
        Repair Café si en possession de tourne de vis. (0€/20PT) <br />- Donner
        l'objet à une recyclerie (350€/15PT) <br />- Jeter l'objet et en
        racheter un nouveau (600€/-20PT)
      </section>{/if}
    {#if page == 38}<section>
        Informations générales : <br />- Qu'est-ce qu'un tiers-lieu ?<br /> -
        Associations nationales (Zero Waste France, Alternatiba, Greenpeace...)
        <br />- Agir à son échelle (On est Prêt, pétitions...) <br /><br
        />Publicité Locales :<br /> - Rencontre avec Jeanne Burgart Goutal
        (écoféminisme), Camille Etienne (activisme) et Laëticia van de Walle
        (zéro déchet) (5€/15PT) <br />- Budget écocitoyen (15€/20PT) <br /><br
        />Evènements du mois : Liste bonnes résolutions écologiques
      </section>{/if}
    {#if page == 39}<section>
        Février :<br /> <br />Objet associés : <br />- Téléphone reconditionné
        (250€ / 0 PT) : Gagne des points terre si tombe sur dimanche pour soi
        <br />- Abonnement d'un an à une plateforme de streaming: (80€ / -20 PT)
        <br />- Imprimante d'occasion : (70€ / 10 PT) <br /><br />Outils :
        <br />- Batterie de téléphone <br />- Kit de démontage d'ordinateur
      </section>{/if}
    {#if page == 40}<section>
        Dimanche pour soi : <br />- Appel téléphonique avec un ami éloigné :
        Gagne 10 PT si en possession d'un téléphone reconditionné
      </section>{/if}
    {#if page == 41}<section>
        Problème : <br />Batterie de téléphone défaillante: 3 choix possibles :
        <br />- Participer à un atelier de couture si en possession d'ue
        batterie de rechange. (50€/20PT) <br />- Donner l'objet à une recyclerie
        et acheter un objet d'occasion. (75€ /15PT) <br />- Jeter l'objet et en
        racheter un nouveau (500€/-20PT) <br /><br />Ordinateur trop lent : 3
        choix possibles : <br />- Aller à un Repair Café si en possession d'un
        kit de démontage d'ordinateur. (0€/20PT) <br />- Donner l'objet à une
        recyclerie (200€/15PT) <br />- Jeter l'objet et en racheter un nouveau
        (500€/-20PT)
      </section>{/if}
    {#if page == 42}<section>
        Informations générales : <br />- Bonne pratique du web <br />-
        Dématerialisation ou impression ? <br />- Low-tech <br /><br />Publicité
        Locales : <br />- Participer au lancement d'une marque écoresponsable
        (30€/20PT) <br />- Aller à l'opéra voir une pièce locale (25€/15PT)
        <br /><br />Evènements du mois : Saint Valentin et les fleurs
      </section>{/if}
    {#if page == 43}<section>
        Mars: <br /><br />Objet associés : <br />- Abonnement tram (126€ / 20
        PT)
        <br />- Souscription drive à vélo (40€ / 0 PT) : Point terre
        supplémentaires lors de courses en vrac et/ou local <br />- Achat VAE :
        (800€ / -20 PT) <br /><br />Outils : <br />- Pneu de vélo <br />- Guidon
        de trotinette
      </section>{/if}
    {#if page == 44}<section>
        Problème : <br /><br />Pneu de vélo crevé : 3 choix possibles : <br />-
        regarder un tuto sur youtube si en possession de pneu de vélo. (0€/20PT)
        <br />- Faire appel à un professionnel (0€/15PT) <br />- Jeter l'objet
        et en racheter un nouveau (300€/-20PT) <br /><br />Trotinette endommagée
        : 3 choix possibles : <br />- Aller à un Repair Café si en possession de
        guidon de trotinette. (0€/20PT) <br />- Donner l'objet à une recyclerie
        (200€/15PT) <br />- Jeter l'objet et en racheter un nouveau (500€/-20PT)
      </section>{/if}
    {#if page == 45}<section>
        Informations générales : <br />- Véhicules éléctriques <br />- Au boulot
        en vélo <br />- Alsace en vélo <br /><br />Publicité Locales : <br />-
        Offre étudiant CTS (20€/20PT) <br />- Offres sur les rollers (50€/15PT)
        <br /><br />Evènements du mois : 8 mars Journée internationale de la
        lutte pour les droits des femmes
      </section>{/if}
    {#if page == 46}<section>
        Avril : <br /><br />Objet associés : <br />- Parrainer un animal (15€ /
        0 PT) : Gagne des points terre si tombe sur dimanche pour soi (valable
        une fois) <br />- Abonnement d'un an à une plateforme de streaming (10€
        / 0 PT) : Donne des points terre si tombe sur case césure/engagement
        <br />- Adopter un poisson rouge : (40€ / -15 PT) <br /><br />Outils :
        <br />- Colle <br />- Clé anglaise
      </section>{/if}
    {#if page == 47}<section>
        Dimanche pour soi : <br />- Rendre visite à son animal fieul : Gagne 15
        PT si en possession de Parrainer un animal
      </section>{/if}
    {#if page == 48}<section>
        Problème : <br />Objet cassé : 3 choix possibles : <br />- Aller à un
        Repair Café si en possession de colle. (0€/20PT) <br />- Donner l'objet
        à une recyclerie (25€/15PT) <br />- Jeter l'objet et en racheter un
        nouveau (50€/-20PT) <br /><br />Panne de machine à laver : 3 choix
        possibles :
        <br />- Aller à un Repair Café si en possession d'une clé anglaise.
        (0€/20PT) <br />- Donner l'objet à une recyclerie (250€/15PT) <br />-
        Jeter l'objet et en racheter un nouveau (400€/-20PT)
      </section>{/if}
    {#if page == 49}<section>
        Informations générales : <br />- Plantes comestibles urbaines <br />-
        Comptage des oiseaux de jardins <br />- Sylvithérapie <br /><br
        />Publicité Locales : <br />- Journée nature avec la LPO et le CEN
        Alsace (5€/20PT) <br />- Nettoyage milieu naturel (0€/15PT) <br /><br
        />Evènements du mois : Pâques et le chocolat
      </section>{/if}
    {#if page == 50}<section>
        Mai: <br /><br />Objet associés : <br />- Changer de fournisseur
        électricité (12€ / 20 PT)
        <br />- Participer à une campagne de crowdfunding pour soutenir une
        start-up(20€ / 10 PT) : Point terre supplémentaires lors de courses en
        vrac et/ou local <br />- Acheter la dernière innovation "verte
        révolutionnaire" : (150€ / -20 PT) <br /><br />Outils : <br />- Tourne
        de vis <br />- Dérailleur de vélo
      </section>{/if}
    {#if page == 51}<section>
        Problème : <br /><br />Panne de radiateur : 3 choix possibles : <br />-
        Aller à un repair café si en possession d'un tourne de vis. (0€/20PT)
        <br />- Donner l'objet à une recyclerie (75€/15PT) <br />- Jeter l'objet
        et en racheter un nouveau (150€/-20PT) <br /><br />Vélo endommagé: 3
        choix possibles : <br />- Aller à un Repair Café si en possession d'un
        dérailleur de vélo. (0€/20PT) <br />- Donner l'objet à une recyclerie
        (25€/15PT) <br />- Jeter l'objet et en racheter un nouveau (300€/-20PT)
      </section>{/if}
    {#if page == 52}<section>
        Informations générales : <br />- Monnaie locale <br />- Neutralité
        carbone des entreprises <br />- les éco-quartiers de Strasbourg
        <br /><br />Publicité Locales : <br />- Concours pitch start-up locale
        (0€/5PT) <br />- Participer à une Game Jam (0€/5PT) <br /><br
        />Evènements du mois : 8 mai Journée mondiale du commerce équitable
      </section>{/if}
    {#if page == 53}<section>
        Juin: <br /><br />Objet associés : <br />- Se payer une formation ou un
        MOOC(30€ / 0 PT) : Donne des points terre si tombe sur case
        engagement/césure <br />- Kit faire sa bière soi-même (50€ / -15 PT)
        <br />- Adhésion à une asso : (10€ / 0 PT) : Résolution immédiate de la
        case problème <br /><br />Outils : <br />- Ciseaux <br />- Nécessaire à
        couture
      </section>{/if}
    {#if page == 54}<section>
        Problème : <br /><br />Vieux livre : 4 choix possibles : <br />-
        Participer à un atelier recyclage artistiques de vieux livres si en
        possesion de ciseaux. (0€/20PT) <br />- Les revendre sur vintage.org
        (+20€/15PT)
        <br />- En faire don (0€/20PT) <br />- Jeter l'objet et en racheter un
        nouveau (0€/-20PT) <br /><br />Vieux vêtements: 3 choix possibles :
        <br />- Participer à un atelier recyclage artistique de vieux vêtements
        si en possession de ciseaux (0€/20PT) <br />- Les revendre sur
        vintage.org (+50€/20PT) <br />- Jeter l'objet et en racheter un nouveau
        (80€/-20PT)
      </section>{/if}
    {#if page == 55}<section>
        Informations générales : <br />- les formations de l'Université de
        Strasbourg
        <br />- Forum de développement durable de Strasbourg <br />- Avant
        l'orage <br /><br />Publicité Locales : <br />- Aller aux portes
        ouvertes d'un cursus universitaire engagé dans la transition écologique
        (0€/15PT) <br />- Participer à une Game Jam (0€/15PT) <br /><br
        />Evènements du mois : 8 mai Journée mondiale du commerce équitable
      </section>{/if}
  </div>
  <button
    title="retourner à l'accueil"
    id="accueil"
    on:click={() => router.goto("/")}
  >
    Retourner à l'accueil
  </button>
  {#if page != NB_PAGE}
    <button
      title="aller à la prochaine page"
      id="next"
      on:click={button_next_handler}
    >
      Page Suivante
    </button>
  {/if}
  {#if page != 1}
    <button
      title="aller à la page précédente"
      id="previous"
      on:click={button_previous_handler}
    >
      Page précédente
    </button>
  {/if}
</main>

<style lang="scss">
  $font_arktio: Raleway;

  $turquoise: #00a19a;
  $blanc: #ffffff;
  $caramel: #ffd49a;
  $gris: #90908f;
  $hover_button: rgb(41, 39, 39);

  main {
    display: flex;
    width: 100%;
    height: 100%;
    font-family: $font_arktio;
    align-items: center;
    font-size: 300%;
    font-family: $font_arktio;
  }

  button {
    display: flex;
    align-items: center;
    width: 20%;
    height: 10%;
    justify-content: center;
    border-radius: 10px;
    border: solid $gris;
    background-color: $caramel;
    margin: 1%;
    font-size: xx-large;
  }

  button:hover {
    background-color: $hover_button;
    color: $blanc;
  }

  button:active {
    background-color: $gris;
  }

  div {
    display: flex;
    width: 90%;
    height: 50%;
    position: fixed;
    padding-bottom: 5%;
    margin: 5%;
    margin-top: 15%;
    border: solid $blanc;
    border-radius: 10px;
    flex-direction: column;
    color: $blanc;
  }

  section {
    display: flex;
    justify-content: center;
    width: 90%;
    height: 100%;
    margin: 2%;
    padding: 0;
    overflow: auto;
    overflow-x: unset;
    overflow-wrap: anywhere;
  }

  #accueil {
    position: fixed;
    align-self: flex-start;
  }

  #next {
    position: fixed;
    display: inherit;
    bottom: 0;
    right: 0;
    font-size: 70%;
  }
  #previous {
    position: fixed;
    display: inherit;
    bottom: 0;
    left: 0;
    font-size: 70%;
  }

  // WIDTH
  @media (max-width: 1100px) {
    main {
      font-size: 200%;
    }
    button {
      height: fit-content;
      width: fit-content;
    }
  }
  @media (max-width: 700px) {
    main {
      font-size: 100%;
    }
  }
  @media (max-width: 450px) {
    div {
      margin-top: 30%;
    }

    section {
      width: fit-content;
      height: 90%;
    }
  }
  // HEIGHT
  @media (max-height: 1100px) {
    #accueil {
      font-size: 75%;
    }
    div {
      margin-top: 10%;
    }
  }

  @media (max-height: 600px) {
    button {
      width: fit-content;
    }
  }

  @media (max-height: 500px) {
    div {
      margin-top: 10%;
    }

    section {
      height: 100%;
      padding: 0;
      margin: 0;
    }
    button {
      font-size: xx-small;
    }
  }

  @media (max-height: 400px) {
    div {
      height: 40%;
    }
  }

  // BOTH
  @media (max-width: 600px) and (max-height: 500px) {
    div {
      margin-top: 15%;
    }
  }
</style>
