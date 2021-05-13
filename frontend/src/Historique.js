import {useEffect, useState} from 'react';


const Historique = () => {
    require("./historique.css")
    let [historique, setHistorique] = useState(null)
    let[date, setDate] = useState([])

    useEffect(()=>{

        // GET qui va chercher toutes les commandes
        var remplirHistorique = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/historical', remplirHistorique)
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
        fetch('/historicalDate', remplirDate)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setHistorique(json)
        })


    },[])

    return(
        <div>
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