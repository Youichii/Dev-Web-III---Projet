import { useEffect, useState } from 'react';
import InputInformations from './components/InputInformations';
import Axios from "axios";
import Banner from './Banner.js';
import BannerConnect from './components/BannerConnect.js';

const Connexion = () => {
	require('./connexion.css');
	Axios.defaults.withCredentials = true;

	const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState(10000000000);
	let mail_valide = "vide";
	let mdp_valide = "vide";


	/**
	 * Vérifie si l'utilisateur est connecté au chargement de la page
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
				setUsername(response.data.user[0].IdClient);
			}
			else {setLoginStatus(false);}
		});
	}, []);


	/**
	 * Déconnecte l'utilisateur
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const deconnexion = () => {
		Axios.get(`http://localhost:3001/api/deconnexion`).then((response) => {
			setLoginStatus(false);
		});
	} 


	/**
	 * Vérifie si les l'utilisateur a bien entrée son mail et son mot de passe, et affiche des messages si nécessaire
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const verificationValeurs = () => {
		let compteur = true ;
		document.getElementById("erreur_connexion").innerHTML = "";
		let mail = document.getElementById("texte_utilisateur").value ;
		let pwd = document.getElementById("texte_mdp").value ;

		if (mail === "") { 
			document.getElementById("texte_utilisateur").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mail").innerHTML = "Veuillez entrer votre adresse";
			compteur = false ;
		}
		else {
			document.getElementById("texte_utilisateur").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mail").innerHTML = "";
			mail_valide = mail ;
		}

		if (pwd === "") { 
			document.getElementById("texte_mdp").style.borderColor="var(--erreur)";
			document.getElementById("erreur_mdp").innerHTML = "Veuillez entrer votre mot de passe";
			compteur = false ;
		}
		else {
			document.getElementById("texte_mdp").style.borderColor="var(--bordure)";
			document.getElementById("erreur_mdp").innerHTML = "";
			mdp_valide = pwd ; 
		}
		return compteur ;
	}


	/**
	 * Permet de créer un cookie lors de la connexion de l'utilisateur si ses informations sont correctes
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	const recupererClient = () => {
		if (verificationValeurs()) {
			Axios.get(`http://localhost:3001/api/connect-users/${mail_valide}/${mdp_valide}`).then((reponse) => {
				if (reponse.data.message) {
					setLoginStatus(false);
					setUsername(10000000000);
					document.getElementById("erreur_connexion").innerHTML = "Il semble que votre adresse e-mail et/ou votre mot de passe soient incorrects. Veuillez essayer à nouveau, s'il vous plaît";
				} else {
					setLoginStatus(true);
					setUsername(reponse.data[0].IdClient);
					document.getElementById("erreur_connexion").innerHTML = "";
				}
			});
		}
    }

	return (
		<div>
			{loginStatus ? <BannerConnect onClick={deconnexion} client={username}/> : <Banner />}
			<div className="connexion c_cadre">
				<div id="cadre_connexion" className="i_info_connexion c_info_connexion">
					<div className="i_bouton_connexion">CONNEXION</div>
					<div className="i_bouton_inscription">INSCRIPTION</div>
					<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>

					<div className="i_zones_info c_zones_info">
						<div className="i_titre_adresse">ADRESSE E-MAIL</div>
						<InputInformations className_div="i_champ_adresse" id_input="texte_utilisateur" id_span="erreur_mail" maxLenght="100"/>

						<div className="i_titre_mdp">MOT DE PASSE</div>
						<InputInformations className_div="i_champ_mdp" id_input="texte_mdp" id_span="erreur_mdp" maxLenght="100" type="password"/>
						
						<div className="i_bouton_envoi">
							<input id="bouton_connexion_envoi" type="button" value="CONNEXION" onClick={recupererClient} />
							<br></br><span className="message_erreur" id="erreur_connexion"></span>
						</div>
					</div>
				</div>	
			</div>
		</div>
		
	);
}

export default Connexion;
