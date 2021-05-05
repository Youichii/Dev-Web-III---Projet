import InputInformations from './components/InputInformations';

const Connexion = () => {
	require('./connexion.css')

	const verification_valeurs = () => {
		let compteur = true ;
		document.getElementById("erreur_connexion").innerHTML = "";

		if (document.getElementById("text_user").value === "") { 
			document.getElementById("text_user").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mail").innerHTML = "Veuillez entrer votre adresse";
			compteur = false ;
		}
		else {
			document.getElementById("text_user").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mail").innerHTML = "";
		}

		if (document.getElementById("text_mdp").value === "") { 
			document.getElementById("text_mdp").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mdp").innerHTML = "Veuillez entrer votre mot de passe";
			compteur = false ;
		}
		else {
			document.getElementById("text_mdp").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mdp").innerHTML = "";
		}
		return compteur ;
	}

	const recuperer_client = () => {

		if (verification_valeurs()) {
			let mail = document.getElementById("text_user").value ;
			let pwd = document.getElementById("text_mdp").value ;
			var myInit = { method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			fetch(`http://localhost:3001/api/users/${mail}/${pwd}`, myInit)
			.then(res => {
				return res.json();
			})
			.then(data => {
				if (data.length === 0) {
					document.getElementById("erreur_connexion").innerHTML = "Il semble que votre adresse e-mail ou votre mot de passe soient incorrects. Veuillez essayer à nouveau, s'il vous plaît";
				}
				else {
					document.getElementById("erreur_connexion").innerHTML = "";
				}
			})
		}
    }

    return (
        <div className="connexion c_cadre">
            <div id="cadre_connexion" className="i_info_connexion c_info_connexion">
                <div className="i_bouton_connexion">CONNEXION</div>
				<div className="i_bouton_inscription">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>

                <div className="i_zones_info c_zones_info">
					<div className="i_titre_adresse">ADRESSE E-MAIL</div>
					<InputInformations className_div="i_champ_adresse" id_input="text_user" id_span="erreur_mail" maxLenght="100"/>

					<div className="i_titre_mdp">MOT DE PASSE</div>
					<InputInformations className_div="i_champ_mdp" id_input="text_mdp" id_span="erreur_mdp" maxLenght="100" type="password"/>
					
					<div className="i_bouton_envoi">
						<input id="bouton_connexion_envoi" type="button" value="CONNEXION" onClick={recuperer_client} />
						<br></br><span className="message_erreur" id="erreur_connexion"></span>
					</div>
				</div>
            </div>		
        </div>
    );
}

export default Connexion;
