import {useEffect, useState} from 'react';
import Axios from "axios";
import Banner from './Banner.js';
import BannerPatron from './BannerPatron.js';


const Historique = () => {
    require("./historique.css")
    Axios.defaults.withCredentials = true;

    let [historique, setHistorique] = useState(null)
    let[date, setDate] = useState([])

    const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState("");

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

    useEffect(()=>{

        // GET qui va chercher toutes les commandes
        var remplirHistorique = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/historical', remplirHistorique)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setHistorique(json)
        })

        // GET qui va chercher toutes les commandes
        var remplirDate = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/historicalDate', remplirDate)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setHistorique(json)
        })


    },[])

    return(
        <div>
            {loginStatus ? <Banner /> : <BannerPatron />}
            {historique&&historique.map(histo =>  
                setDate.push(histo.DateCommande) 
            )}
            {date.map(dat =>
                <div style={{color:'red'}}>{dat.DateCommande} </div>
            )}
            {/* {historique&&historique.map(histo => 
                <div style={{color:'red'}}>{histo.DateCommande.slice(0,4)} </div>

                )}   */}

        </div>

        

    );
}
export default Historique; 