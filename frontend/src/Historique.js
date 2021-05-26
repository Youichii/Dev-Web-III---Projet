import {useEffect, useState} from 'react';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';


const Historique = () => {
    require("./css/historique.css")
    Axios.defaults.withCredentials = true;

    let [historiques, setHistoriques] = useState(null)
    let[annees, setAnnees]= useState([])
    const [date, setDate] = useState(null);
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


    let mois = [{"Id":"01", "Mois":"Janvier"},{"Id":'02', "Mois":"Février"},{"Id":'03', "Mois":"Mars"},{"Id":'04', "Mois":"Avril"},{"Id":'05', "Mois":"Mai"},{"Id":'06', "Mois":"Juin"},{"Id":'07', "Mois":"Juillet"},{"Id":'08', "Mois":"Août"},{"Id":'09', "Mois":"Septembre"},{"Id":'10', "Mois":"Octobre"},{"Id":'11', "Mois":"Novembre"},{"Id":'12', "Mois":"Décembre"} ]
   
    useEffect(()=>{
        var remplirHistorique = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/historical', remplirHistorique)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setHistoriques(json);
        })

        var remplirAnnees = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/year', remplirAnnees)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setAnnees(json)
        })

    },[])

    return(
        <div>
            {statutConnexion ? <BanniereConnection page="historique" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
            {historiques&&historiques.map(historique =>  
                date.push(historique.DateCommande) 
            )}
            <div id = 'cadre'>
                {annees&&annees.map(annee => 
                    <details>
                        <summary className='annee'>{annee.Annee }</summary>
                        {mois.map(remplirMois =>                       
                            <details>
                                <summary className='mois'>{remplirMois.Mois}</summary> 
                                <table className="tableau">
                                    <tr className="titres">
                                        <th>Date de la command </th>
                                        <th> Id du client </th>
                                        <th> Ville de commande </th>
                                        <th> Contenu de la commande </th>
                                        <th> Total de la commande </th>                                       
                                    </tr>
                                    {historiques&&historiques.filter(historique =>
                                    String(historique.DateCommande).slice(5,7) === remplirMois.Id &&  String(historique.DateCommande).slice(0,4) === annee.Annee )
                                    .map(remplirHistorique =>
                                        <tr className='ligneHistorique'>
                                            <td className="ligne">{remplirHistorique.DateCommande.slice(0,10)}</td>
                                            <td className="ligne">{remplirHistorique.IdClient}</td>
                                            <td className="ligne">{remplirHistorique.Ville}</td>
                                            <td className="ligne">{remplirHistorique.Produits}</td>
                                            <td className="ligne">{remplirHistorique.Total}€</td>
                                        </tr>
                                    )} 
                                </table>
                            </details> 
                        )}  
                    </details>             
                )}
            </div>
        </div>
    );
}
export default Historique; 