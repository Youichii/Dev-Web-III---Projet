import React, {useState, useEffect} from 'react';
import InputInformations from './components/InputInformations';
import BoutonRadio from './components/BoutonRadio';
import Axios from 'axios';
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import { NavLink } from 'react-router-dom';
import  { useHistory } from 'react-router-dom';

const Inscription = () => {
	require('./css/inscription.css');
	Axios.defaults.withCredentials = true;

	const [liste_jours, setListeJours] = useState(null);
	const [liste_mois, setListeMois] = useState(["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]);
	const [liste_annee, setListeAnnee] = useState(null);
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


	/**
	 * Crée des listes contenant les valeurs des différents jours possibles et années possibles
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(() => {
		let jour = [], annee = [] ;
        for (let i = 1 ; i<32 ; i++) {
			jour.push(i);
		}
		for (let i = 2010 ; i>1950 ; i--) {
			annee.push(i);
		}
		setListeJours(jour);
		setListeAnnee(annee);
    }, []);


	/**
	 * Vérifie que l'utilisateur remplit bien tous les champs et que leur format est respecté, affiche des messages si nécessaire
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const verificationValeurs = () => {
		let compteur = true ;

		if (document.getElementById("nom_utilisateur").value === "") { 
			document.getElementById("nom_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_nom").innerHTML = "Votre nom";
			compteur = false ;
		}
		else {
			document.getElementById("nom_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_nom").innerHTML = "";
		}

		if (document.getElementById("prenom_utilisateur").value === "") { 
			document.getElementById("prenom_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_prenom").innerHTML = "Votre prénom";
			compteur = false ;
		}
		else {
			document.getElementById("prenom_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_prenom").innerHTML = "";
		}

		var format_tel = /[+][3][2][4][0-9]{8}/ ;
		var tel = document.getElementById("telephone_utilisateur").value ;
		if (tel === "") { 
			document.getElementById("telephone_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_telephone").innerHTML = "Veuillez entrer votre téléphone";
			compteur = false ;
		}
		else if (tel.match(format_tel) === null || tel.match(format_tel)[0] !== tel.match(format_tel).input) {
			document.getElementById("telephone_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_telephone").innerHTML = "Veuillez respecter le format (+32406952589 par exemple)";
			compteur = false ;
		}
		else {
			document.getElementById("telephone_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_telephone").innerHTML = "";
		}

		if (document.getElementById("adresse_utilisateur").value === "") { 
			document.getElementById("adresse_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_rue").innerHTML = "Votre rue";
			compteur = false ;
		}
		else {
			document.getElementById("adresse_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_rue").innerHTML = "";
		}

		if (document.getElementById("numero_utilisateur").value === "") { 
			document.getElementById("numero_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_numero").innerHTML = "Votre numéro";
			compteur = false ;
		}
		else {
			document.getElementById("numero_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_numero").innerHTML = "";
		}

		if (document.getElementById("postal_utilisateur").value === "") { 
			document.getElementById("postal_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_postal").innerHTML = "Votre code postal";;
			compteur = false ;
		}
		else {
			document.getElementById("postal_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_postal").innerHTML = "";
		}

		if (document.getElementById("ville_utilisateur").value === "") { 
			document.getElementById("ville_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_ville").innerHTML = "Votre ville";
			compteur = false ;
		}
		else {
			document.getElementById("ville_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_ville").innerHTML = "";
		}

		var format_mail = /[@][a-z]+[.][a-z]+/i ;
		var mail = document.getElementById("mail_utilisateur").value;
		if (mail === "") { 
			document.getElementById("mail_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mail").innerHTML = "Veuillez entrer votre mail";
			compteur = false ;
		}
		else if (mail.match(format_mail) === null || mail !== mail.substring(0, mail.match(format_mail).index) + mail.match(format_mail)[0]) {
			document.getElementById("mail_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mail").innerHTML = "Veuillez respecter le format mail";
			compteur = false ;
		}
		else {
			document.getElementById("mail_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mail").innerHTML = "";
		}

		var mois_longs = [2, 4, 6, 9, 11] ;
		var jour = document.getElementById('selection_jour').selectedIndex ;
		var mois = document.getElementById('selection_mois').selectedIndex ;
		var annee = document.getElementById('selection_annee').selectedIndex ;
		if (jour === 0 || mois === 0 || annee === 0) { 
			document.getElementById("selection_jour").style.borderColor="var(--erreur)";
			document.getElementById("selection_mois").style.borderColor="var(--erreur)";
			document.getElementById("selection_annee").style.borderColor="var(--erreur)";
			document.getElementById("erreur_anniversaire").innerHTML = "Veuillez sélectionner votre date de naissance";
			compteur = false ;
		}
		else if ((mois_longs.includes(mois) && jour > 30) || (mois === 2 && jour > 28)) {
			document.getElementById("selection_jour").style.borderColor="var(--erreur)";
			document.getElementById("selection_mois").style.borderColor="var(--erreur)";
			document.getElementById("selection_annee").style.borderColor="var(--erreur)";
			document.getElementById("erreur_anniversaire").innerHTML = "Veuillez sélectionner une date de naissance valide";
			compteur = false ;
		}
		else {
			document.getElementById("selection_jour").style.borderColor="var(--bordure)";
			document.getElementById("selection_mois").style.borderColor="var(--bordure)";
			document.getElementById("selection_annee").style.borderColor="var(--bordure)";
			document.getElementById("erreur_anniversaire").innerHTML = "";
		}

		var radios = document.getElementsByName('radio_genre');
		let valeur ;
		for(var i = 0; i < radios.length; i++){
			if(radios[i].checked){
			valeur = radios[i].value;
			}
		}
		if (valeur === undefined) { 
			document.getElementById("erreur_sexe").innerHTML = "Veuillez sélectionner votre sexe";
			compteur = false ;
		}
		else {
			document.getElementById("erreur_sexe").innerHTML = "";
		}

		var mdp = document.getElementById("mdp_utilisateur").value;
		var format_mdp = /^[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]*$/;
		if (mdp === "") { 
			document.getElementById("mdp_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mdp").innerHTML = "Veuillez entrer un mot de passe";
			compteur = false ;
		}
		else if (mdp < 12 || mdp.split('').filter(lettre => lettre === lettre.toUpperCase()).length === 0 || mdp.split('').filter(lettre => lettre === lettre.toLowerCase()).length === 0 || mdp.split('').filter(lettre => !isNaN(lettre)).length === 0 || mdp.split('').filter(lettre => lettre.match(format_mdp)).length === 0) {
			document.getElementById("mdp_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mdp").innerHTML = "Veuillez entrer un mot de passe plus sécurisé (12 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)";
			compteur = false ;
		}
		else {
			document.getElementById("mdp_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mdp").innerHTML = "";
		}

		return compteur ;
	}


	/**
	 * Permet à l'utilisateur de s'inscrire si il a bien coché la politique de confidentialité
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const inscrire = () => {
		if (document.getElementById("politique_utilisateur").checked) {
			document.getElementById("politique_erreur").innerHTML = "";

			if (verificationValeurs()) {
				var radios = document.getElementsByName('radio_genre');
				var valeur;
				for(var i = 0; i < radios.length; i++){
					if(radios[i].checked){
					valeur = radios[i].value;
					}
				}

				var jour = document.getElementById('selection_jour').value;
				var mois = document.getElementById('selection_mois').selectedIndex;
				var annee = document.getElementById('selection_annee').value;
				var date = annee + "-" + mois + "-" + jour ;

				let neswletter_cochee ;
				(document.getElementById("newsletter_user").checked) ? neswletter_cochee = 1 : neswletter_cochee = 0 ;

				var myInit = { method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({name : document.getElementById("nom_utilisateur").value,
											firstname : document.getElementById("prenom_utilisateur").value,
											birthday : date,
											phone : document.getElementById("telephone_utilisateur").value,
											mail : document.getElementById("mail_utilisateur").value,
											gender : valeur,
											pwd : document.getElementById("mdp_utilisateur").value,
											rue : document.getElementById("adresse_utilisateur").value,
											numero : document.getElementById("numero_utilisateur").value,
											postal : document.getElementById("postal_utilisateur").value,
											ville : document.getElementById("ville_utilisateur").value,
											nwsletter : neswletter_cochee})
				};

				fetch('/api/users', myInit)
				.then(res => {
					return res.json();
				})
				.then(donnees => {
					if (donnees.message === false) {
						document.getElementById("erreur_inscription").innerHTML = "Cette adresse mail existe déjà ! Essayez-en une autre";
					}
					else {
						document.getElementById("erreur_inscription").innerHTML = "";
						let mail_valide = document.getElementById("mail_utilisateur").value ;
						let mdp_valide = document.getElementById("mdp_utilisateur").value;
						Axios.post(`/api/connect-users`, {"headers": {"content-type": "application/json"},
						data:{
							mail: mail_valide,
							pwd: mdp_valide
						}				
						}).then((reponse) => {
							if (reponse.data.message) {
								setStatutConnexion(false);
								setUtilisateur(10000000000);
							} else {
								setStatutConnexion(true);
								setUtilisateur(reponse.data[0].IdClient);
								redirection() ;
							}
						});
					}
				})
			}
		}				
		else {
			document.getElementById("politique_erreur").innerHTML = "Ce champ est obligatoire";
		}
    }


	/**
	 * Adapte le css si l'utilisateur coche la case de politique de confidentialité ou non
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const polConfidentialite = () => {
		if (document.getElementById("politique_utilisateur").checked) {
			document.getElementById("bouton_inscription_envoi").style.cursor = "pointer";
			document.getElementById("bouton_inscription_envoi").classList.remove("bouton_bloque");
			document.getElementById("bouton_inscription_envoi").classList.add("bouton_ouvert");
		}
		else {
			document.getElementById("bouton_inscription_envoi").style.cursor = "default";
			document.getElementById("bouton_inscription_envoi").classList.add("bouton_bloque");
			document.getElementById("bouton_inscription_envoi").classList.remove("bouton_ouvert");
		}
	}

	const history = useHistory();
	const redirection= function onfinish(data){
		return history.push('/') ;
	}

    return (
		<div>
			{statutConnexion ? <BanniereConnection page="inscription" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique page="inscription" />}
			<div className="inscription c_cadre_inscription">
				<div id="cadre_inscription" className="i_info_inscription c_info_inscription">			
					<NavLink to="/connexion" className="i_bouton_con">CONNEXION</NavLink>
					<div className="i_bouton_insc">INSCRIPTION</div>
					<div className="i_titre_connexion">INSCRIPTION AVEC UNE ADRESSE E-MAIL</div>
					
					<div className="c_champs_informations i_champs_informations">
						<div className="i_titre_nom pol">NOM</div>
						<InputInformations className_div="i_champ_nom" id_input="nom_utilisateur" id_span="erreur_nom" maxLenght="100"/>

						<div className="i_titre_prenom pol">PRENOM</div>
						<InputInformations className_div="i_champ_prenom" id_input="prenom_utilisateur" id_span="erreur_prenom" maxLenght="100"/>
					
						<div className="i_titre_adresse_insc pol">RUE</div>
						<InputInformations className_div="i_champ_adresse_insc" id_input="adresse_utilisateur" id_span="erreur_rue" maxLenght="100"/>

						<div className="i_titre_numero_insc pol">NUMERO</div>
						<InputInformations className_div="i_champ_numero_insc" type="number" id_input="numero_utilisateur" id_span="erreur_numero" maxLenght="100"/>

						<div className="i_titre_postal_insc pol">POSTAL</div>
						<InputInformations className_div="i_champ_postal_insc" type="number" id_input="postal_utilisateur" id_span="erreur_postal" maxLenght="100"/>

						<div className="i_titre_ville_insc pol">VILLE</div>
						<InputInformations className_div="i_champ_ville_insc" id_input="ville_utilisateur" id_span="erreur_ville" maxLenght="100"/>
					
						<div className="i_titre_anniversaire pol">DATE DE NAISSANCE</div>
						<div className="i_champ_anniversaire">
						<select id="selection_jour" className="selec_jour" defaultValue="0">
							<option value="0">JJ</option>
							{liste_jours && liste_jours.map(element => (
								<option value={element}>{element}</option>
							))}
						</select>

						<select id="selection_mois" className="selec_mois" defaultValue="0">
							<option value="0">Mois</option>
							{liste_mois.map(element => (
								<option value={element}>{element}</option>
							))}
						</select>
						
						<select id="selection_annee" className="selec_annee" defaultValue="0">
							<option value="0">AAAA</option>
							{liste_annee && liste_annee.map(element => (
								<option value={element}>{element}</option>
							))}
						</select>
						<div className="message_erreur" id="erreur_anniversaire"></div>
					</div>
					
					<div className="i_titre_sexe pol">SEXE</div>
					<div className="i_champ_sexe">
						<BoutonRadio id_div="radio_femme" name="radio_genre" value="f" form="sexef_user" text=" FEMME" checked="yes" />
						<BoutonRadio id_div="radio_homme" name="radio_genre" value="h" form="sexeh_user" text=" HOMME" />
						<div className="message_erreur" id="erreur_sexe"></div>
					</div>
				
					<div className="i_titre_telephone pol">TELEPHONE</div>
					<InputInformations className_div="i_champ_telephone" id_input="telephone_utilisateur" id_span="erreur_telephone" maxLenght="100"/>
				
					<div className="i_titre_mail pol">ADRESSE E-MAIL</div>
					<InputInformations className_div="i_champ_mail" id_input="mail_utilisateur" id_span="erreur_mail" maxLenght="100"/>
				
					<div className="i_titre_mdp_insc pol">MOT DE PASSE</div>
					<InputInformations className_div="i_champ_mdp_insc" type="password" id_input="mdp_utilisateur" id_span="erreur_mdp" maxLenght="100"/>
				
					<div className="i_champ_newsletter">
						<input type="checkbox" id="newsletter_user" required /><span className="pol"> Je souhaite m'abonner à la newsletter</span>
					</div>
				
					<div className="i_champ_politique">
						<input type="checkbox" id="politique_utilisateur" required onClick={polConfidentialite}/><span className="pol"> J'accepte les <a href="https://www.privacypolicies.com/live/3ed9c526-0710-45e2-9a58-ec772750de85">termes et conditions</a> & <a href="https://www.privacypolicies.com/live/5b2841b7-4ad5-46a7-ac31-25ea7960e6f3">politique de confidentialité</a></span>
					</div>
					<div className="i_titre_captcha pol">CAPTCHA</div>
					<div className="i_champ_captcha">
						<input type="text" id="captcha_user" required />
					</div>
					<div className='message_erreur politique_erreur' id="politique_erreur"></div>

					<div className="message_erreur" id="erreur_inscription"></div>
				
				</div>

				<div className="i_bouton_envoi_insc">
						<input className="bouton_bloque" id="bouton_inscription_envoi" type="button" value="S'INSCRIRE" onClick={inscrire} />
				</div>
			</div>
		</div>
	</div>
    );
}

export default Inscription;