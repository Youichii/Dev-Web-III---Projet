import React, {useState, useEffect} from 'react'
import Axios from 'axios'

const Inscription = () => {

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

	const inscrire = () => {

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

		var myInit = { method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({name : document.getElementById("nom_user").value,
									firstname : document.getElementById("prenom_user").value,
									address : document.getElementById("adresse_user").value,
									birthday : date,
									phone : document.getElementById("telephone_user").value,
									mail : document.getElementById("mail_user").value,
									gender : valeur,
									pwd : document.getElementById("mdp_user").value})
        };

        fetch('http://localhost:3001/api/users', myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Successful");
        })

    }

    return (
        <div className="inscription c_cadre_inscription">
            <div id="cadre_inscription" class="i_info_inscription c_info_inscription">			
				<div className="i_bouton_con">CONNEXION</div>
				<div className="i_bouton_insc">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>
				
				<div className="c_champs_informations i_champs_informations">
					<div className="i_titre_nom pol">NOM</div>
					<div className="i_champ_nom">
						<input type="text" id="nom_user" required maxlength="100" />
					</div>
					
					<div className="i_titre_prenom pol">PRENOM</div>
					<div className="i_champ_prenom">
						<input type="text" id="prenom_user" required />
					</div>
				
					<div className="i_titre_adresse_insc pol">ADRESSE</div>
					<div className="i_champ_adresse_insc">
						<input type="text" id="adresse_user" required />
					</div>

					<div className="i_titre_numero_insc pol">NUMERO</div>
					<div className="i_champ_numero_insc">
						<input type="number" id="numero_user" required />
					</div>

					<div className="i_titre_postal_insc pol">POSTAL</div>
					<div className="i_champ_postal_insc">
						<input type="number" id="postal_user" required />
					</div>

					<div className="i_titre_ville_insc pol">VILLE</div>
					<div className="i_champ_ville_insc">
						<input type="text" id="ville_user" required />
					</div>
				
					<div className="i_titre_anniversaire pol">DATE DE NAISSANCE</div>
					<div className="i_champ_anniversaire">
                    <select id="selection_jour" className="selec_jour">
							<option selected="selected" value="0">JJ</option>
							{liste_jours && liste_jours.map(element => (
								<option value={element}>{element}</option>
							))}
						</select>

						<select id="selection_mois" className="selec_mois">
							<option selected="selected" value="0">Mois</option>
							{liste_mois.map(element => (
								<option value={element}>{element}</option>
							))}
						</select>
						
						<select id="selection_annee" className="selec_annee">
							<option selected="selected" value="0">AAAA</option>
							{liste_annee && liste_annee.map(element => (
								<option value={element}>{element}</option>
							))}
						</select>
					</div>
					
					<div className="i_titre_sexe pol">SEXE</div>
					<div className="i_champ_sexe">
                        <div id="radio_femme"><input type="radio" name="myradio" value="f" id="sexef_user" /> FEMME</div>
						<div id="radio_homme"><input type="radio" name="myradio" value="h" id="sexeh_user" /> HOMME</div>
					</div>
				
					<div className="i_titre_telephone pol">TELEPHONE</div>
					<div className="i_champ_telephone">
						<input type="text" id="telephone_user" required />
					</div>
				
					<div className="i_titre_mail pol">ADRESSE E-MAIL</div>
					<div className="i_champ_mail">
						<input type="text" id="mail_user" required />
					</div>
				
					<div className="i_titre_mdp_insc pol">MOT DE PASSE</div>
					<div className="i_champ_mdp_insc">
						<input type="password" id="mdp_user" required />
					</div>
				
					<div className="i_champ_newsletter">
						<input type="checkbox" id="newsletter_user" required /><span className="pol">Je souhaite m'abonner à la newsletter</span>
					</div>
				
					<div className="i_champ_politique">
						<input type="checkbox" id="politique_user" required /><span className="pol">J'accepte les termes et conditions & politique de confidentialité</span>
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