import React from 'react'
import HalfDiv from './components/HalfDiv'
import Header from './components/Header'
import Contact from './components/Contact'
import Axios from 'axios'
import { useEffect, useState } from 'react';
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import Chargement from './Chargement';

const Informations = () => {
    require('./css/informations.css');
    Axios.defaults.withCredentials = true;

    const [horairesList, setHorairesList] = useState([]);
    const [coordonneesList, setCoordonneesList] = useState([]);
    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateur, setUtilisateur] = useState(10000000000);
    const [valeursPretesINF, setValeursPretesINF] = useState(false);


	/**
	 * Vérifie si l'utilisateur est connecté au chargement de la page
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(()=> {
        getCoordonnees()
        getHoraires()
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

    const getHoraires = () => {
         Axios.get('/api/coord/horaires').then((response) => {
            setHorairesList(response.data)
            console.log("hor ok ")
        })
    }

    const getCoordonnees = () => {
        Axios.get('/api/coordonnees').then((response) => {
            setCoordonneesList(response.data)
            console.log("coor ok ")
       })
   }

   /**
         * Vérifie si les valeurs en asynchrone sont arrivées
         * 
         * @author Clémentine Sacré <c.sacre@students.ephec.be>
         */
    useEffect(() => {
        console.log("ho : ", horairesList, " co : ", coordonneesList)
        if (horairesList.length > 0 && coordonneesList.length > 0) {
            setValeursPretesINF(true);
        }
    }, [horairesList, coordonneesList]);

    if (!valeursPretesINF) {
        return (
            <Chargement />
        );
    }

    else {
        return (
            <div>
                {statutConnexion ? <BanniereConnection page="informations" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique page="informations" />}
                <div className="Informations">                
                    <Header title={ "Nous contacter" } />
                    <HalfDiv divpos="leftdiv" link={ <iframe title='Restaurant' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.210015160706!2d4.612659415902056!3d50.66885037948458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c17fd50d4008e7%3A0xb64e4f665fdb6236!2sChick%20&#39;N&#39;%20Fish!5e1!3m2!1sfr!2sbe!4v1617966140947!5m2!1sfr!2sbe" width='100%' height='100%' allowFullscreen='' loading='lazy'></iframe>} />
                    <HalfDiv divpos="rightdiv" link= { <Contact 
                        Mon={horairesList.map((val) => {return val.Lundi})}
                        Tue={horairesList.map((val) => {return val.Mardi})}
                        Wen={horairesList.map((val) => {return val.Mercredi})}
                        Thu={horairesList.map((val) => {return val.Jeudi})}
                        Fri={horairesList.map((val) => {return val.Vendredi})}
                        Sat={horairesList.map((val) => {return val.Samedi})}
                        Sun={horairesList.map((val) => {return val.Dimanche})}
                        mail={coordonneesList.map((val) => {return val.Mail})}
                        number={coordonneesList.map((val) => {return val.Gsm})}
                        address={coordonneesList.map((val) => {return (val.Rue + " " + val.Numero + "  ,  " + val.Zip + " " + val.Ville)})} 
                        />} 
                    />
                </div>
            </div>)
    }
}

export default Informations;

