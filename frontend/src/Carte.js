import {useEffect, useState} from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Carte = () => {
    const [tableau_panier, setTableau]= useState([]) 
    const [titres, setTitres] = useState(null)
    const [paniers, setPanier] = useState(null)
    const [contenu, setContenu]= useState(null)

    
    let id_client = 20
    let prixTotal = 0 
    let tableauPrix = [] 
    let id_comm = 20

        
    useEffect(()=>{
        let id_comm = 200
        var remplirCategorie = {method: 'GET', 
            headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/categories', remplirCategorie)
        .then(response=>{ 
            return response.json()
        })
        .then(json =>{ 
            setTitres(json)
        })
        

        var remplirMenu = {method: 'GET', 
            headers: {'Content-type':'application/json'}
        }; 
        fetch('http://localhost:3001/menu', remplirMenu)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setContenu(json)
            }) 
           
        
        var panier = {method: 'GET', 
        headers: {'Content-type':'application/json'}
        }; 
        fetch(`http://localhost:3001/loadingBasket/${id_comm}`, panier)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setPanier(json)
            }) 

    }, [])
    
    function panier(idProduit) {
     
        let compteur = 0 
        // On créé une fois une entrée dans la table de reservation. 
        if(compteur === 0){
            var myInit = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : id_comm, 
                                    IdClient : id_client,
                                    IdEtat:"Composition",                      
                                })
            }
            fetch('http://localhost:3001/orders', myInit)
            .then(res => {
                return res.json();
            })
        compteur += 1
        }
        
        // On récupère la quanité indiqué sur la page. 
        let qtt = Number(document.getElementById(idProduit+"compteur").value)
        
        //  On ajoute un produit dans la table
        if(qtt === 1){
            
            var remplirPanier = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : id_comm, 
                                    IdProduit : idProduit,
                                    Quantite : qtt
                                })  
            }
            fetch('http://localhost:3001/intermediateBasket', remplirPanier)
            .then(res => {
                return res.json();
            })
        }

        else{
            
            // On change la quantité d'un produit qui est déjà dans la table. 
            var changerquantite = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdCommande : Number(id_comm), 
                                    IdProduit : Number(idProduit),
                                    Quantite : qtt
                                }) 
            }
            fetch('http://localhost:3001/changingquantity',changerquantite)
            .then(res => {
                return res.json();
            }) 
        }
    }
        
    function payer() {
        // On change le status dans la table de reservation de "Composition" à "Panier"
        var myInit = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdComm : id_comm, 
                                    IdClient : id_client,
                                    Etat:"Panier",                      
            })
        }
        fetch('http://localhost:3001/orders', myInit)
            .then(res => {
                return res.json();
            })
    }
    
        
    return(
        <div>
            <div id = 'bordPrincipal'>
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
                                    <span><input id= {contenu_filtre.IdProduit+ "compteur"} className="valeur" type ="number"  step="1" min="0" defaultValue="0" onChange= {()=>panier(contenu_filtre.IdProduit)} ></input></span>
                                    </div>
                                </div>
                            ))}
                        </details>
                    </fieldset>
                ))}   
            </div>
        
            <span className="symbolpanier">Panier &#128722;
                <div id="panier">
                    <div id="article"> 
                        {paniers&&paniers.map(panier => (
                            <div className="basket">
                                {contenu && contenu.filter(content => panier.IdCategorie === content.IdCategorie).map(contenu_filtre => (
                                    <div>
                                    <div className='produit'>{contenu_filtre.Produit}</div>
                                    <div className='prix'>{contenu_filtre.Prix} X {panier.Quantite}</div>
                                    </div>
                                ))}
                                <div className='quantite'>{panier.Quantite}</div>
                            </div>
                        ))}         
                    </div>

                    <div id="total">
             
                    </div>
                </div>
            </span>
        <NavLink to="/panier"><a href="/" className="symbolpayer" onClick={payer}>Passer Commande &#128184;</a></NavLink>
    </div>
    );
};

export default  Carte; 


