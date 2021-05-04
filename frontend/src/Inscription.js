import React, {useState, useEffect} from 'react';
import InputInformations from './components/InputInformations';
import RadioCommande from './components/RadioCommande';

const Inscription = () => {

	require('./inscription.css')
	const [liste_jours, setListeJours] = useState(null);
	const [liste_mois, setListeMois] = useState(["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]);
	const [liste_annee, setListeAnnee] = useState(null);

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

	const verification_valeurs = () => {
		let compteur = true ;

		if (document.getElementById("nom_user").value === "") { 
			document.getElementById("nom_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_nom").innerHTML = "Votre nom";
			compteur = false ;
		}
		else {
			document.getElementById("nom_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_nom").innerHTML = "";
		}

		if (document.getElementById("prenom_user").value === "") { 
			document.getElementById("prenom_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_prenom").innerHTML = "Votre prénom";
			compteur = false ;
		}
		else {
			document.getElementById("prenom_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_prenom").innerHTML = "";
		}

		var format_tel = /[+][3][2][4][0-9]{9}/ ;
		var tel = document.getElementById("telephone_user").value ;
		if (tel === "") { 
			document.getElementById("telephone_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_telephone").innerHTML = "Veuillez entrer votre téléphone";
			compteur = false ;
		}
		else if (tel.match(format_tel) === null || tel.match(format_tel)[0] !== tel.match(format_tel).input) {
			document.getElementById("telephone_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_telephone").innerHTML = "Veuillez respecter le format (+324069525896 par exemple)";
			compteur = false ;
		}
		else {
			document.getElementById("telephone_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_telephone").innerHTML = "";
		}

		if (document.getElementById("adresse_user").value === "") { 
			document.getElementById("adresse_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_rue").innerHTML = "Votre rue";
			compteur = false ;
		}
		else {
			document.getElementById("adresse_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_rue").innerHTML = "";
		}

		if (document.getElementById("numero_user").value === "") { 
			document.getElementById("numero_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_numero").innerHTML = "Votre numéro";
			compteur = false ;
		}
		else {
			document.getElementById("numero_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_numero").innerHTML = "";
		}

		if (document.getElementById("postal_user").value === "") { 
			document.getElementById("postal_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_postal").innerHTML = "Votre code postal";;
			compteur = false ;
		}
		else {
			document.getElementById("postal_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_postal").innerHTML = "";
		}

		if (document.getElementById("ville_user").value === "") { 
			document.getElementById("ville_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_ville").innerHTML = "Votre ville";
			compteur = false ;
		}
		else {
			document.getElementById("ville_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_ville").innerHTML = "";
		}

		var format_mail = /[@][a-z]+[.][a-z]+/i ;
		var mail = document.getElementById("mail_user").value;
		if (mail === "") { 
			document.getElementById("mail_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mail").innerHTML = "Veuillez entrer votre mail";
			compteur = false ;
		}
		else if (mail.match(format_mail) === null || mail !== mail.substring(0, mail.match(format_mail).index) + mail.match(format_mail)[0]) {
			document.getElementById("mail_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mail").innerHTML = "Veuillez respecter le format mail";
			compteur = false ;
		}
		else {
			document.getElementById("mail_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mail").innerHTML = "";
		}

		if (document.getElementById('selection_jour').selectedIndex === 0 || document.getElementById('selection_mois').selectedIndex === 0 || document.getElementById('selection_annee').selectedIndex === 0) { 
			document.getElementById("selection_jour").style.borderColor="var(--erreur)";
			document.getElementById("selection_mois").style.borderColor="var(--erreur)";
			document.getElementById("selection_annee").style.borderColor="var(--erreur)";
			document.getElementById("erreur_anniversaire").innerHTML = "Veuillez sélectionner votre date de naissance";
			compteur = false ;
		}
		else {
			document.getElementById("selection_jour").style.borderColor="var(--bordure)";
			document.getElementById("selection_mois").style.borderColor="var(--bordure)";
			document.getElementById("selection_annee").style.borderColor="var(--bordure)";
			document.getElementById("erreur_anniversaire").innerHTML = "";
		}

		var radios = document.getElementsByName('myradio');
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

		var mdp = document.getElementById("mdp_user").value;
		var format_mdp = /^[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]*$/;
		if (mdp === "") { 
			document.getElementById("mdp_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mdp").innerHTML = "Veuillez entrer un mot de passe";
			compteur = false ;
		}
		else if (mdp < 12 || mdp.split('').filter(lettre => lettre === lettre.toUpperCase()).length === 0 || mdp.split('').filter(lettre => lettre === lettre.toLowerCase()).length === 0 || mdp.split('').filter(lettre => !isNaN(lettre)).length === 0 || mdp.split('').filter(lettre => lettre.match(format_mdp)).length === 0) {
			document.getElementById("mdp_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mdp").innerHTML = "Veuillez entrer un mot de passe plus sécurisé (12 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)";
			compteur = false ;
		}
		else {
			document.getElementById("mdp_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mdp").innerHTML = "";
		}

		return compteur ;
	}

	const inscrire = () => {

		if (verification_valeurs()) {
			var radios = document.getElementsByName('myradio');
			var valeur;
			for(var i = 0; i < radios.length; i++){
				if(radios[i].checked){
				valeur = radios[i].value;
				}
			}

			var jour = document.getElementById('selection_jour').selectedIndex;
			var mois = document.getElementById('selection_mois').selectedIndex;
			var annee = document.getElementById('selection_annee').selectedIndex;
			var date = annee + "-" + mois + "-" + jour ;

			let neswletter_cochee ;
			(document.getElementById("newsletter_user").checked) ? neswletter_cochee = 1 : neswletter_cochee = 0 ;

			var myInit = { method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({name : document.getElementById("nom_user").value,
										firstname : document.getElementById("prenom_user").value,
										birthday : date,
										phone : document.getElementById("telephone_user").value,
										mail : document.getElementById("mail_user").value,
										gender : valeur,
										pwd : document.getElementById("mdp_user").value,
										rue : document.getElementById("adresse_user").value,
										numero : document.getElementById("numero_user").value,
										postal : document.getElementById("postal_user").value,
										ville : document.getElementById("ville_user").value,
										nwsletter : neswletter_cochee})
			};

			fetch('http://localhost:3001/api/users', myInit)
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log("Successful");
			})
		}
		else {
			console.log("non, toutes les informations ne sont pas correctes");
		}

    }

    return (
        <div className="inscription c_cadre_inscription">
            <div id="cadre_inscription" className="i_info_inscription c_info_inscription">			
				<div className="i_bouton_con">CONNEXION</div>
				<div className="i_bouton_insc">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>
				
				<div className="c_champs_informations i_champs_informations">
					<div className="i_titre_nom pol">NOM</div>
					<InputInformations className_div="i_champ_nom" id_input="nom_user" id_span="erreur_nom" maxLenght="100"/>

					<div className="i_titre_prenom pol">PRENOM</div>
					<InputInformations className_div="i_champ_prenom" id_input="prenom_user" id_span="erreur_prenom" maxLenght="100"/>
				
					<div className="i_titre_adresse_insc pol">RUE</div>
					<InputInformations className_div="i_champ_adresse_insc" id_input="adresse_user" id_span="erreur_rue" maxLenght="100"/>

					<div className="i_titre_numero_insc pol">NUMERO</div>
					<InputInformations className_div="i_champ_numero_insc" type="number" id_input="numero_user" id_span="erreur_numero" maxLenght="100"/>

					<div className="i_titre_postal_insc pol">POSTAL</div>
					<InputInformations className_div="i_champ_postal_insc" type="number" id_input="postal_user" id_span="erreur_postal" maxLenght="100"/>

					<div className="i_titre_ville_insc pol">VILLE</div>
					<InputInformations className_div="i_champ_ville_insc" id_input="ville_user" id_span="erreur_ville" maxLenght="100"/>
				
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
						<RadioCommande id_div="radio_femme" name="myradio" value="f" form="sexef_user" text=" FEMME" checked="yes" />
						<RadioCommande id_div="radio_homme" name="myradio" value="h" form="sexeh_user" text=" HOMME" />
						<div className="message_erreur" id="erreur_sexe"></div>
					</div>
				
					<div className="i_titre_telephone pol">TELEPHONE</div>
					<InputInformations className_div="i_champ_telephone" id_input="telephone_user" id_span="erreur_telephone" maxLenght="100"/>
				
					<div className="i_titre_mail pol">ADRESSE E-MAIL</div>
					<InputInformations className_div="i_champ_mail" id_input="mail_user" id_span="erreur_mail" maxLenght="100"/>
				
					<div className="i_titre_mdp_insc pol">MOT DE PASSE</div>
					<InputInformations className_div="i_champ_mdp_insc" type="password" id_input="mdp_user" id_span="erreur_mdp" maxLenght="100"/>
				
					<div className="i_champ_newsletter">
						<input type="checkbox" id="newsletter_user" required /><span className="pol"> Je souhaite m'abonner à la newsletter</span>
					</div>
				
					<div className="i_champ_politique">
						<input type="checkbox" id="politique_user" required /><span className="pol"> J'accepte les termes et conditions & politique de confidentialité</span>
					</div>
				
					<div className="i_titre_captcha pol">CAPTCHA</div>
					<div className="i_champ_captcha">
						<input type="text" id="captcha_user" required />
					</div>
				
				</div>

				<div className="i_bouton_envoi_insc">
						<input id="bouton_inscription_envoi" type="button" value="S'INSCRIRE" onClick={inscrire} />
				</div>

			</div>
        </div>
    );
}

export default Inscription;