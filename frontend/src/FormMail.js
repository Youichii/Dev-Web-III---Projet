import { useEffect, useState } from 'react';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';


/**
 * Récupère les valeurs des champs et soumet le formulaire
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 */

 function FormEmail (){
    require('./css/FormMail.css');
     const [emailer, setEmailer] = useState({
         message:""
     });

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
     * Tient compte des changement des valeurs
     * @author Noelle Khazoum <kh.noelle@gmail.com>
     * @param {*} e objet Event qui contient les informations de l'évènement actuel
     */

     function handleChange(e){
         setEmailer((prevState)=>({
             ...prevState,
             [e.target.name]: e.target.value,
         }));
     }

    /**
     * Soumet le formulaire en appuyant sur le bouton "envoyer"
     * @author Noelle Khazoum <kh.noelle@gmail.com> 
     */ 

     const SoumettreEmail = async(e) =>{
        e.preventDefault();
        console.log({emailer});
        const reponse = await fetch ("/envoye",{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({emailer}),
        })
        .then((res)=> res.json())
        .then (()=>{
            setEmailer({
                message:"",
                sujet:"",
                corps:""
            });
        });
     };


     return(
        <div>
            {statutConnexion ? <BanniereConnection onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
            <div className="email-container">
                <div className="formulaire-email">

                    <form data-testid="mailform" className="champ-formulaire" onSubmit={SoumettreEmail}>
                        <legend>Creer une newsletter</legend>

                    <input
                        placeholder="Sujet du message"
                        onChange={handleChange}
                        name="sujet"
                        value={emailer.sujet}
                        />
                    <textarea 
                        placeholder="Promo"
                        onChange = {handleChange}
                        name="message"
                        value={emailer.message}
                    />
                    <textarea 
                        placeholder="Corps"
                        onChange = {handleChange}
                        name="corps"
                        value={emailer.corps}
                    />

                        <button className="btn-email">Envoyer email</button>
                    </form>

                </div>

            </div>
        </div>
     );
 }

 export default FormEmail; 