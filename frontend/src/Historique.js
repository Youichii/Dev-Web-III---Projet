import {useEffect, useState} from 'react';
import Axios from "axios";
import Banner from './Banner.js';
import BannerConnect from './components/BannerConnect.js';


const Historique = () => {
    require("./historique.css")
    Axios.defaults.withCredentials = true;

    let [historiques, setHistoriques] = useState(null)
    let[annees, setAnnees]= useState([])
    

    const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState("");
    const [date, setDate] = useState("");

    useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
				setUsername(response.data.user[0].IdClient);
			}
			else {
				setLoginStatus(false);
			}
		});
	}, []);

    const deconnexion = () => {
		Axios.get(`http://localhost:3001/api/deconnexion`).then((response) => {
			setLoginStatus(false);			
		});
	}


    let mois = [{"Id":"01", "Mois":"Janvier"},{"Id":'02', "Mois":"Février"},{"Id":'03', "Mois":"Mars"},{"Id":'04', "Mois":"Avril"},{"Id":'05', "Mois":"Mai"},{"Id":'06', "Mois":"Juin"},{"Id":'07', "Mois":"Juillet"},{"Id":'08', "Mois":"Août"},{"Id":'09', "Mois":"Septembre"},{"Id":'10', "Mois":"Octobre"},{"Id":'11', "Mois":"Novembre"},{"Id":'12', "Mois":"Décembre"} ]
   
    useEffect(()=>{

        var remplirHistorique = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/historical', remplirHistorique)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setHistoriques(json)
        })

        var remplirAnnees = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/year', remplirAnnees)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setAnnees(json)
        })

    },[])

    return(
        <div>
            {loginStatus ? <BannerConnect onClick={deconnexion} client={username}/> : <Banner />}
            {historiques&&historiques.map(historique =>  
                setDate.push(historique.DateCommande) 
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