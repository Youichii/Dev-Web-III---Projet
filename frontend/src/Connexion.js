import { useEffect, useState } from 'react';
import InputInformations from './components/InputInformations';
import Axios from "axios";

const Connexion = () => {
	require('./connexion.css');

	const [loginStatus, setLoginStatus] = useState("");

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

	const deconnexion = () => {
		Axios.get(`http://localhost:3001/deco`).then((response) => {
			console.log("deconnexion: ", response) ; 
			setLoginStatus(false);
			console.log("deconnecté");
		});
	}

	Axios.defaults.withCredentials = true;
	const recuperer_client = () => {

		let mail = document.getElementById("text_user").value ;
		let pwd = document.getElementById("text_mdp").value ;
		Axios.get(`http://localhost:3001/auth/${mail}/${pwd}`).then((response) => {
			console.log("connexion : ", response) ; 
			if (response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				setLoginStatus(response.data[0].username);
			}
		});

		/*
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
		}*/
    }

	useEffect(()=> {
		Axios.get("http://localhost:3001/login").then((response) => {
			console.log("vérifier tjrs connecté : ", response);
			if (response.data.loggedIn == true) {
				setLoginStatus(response.data.user[0].username);
			}
		});
	}, []);

	/*useEffect(()=> {
		let mail = "c.c@gmail.com" ;
		let pwd = "123" ;
		Axios.get(`http://localhost:3001/test/${mail}/${pwd}`).then((response) => {
			console.log("response clem axio : ", response);
		});

		var myInit = { method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		fetch(`http://localhost:3001/test/${mail}/${pwd}`, myInit)
		.then(res => {
			return res.json();
		})
	})*/

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
					<input id="bouton_connexion_envoi" type="button" value="DECONNEXION" onClick={deconnexion} />
				</div>
            </div>	
        </div>
		
    );
}

export default Connexion;
