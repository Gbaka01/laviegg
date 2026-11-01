const EDITEUR = {
  nom: "Monsieur Gore Gbaka GOLI",
  adresse: "16 rue de Châtillon, 5e étage, 91260 Juvisy-sur-Orge",
  telephone: "07 60 29 23 63",
  email: "gore.goli@gmail.com",
};

const HEBERGEUR = {
  nom: "Cloudflare, Inc.",
  adresse: "101 Townsend St, San Francisco,CA 94107, USA",

};

function Mentions() {
  return (
    <section className="page">
      <div className="container py-5" style={{ maxWidth: 800 }}>
        <h1 className="h3 mb-1">Mentions légales</h1>
        <p className="text-muted mb-4">En vigueur au 01/11/2026</p>

        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
          en l'économie numérique, il est porté à la connaissance des utilisateurs et visiteurs,
          ci-après l'« Utilisateur », du site <a href="https://laviegg.fr">https://laviegg.fr</a>,
          ci-après le « Site », les présentes mentions légales.
        </p>
        <p>
          La connexion et la navigation sur le Site par l'Utilisateur impliquent l'acceptation
          intégrale et sans réserve des présentes mentions légales. Elles sont accessibles sur le
          Site à la rubrique « Mentions légales ».
        </p>

        <h2 className="h5 mt-4">Édition du site</h2>
        <p>
          L'édition et la direction de la publication du Site sont assurées par {EDITEUR.nom},
          domicilié {EDITEUR.adresse}, joignable au {EDITEUR.telephone} et à l'adresse e-mail{" "}
          <a href={`mailto:${EDITEUR.email}`}>{EDITEUR.email}</a>, ci-après l'« Éditeur ».
        </p>

        <h2 className="h5 mt-4">Hébergeur</h2>
        <p>
          L'hébergeur du Site est la société {HEBERGEUR.nom}, dont le siège social est situé au{" "}
          {HEBERGEUR.adresse}. Téléphone : {HEBERGEUR.telephone}.
        </p>

        <h2 className="h5 mt-4">Accès au site</h2>
        <p>
          Le Site est normalement accessible à tout moment à l'Utilisateur. Toutefois, l'Éditeur
          pourra à tout moment suspendre, limiter ou interrompre le Site afin de procéder,
          notamment, à des mises à jour ou des modifications de son contenu. L'Éditeur ne pourra
          en aucun cas être tenu responsable des conséquences éventuelles de cette indisponibilité
          sur les activités de l'Utilisateur.
        </p>

        <h2 className="h5 mt-4">Collecte des données</h2>
        <p>
          Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles
          dans le respect de la vie privée, conformément à la loi n° 78-17 du 6 janvier 1978
          relative à l'informatique, aux fichiers et aux libertés, et au règlement (UE) 2016/679
          du Parlement européen et du Conseil du 27 avril 2016 (RGPD).
        </p>
        <p>
          L'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et
          d'opposition sur ses données personnelles. Il peut exercer ce droit :
        </p>
        <ul>
          <li>
            par e-mail à l'adresse <a href={`mailto:${EDITEUR.email}`}>{EDITEUR.email}</a>
          </li>
        </ul>

        <h2 className="h5 mt-4">Propriété intellectuelle</h2>
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation ou modification de tout
          ou partie du Site, sans autorisation expresse de l'Éditeur, est interdite et pourra
          entraîner des actions et poursuites judiciaires telles que prévues par la
          réglementation en vigueur.
        </p>
      </div>
    </section>
  );
}

export default Mentions;