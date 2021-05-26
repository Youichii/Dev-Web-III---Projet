import {useEffect, useState} from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Axios from "axios";
import PDFMenu from './pdf/ChickNFish_Menu.pdf';

const Carte = () => {
    require('./css/carte.css');
    Axios.defaults.withCredentials = true;
    
  
    const [titres, setTitres] = useState(null)
    const [paniers, setPanier] = useState(null)
    const [contenu, setContenu]= useState(null)
    const [idCommandes, setIdCommande] = useState(10000000000)
    const [statutConnexion, setStatutConnexion] = useState(true);
	const [utilisateur, setUtilisateur] = useState(10000000000);
    const [conditions, setCondition] = useState(false)
    const [totals, setTotal] = useState(null)
    

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

                var verifEntreReservation = {method: 'GET', 
                headers: {'Content-type':'application/json'}
                }; 
                fetch(`/api/orders/users/${reponse.data.user[0].IdClient}`, verifEntreReservation)
                .then(response=>{ 
                    return response.json()
                })
                .then(json =>{
                    console.log("value de retour json", json) 

                    if(json.length === 1){
                        console.log("On récupère un id qui existe déjà")
                        setIdCommande(json[0].IdCommande)  //Il y a une commande en attente dans le panier de commande avec un IdCommande 
                        console.log(json[0].IdCommande) 
                        let idCommandes = json[0].IdCommande

                        var panier = {method: 'GET', 
                        headers: {'Content-type':'application/json'}
                        }; 
                        fetch(`/api/loadingBasket/${idCommandes}`, panier)
                        .then(response=>{ 
                            return response.json()
                        })
                        .then(json =>{ 
                            console.log('table du panier', json[0].Quantite)
                            json.map(maping=> 
                                document.getElementById(maping.IdProduit + 'compteur').value = maping.Quantite
                            )
                            setPanier(json)
                        }) 
                        
                        // var totalCommande = {method: 'GET', 
                        // headers: {'Content-type':'application/json'}
                        // }; 
                        // fetch(`/api/total/${idCommandes}`, totalCommande)
                        // .then(response=>{ 
                        //     return response.json()
                        // })
                        // .then(json =>{ 
                        //     setTotal(json.PrixTotal)
                        //     console.log(json)
                        // }) 
                    }

                    else{
                        console.log("Créeation table")
                        var premiereEntre = { method:'POST', 
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({  IdClient : reponse.data.user[0].IdClient })
                        };
                        fetch('/api/orders', premiereEntre)
                        .then(res => {
                            return res.json();
                        })
                        .then(data =>{ 
                            console.log("Vérification que la table a bien été créé")
                            var verifEntreReservation = {method: 'GET', 
                            headers: {'Content-type':'application/json'}
                            }; 
                            console.log(reponse.data.user[0].IdClient)
                            fetch(`/api/orders/users/${reponse.data.user[0].IdClient}`, verifEntreReservation)
                            .then(response=>{ 
                                return response.json()
                            })
                            .then(json =>{ 
                                setIdCommande(json[0].IdCommande)
                                console.log("l'id de la nouvelle commande est : ", json[0].IdCommande)
                            })
                        })
                    } 
                }) 
            }
            else {setStatutConnexion(false);}
        }) 
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
        
        
    }, [])

    /**
     * Remplie le panier de commande selon ce que le client ajoute ou retire
     * @author Cécile Bonnet <c.bonnet@gmail.com>
     * @param {Number} idProduit du produit que l'on veut ajouter au panier. 
     * 
     */
    function panier(idProduit) {
        let qtt = Number(document.getElementById(idProduit+"compteur").value)
        console.log("quantité du produit", qtt)

        if(qtt === 0){
            var supprimerCommandeA0 = { method : 'DELETE',
            headers : {'Content-Type':'application/json'}
            };
            
            fetch('/api/deleteZero', supprimerCommandeA0)
            .then(response => {
                console.log('supprimer')
                return response.json();
            }) 
        }

        if(qtt === 1){
                
            var remplirPanier = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : idCommandes, 
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
            fetch(`/api/loadingBasket/${idCommandes}`, panier)
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
            body: JSON.stringify({  IdCommande : idCommandes, 
                                    IdProduit : idProduit,
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
        fetch(`/api/loadingBasket/${idCommandes}`, panier)
        .then(response=>{ 
            return response.json()
        })
        .then(json =>{ 
            setPanier(json)
        }) 


        // var totalCommande = {method: 'GET', 
        // headers: {'Content-type':'application/json'}
        // }; 
        // fetch(`/api/total/${idCommandes}`, totalCommande)
        // .then(response=>{ 
        //     return response.json()
        // })
        // .then(json =>{ 
        //     console.log("total", json)
        //     setTotal(json.PrixTotal)
        // })        
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
                                    <span>{statutConnexion ? <input id= {contenu_filtre.IdProduit+ "compteur"} className="valeur" type ="number"  step="1" min="0"  defaultValue="0" onChange= {()=>panier(contenu_filtre.IdProduit)}></input>:<span></span>}</span>
                                    </div>
                                </div>
                            ))}
                        </details>
                    </fieldset>
                ))}   
            </div>
        
           {statutConnexion ?  <span className="symbolpanier">Panier &#128722;
                <div id="panier" >
                    {paniers&&paniers.map(contenu_filtre => (
                        <div className='commande'>
                        <div className='nomProduit'>{contenu_filtre.Produit}</div>
                        <div className='quantitee'>{contenu_filtre.Prix}€ X {contenu_filtre.Quantite}</div>
                        <div className='prixTotal'>Total: {contenu_filtre.PrixTotal}€</div>
                        </div>          
                    ))}

                    {/* <div className="total">Total de la commande :  {totals} </div> */}
                    
                </div>  
                                </span> : 
            <span></span>}

            { statutConnexion ?  <NavLink to="/panier"><a href="/" className="symbolpayer" >Passer Commande &#128184;</a></NavLink> : <span></span>}
 
            <a href={PDFMenu} download id="menuT">
           Menu Téléchargeable  
            </a>
            
        </div>
    );
};

export default  Carte; 


