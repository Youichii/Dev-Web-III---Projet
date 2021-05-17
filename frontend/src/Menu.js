import BarreLateraleGauche from "./BarreLateraleGauche";
import BarreLateraleDroite from "./BarreLateraleDroite";
import Carte from "./Carte";
import {useEffect, useState} from 'react';
import React from 'react';
import Axios from "axios";
import BanniereConnection from './components/BanniereConnection';
import BanniereBasique from './components/BanniereBasique.js';

const Menu = () => {
    require("./css/carte.css")
    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateur, setUtilisateur] = useState(10000000000);
    Axios.defaults.withCredentials = true;

    
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
            {statutConnexion ? <BanniereConnection page="menu" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique page="menu" />}
            <div className = "Menu"> 
                
                <BarreLateraleGauche/>
                <Carte />
                <BarreLateraleDroite />
            </div>

        </div>
    )
}
export default Menu; 