import {useEffect, useState} from 'react';
import React from 'react';

const Carte = () => {
    const [tableau_panier, setTableau]= useState([]) 
    const [titres, setTitres] = useState(null)
    const [paniers, setPanier] = useState(null)
    const [contenu, setContenu]= useState(null)

    let id_comm = "p2000"
    let id_client = "Pouspous2000"
    let contenu_panier = 0


        
    useEffect(()=>{
        console.log("coucou")

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
        fetch('http://localhost:3001/loadingBasket', panier)
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setPanier(json)
            }) 
    }, [])



        
    function panier(article) {
    
        // récupère la quanité indiqué sur la page. 
        let qtt = document.getElementById(article+"compteur").value
              
        //  si il n'y a rien dans la table, on y mets d'office l'article
        if(contenu_panier === 0){
            
            var remplirPanier = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdComm : id_comm, 
                                    Article : article,
                                    Quantite : qtt
                                })  

            }
            fetch('http://localhost:3001/intermediateBasket', remplirPanier)
            .then(res => {
                return res.json();
            })
        
            contenu_panier +=1
        }

        else{
            
            let panier_inter = []

            // on verifie que l'article n'est pas déjà dans la table 
            paniers.filter(panier => panier.id_commande === id_comm && panier.article === article).map(changerqtt => panier_inter.push(changerqtt))
            
            // si il n'y est pas, on peut mettre 
            if(panier_inter.length === 0 ){
                console.log("coucou")
                var changerquantite = { method:'PUT', 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({  IdComm : id_comm, 
                                        Article : article,
                                        Quantite : qtt
                                    }) 
                }
                fetch('http://localhost:3001/changingquantity',changerquantite)
                .then(res => {
                    return res.json();
                }) 
            }
            else{
               
                var remplirPanier = { method:'POST', 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({  IdComm : id_comm, 
                                        Article : article,
                                        Quantite : qtt
                                    })  
                }
                fetch('http://localhost:3001/intermediateBasket', remplirPanier)
                .then(res => {
                    return res.json();
                })
    
            }
        }
    }
        


        


    
    function payer() {
        console.log("coucou")
        var myInit = { method:'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({  IdComm : id_comm, 
                                    IdClient : id_client,
                                    Methode : null,
                                    Date : null,
                                    HLivraison : null,
                                    Etat:"Temporaire",
                                    CommClient: contenu,
                                    AdresseComplete:null
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
                        <summary className="titre" key = {titre.NomCat}> {titre.NomCat} </summary>
                        {contenu && contenu.filter(contenus => contenus.Catégorie === titre.NomCat).map(contenu_filtre => (
                            <div> 
                                <div className="haut">
                                <span className="contenu">{contenu_filtre.Produit}</span>
                                <span className="price">{contenu_filtre.Prix.toFixed(2) + "€" }</span>
                                
                                </div>
                                <div className="bas">  
                                <span className="description">{contenu_filtre.Description}</span>  
                                <span><input id= {contenu_filtre.Produit+ "compteur"} className="valeur" type ="number"  step="1" min="0" defaultValue="0" onChange= {()=>panier(contenu_filtre.Produit)} ></input></span>
                                </div>
                            </div>
                        ))}
                        
                    </details>
                </fieldset>
            ))}
            
               
        </div>
        
        <span className="symbolpanier">Panier   &#128722;
        <div id="panier">Vous n'avez pas d'articles pour le moment
        <div id="article"></div>
        <div id="total"></div>
        </div>
        </span>
        <a href="/" className="symbolpayer" onClick={payer}>Payer &#128184;</a>
    </div>
    );
};

export default  Carte; 


