import {useEffect, useState} from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Axios from "axios";
import BanniereBasique from './BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import PDFMenu from './pdf/ChickNFish_Menu.pdf';

const Carte = () => {
    require('./css/carte.css');
    Axios.defaults.withCredentials = true;
    
    const [tableau_panier, setTableau]= useState([]);
    const [titres, setTitres] = useState(null)
    const [paniers, setPanier] = useState(null)
    const [contenu, setContenu]= useState(null)
    let id_comm = 20;
    const [statutConnexion, setStatutConnexion] = useState(true);
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

        
    useEffect(()=>{

        var remplirCategorie = {method: 'GET', 
            headers:{'Content-type':'application/json'}
        }
        fetch('/api/categories', remplirCategorie)
        .then(response=>{ 
            return response.json()
        })
        .then(json =>{ 
            setTitres(json)
        })
        

        var remplirMenu = {method: 'GET', 
            headers: {'Content-type':'application/json'}
        }; 
        fetch('/api/menu', remplirMenu)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setContenu(json)
            }) 
           
        
        var panier = {method: 'GET', 
        headers: {'Content-type':'application/json'}
        }; 
        fetch(`/api/loadingBasket/${id_comm}`, panier)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setPanier(json)
            }) 

    }, [])
    
    /**
     * Remplie le panier de commande selon ce que le client ajoute ou retire
     * @author Cécile Bonnet <c.bonnet@gmail.com>
     * @param {Number} idProduit du produit que l'on veut ajouter au panier. 
     * 
     */
    function panier(idProduit) {
 
        let compteur = 0 
        if(compteur === 0){
            var premiereEntre = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : Number(id_comm), 
                                    IdClient : Number(utilisateur)                     
                                })
            }
            fetch('/api/orders', premiereEntre)
            .then(res => {
                return res.json();
            })
        compteur += 1
        }

        let qtt = Number(document.getElementById(idProduit+"compteur").value)

        if(qtt === 1){
            
            var remplirPanier = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : id_comm, 
                                    IdProduit : idProduit,
                                    Quantite : qtt
                                })  
            }
            fetch('/api/intermediateBasket', remplirPanier)
            .then(res => {
                return res.json();
            })

            var panier = {method: 'GET', 
            headers: {'Content-type':'application/json'}
            }; 
            fetch(`/loadingBasket/${id_comm}`, panier)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setPanier(json)
            }) 
        }

        else{
            var changerquantite = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : Number(id_comm), 
                                    IdProduit : Number(idProduit),
                                    Quantite : qtt
                                }) 
            }
            fetch('/api/changingquantity',changerquantite)
            .then(res => {
                return res.json();
            }) 
        }
        var panier = {method: 'GET', 
        headers: {'Content-type':'application/json'}
        }; 
        fetch(`/api/loadingBasket/${id_comm}`, panier)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setPanier(json)
            }) 
    }
        

    return(
        <div>
           
            <div id = 'bordPrincipal'>
            {statutConnexion===false ? (<span id="alerte" style={{color:"red"}} >&#9888;&#65039;Connectez-vous pour former votre panier&#9888;&#65039;</span>): <span></span>}
                {titres&&titres.map(titre => (
                    <fieldset className="cadre">
                        <details>
                            <summary className="titre" key = {titre.NomCategorie}> {titre.NomCategorie} </summary>
                            {contenu && contenu.filter(contenus => contenus.IdCategorie === titre.NomCategorie.slice(0,3)).map(contenu_filtre => (
                                <div> 
                                    <div className="haut">
                                    <span className="contenu">{contenu_filtre.Produit}</span>
                                    <span className="price">{contenu_filtre.Prix.toFixed(2) + "€" }</span>
                                    </div>
                                    <div className="bas">  
                                    <span className="description">{contenu_filtre.Description}</span>  
                                    <span>{statutConnexion ? <input id= {contenu_filtre.IdProduit+ "compteur"} className="valeur" type ="number"  step="1" min="0" defaultValue="0" onChange= {()=>panier(contenu_filtre.IdProduit)}></input>:<span></span>}</span>
                                    </div>
                                </div>
                            ))}
                        </details>
                    </fieldset>
                ))}   
            </div>
        
            <span className="symbolpanier">Panier &#128722;
                <div id="panier" >
                    {paniers&&paniers.map(contenu_filtre => (
                                    <div className='commande'>
                                    <div className='titre'>{contenu_filtre.Produit}</div>
                                    <div className='description'>Total: {contenu_filtre.Quantite*contenu_filtre.Prix}€</div>
                                    <div className='price'>{contenu_filtre.Prix}€ X {contenu_filtre.Quantite}</div>
                                    </div>
                                   
                    ))}
                
                </div>
                               
                    
                     
                    <div id="total">
             
                    </div>
                
            </span>
            <NavLink to="/panier"><a href="/" className="symbolpayer" >Passer Commande &#128184;</a></NavLink>
            
            <a href={PDFMenu} download id='lien'>
            Cliquez sur le lien pour le telecharger 
            </a>
            
        </div>
    );
};

export default  Carte; 


