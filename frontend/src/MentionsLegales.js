import { useEffect, useState } from 'react';
import InputInformations from './components/InputInformations';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import { NavLink } from 'react-router-dom';
import  { useHistory } from 'react-router-dom';

const MentionsLegales = () => {
    require('./css/mentionsLegales.css');
	Axios.defaults.withCredentials = true;

    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateur, setUtilisateur] = useState(10000000000);


	/**
	 * Vérifie si l'utilisateur est connecté au chargement de la page
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(()=> {
		Axios.get("/api/connexion").then((reponse) => {
			if (reponse.data.loggedIn === true) {
				setStatutConnexion(true);
				setUtilisateur(reponse.data.user[0].IdClient);
			}
			else {setStatutConnexion(false);}
		});
	}, []);


	/**
	 * Déconnecte l'utilisateur
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const deconnexion = () => {
		Axios.get(`/api/deconnexion`).then((reponse) => {
			setStatutConnexion(false);
		});
	} 

    return (
        <div>
            {statutConnexion ? <BanniereConnection onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
            <div className="cadre_mentionslegales">
                <p className="principale"><span className="couleurPrincipale"><span className="bg">Si vous utilisez nos Mentions Légales, vous vous engagez à laisser les liens </span><strong><span className="bg">Crédit sans en modifier ni les liens ni les ancres.</span></strong><span className="bg"> </span></span><br />
                <span className="couleurPrincipale"><span className="bg">Par avance merci pour votre compréhension et le respect du travail effectué par toute l'équipe</span></span></p>

                <p className="principale">MENTIONS LEGALES :</p>

                <p className="justifie">Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site : <a href="http://www.chicknfish.be">www.chicknfish.be</a> les informations suivantes :</p>

                <p className="justifie"><strong>1. Informations légales :</strong></p>

                <p className="justifie">Statut du propriétaire : <strong>particulier</strong><br />
                Le Propriétaire est : <strong>Clémentine Sacré</strong><br />
                Adresse postale du propriétaire : <strong>chicknfish00@gmail.com 1348 Ottignies-Louvain-la-Neuve</strong><br />
                 <br />
                Le Créateur du site est : <strong>chicknfish.be</strong><br />
                Le Responsable de la  publication est : <strong>Clémentine Sacré</strong><br />
                Contacter le responsable de la publication : <strong>sacre.clementin@gmail.com</strong><br />
                Le responsable de la publication est une<strong> personne physique</strong><br />
                <br />
                Le Webmaster est  : <strong>Clémentine Sacré</strong><br />
                Contacter le Webmaster :  <strong><a href="mailto:sacre.clementine@gmail.com?subject=Contact a partir des mentions lÃ©gales via le site www.chicknfish.be">sacre.clementine@gmail.com</a></strong><br />
                L’hebergeur du site est : <strong>Sacré Clémentine Traverse d'Esope, 4 1348 Ottignies-Louvain-la-Neuve</strong><br />
                <strong><u>CREDIT :</u> </strong> Les mentions légales ont étés générées par<strong> <a href="https://www.generer-mentions-legales.com/generateur-mentions-legales.html">générateur de mentions legales</a></strong><br />
                Une eau toujours potable avec les <strong><a href="https://www.chamarrel.com/perles-de-ceramique-em-pxl-29_37.html">perles de céramique</a></strong></p>

                <p className="justifie"> </p>

                <p className="justifie"><strong>2. Présentation et principe :</strong></p>

                <p className="justifie">Est désigné ci-après : <strong>Utilisateur</strong>, tout internaute se connectant et utilisant le site susnommé : <a href="http://www.chicknfish.be">www.chicknfish.be</a>.<br />
                Le site <strong>www.chicknfish.be</strong><strong> </strong>regroupe un ensemble de services, dans l'état,  mis à la disposition des utilisateurs. Il est ici précisé que ces derniers doivent rester courtois et faire preuve de bonne foi tant envers les autres utilisateurs qu'envers le webmaster du site www.chicknfish.be. Le site www.chicknfish.be est mis à jour régulièrement par Clémentine Sacré.<br />
                Clémentine Sacré s’efforce de fournir sur le site www.chicknfish.be des informations les plus précises possibles (sous réserve de modifications apportées depuis leur mise en ligne), mais ne saurait garantir l'exactitude, la complétude et l'actualité des informations diffusées sur son site, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. En conséquence, l'utilisateur reconnaît utiliser ces informations données (à titre indicatif, non exhaustives et susceptibles d'évoluer) sous sa responsabilité exclusive.</p>

                <p className="justifie"> </p>

                <p className="justifie"><strong>3. Accessibilité :</strong><br />
                <br />
                Le site www.chicknfish.be est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf interruption, programmée ou non, pour les besoins de sa maintenance ou en cas de force majeure. En cas d’impossibilité d’accès au service, www.chicknfish.be s’engage à faire son maximum afin de rétablir l’accès au service et s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.  N’étant soumis qu’à une obligation de moyen, www.chicknfish.be ne saurait être tenu pour responsable de tout dommage, quelle qu’en soit la nature, résultant d’une indisponibilité du service.</p>

                <p className="justifie"> </p>

                <p className="justifie"><strong>4. Propriété intellectuelle :</strong></p>

                <p className="justifie"><br />
                Clémentine Sacré est propriétaire exclusif de tous les droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, tant sur la structure que sur les textes, images, graphismes, logo, icônes, sons, logiciels…<br />
                Toute reproduction totale ou partielle du site www.chicknfish.be, représentation, modification, publication, adaptation totale ou partielle de l'un quelconque de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Clémentine Sacré, propriétaire du site à l'email : sacre.clementine@gmail.com, à défaut elle sera considérée comme constitutive d’une contrefaçon et passible de poursuite conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>

                <p className="justifie"><br />
                <strong>5. Liens hypertextes et cookies :</strong><br />
                <br />
                Le site www.chicknfish.be contient un certain nombre de liens hypertextes vers d’autres sites (partenaires, informations …) mis en place avec l’autorisation de Clémentine Sacré. Cependant, Clémentine Sacré n’a pas la possibilité de vérifier l'ensemble du contenu des sites ainsi visités et décline donc toute responsabilité de ce fait quand aux risques éventuels de contenus illicites.<br />
                L’utilisateur est informé que lors de ses visites sur le site www.chicknfish.be, un ou des cookies sont susceptibles de s’installer automatiquement sur son ordinateur par l'intermédiaire de son logiciel de navigation. Un cookie est un bloc de données qui ne permet pas d'identifier l'utilisateur, mais qui enregistre des informations relatives à la navigation de celui-ci sur le site. <br />
                Le paramétrage du logiciel de navigation permet d’informer de la présence de cookie et éventuellement, de la refuser de la manière décrite à l’adresse suivante : <a href="http://www.cnil.fr">www.cnil.fr</a>. L’utilisateur peut toutefois configurer le navigateur de son ordinateur pour refuser l’installation des cookies, sachant que le refus d'installation d'un cookie peut entraîner l’impossibilité d’accéder à certains services. Pour tout bloquage des cookies, tapez dans votre moteur de recherche : bloquage des cookies sous IE ou firefox et suivez les instructions en fonction de votre version.</p>

                <p className="justifie"><br />
                <strong>6. Protection des biens et des personnes - gestion des données personnelles :</strong><br />
                <br />
                En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.</p>

                <p className="justifie">Sur le site www.chicknfish.be, Clémentine Sacré ne collecte des informations personnelles ( suivant l'article 4 loi n°78-17 du 06 janvier 1978) relatives à l'utilisateur que pour le besoin de certains services proposés par le site www.chicknfish.be. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site www.chicknfish.be l’obligation ou non de fournir ces informations.<br />
                Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, tout utilisateur dispose d’un droit d’accès, de rectification, de suppression et d’opposition aux données personnelles le concernant. Pour l’exercer, adressez votre demande à www.chicknfish.be par email : <strong><a href="mailto:sacre.clementine@gmail.com?subject=Contact ï¿½ partir des mentions lï¿½gales via le site www.chicknfish.be">sacre.clementin@gmail.com</a></strong> ou par écrit dûment signée, accompagnée d’une copie du titre d’identité avec signature du titulaire de la pièce, en précisant l’adresse à laquelle la réponse doit être envoyée.</p>

                <p className="justifie">Aucune information personnelle de l'utilisateur du site www.chicknfish.be n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat du site www.chicknfish.be et de ses droits autorise Clémentine Sacré à transmettre les dites informations à l'éventuel acquéreur qui serait à son tour tenu à la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site www.chicknfish.be.<br />
                Le site www.chicknfish.be est en conformité avec le RGPD voir notre politique RGPD  https://editioneo.com/workflows/review/id/39687.</p>

                <p className="justifie">Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.</p>

                Produit par <a href="https://www.generer-mentions-legales.com/download.php?ref=vsc4gp8bkt4cnlq7tankjmxjt9rqu8&e=o">https://www.generer-mentions-legales.com/download.php?ref=vsc4gp8bkt4cnlq7tankjmxjt9rqu8&e=o</a>
            </div>
        </div>
    );
}

export default MentionsLegales;

