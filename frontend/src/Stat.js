import React from 'react';
import { useEffect, useState } from 'react';
//import '../../App.css';
import Chart from './components/Chart';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';

/**
 * Page des statiqtiques et du compteur de visiteurs
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * 
 */


function Stat() {

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
    <div className="container-stat">
		{statutConnexion ? <BanniereConnection page="statistiques" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique page="statistiques" />}
		<div className="chart-stat">
			<Chart />
		</div>
		<div className="compteurGA">
			<a href="https://analytics.google.com/analytics/web/?authuser=2#/p272964150/reports/defaulthome?params=_u..nav%3Ddefault">Google Analytics</a>

		</div>
        
        
    </div>
    
  );

};
export default Stat