import React, {useState, useEffect } from 'react';
import img1 from '../src/images/img1.jpeg'
import img2 from '../src/images/img2.jpeg'
import img3 from '../src/images/img3.jpeg'
import img4 from '../src/images/img4.jpeg'
//import AvisClients from './components/AvisClients'
import Axios from 'axios';
import Banner from './Banner.js';
import BannerConnect from './components/BannerConnect.js';

import './Accueil.css';

const Accueil = () => {

    const [donneeAvis, setDonneeAvis] = useState([]);

    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateur, setUtilisateur] = useState(10000000000);


	/**
	 * Vérifie si l'utilisateur est connecté au chargement de la page
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((reponse) => {
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
		Axios.get(`http://localhost:3001/api/deconnexion`).then((reponse) => {
			setStatutConnexion(false);
		});
	} 


    /**
     * Récupère les avis des clients de l'URL et les enregistre dans une liste
     *@author Noelle Khazoum <kh.noelle@gmail.com>
    */
    useEffect(() => {
        AfficherAvis()
        
    }, [])

    const AfficherAvis = ()=>{
        Axios.get("http://localhost:3001/api/avis").then((response)=>{
            setDonneeAvis(response.data)            
        })
    }

    return (
        <div>
			{statutConnexion ? <BannerConnect onClick={deconnexion} client={utilisateur}/> : <Banner />}
            <div className="hero-container">
                <div className="hero-img">
                    <ul className="defilement-img">
                        <li><img className="img" src={img1} alt="image1"></img></li>
                        <li><img className="img" src={img2} alt="image2"></img></li>
                        <li><img className="img" src={img3} alt="image3"></img></li>
                        <li><img className="img" src={img4} alt="image4"></img></li>
                        
                    </ul>
            
                </div>

                <div onLoad ={AfficherAvis} className="commentaires">
                    <h1>Avis de nos clients</h1>
                    {donneeAvis.map((val)=>{
                        return(
                            <>
                                <h2>{val.IdClient}</h2>
                                <p>{val.Avis}</p>
                                
                            </>
                        )
                    })}
                    
                </div>
            </div>
        </div>

    )
}

export default Accueil;