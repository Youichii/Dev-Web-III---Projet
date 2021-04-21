import {useEffect, useState} from 'react';
// import Axios from 'axios';
import React from 'react';



const Carte = () => {

    var tableau_panier = []
    

    
    const titres = ["Poulet", "Poisson", "Salade", "Végétarien", "Soft", "Alcool", "Menu Découverte"]; 

    const [contenu, setContenu]= useState(null)


   

    function panier (id) {
        

        let qtt = document.getElementById(id+"compteur").value
        let compteur = 0 
    

        if(qtt === 0){
          
        }
        if(tableau_panier.length === 0){
            contenu.filter(item => id === item.id).map(itemid => 
                tableau_panier.push({
                    id : id,
                    article: itemid.article,
                    quantite: qtt,
                    prix : itemid.prix
                })
            )
  
        }
        else{
            tableau_panier.filter(filtre_id => id === filtre_id.id).map(basket =>
                    compteur += 1
                )
            if (compteur === 1){
                tableau_panier.filter(filtre_id => id === filtre_id.id).map(basket =>
                    basket.quantite = qtt
                )
            }
            else {
                contenu.filter(item => id === item.id).map(itemid => 
                    tableau_panier.push({
                        id : id,
                        article: itemid.article,
                        quantite: qtt,
                        prix : itemid.prix
                    })
                )
            }          
        }
            
    }

    const Afficher_commande =() => {
        let prix_total = 0 
       
        let display = document.getElementById("afficherCacher").style.display
        if(display === 'none'){
            document.getElementById("afficherCacher").style.display = 'block'
            document.getElementById("afficherCacher").innerHTML = ""
        }
        else{
            document.getElementById("afficherCacher").style.display = 'none'
        }
        let carte = tableau_panier 
        console.log(carte)
        document.getElementById("afficherCacher").innerHTML=""
        tableau_panier.filter(tp => tp.quantite !== "0" ).map(tp=>( 

            document.getElementById("afficherCacher").innerHTML += "Article : " + tp.article + "<br>" + 
                                                                   "Quantitée: " + tp.quantite + "<br>" +
                                                                    "Prix : " + (tp.prix*tp.quantite).toFixed(2) + "<br>"

                                        
        )
        )
        
        tableau_panier.filter(tp => tp.quantite !== "0" ).map(tp=>( 
            // document.getElementsByClassName("prix_total").innerHTML += tp.quantite*tp.prix
            prix_total += tp.quantite*tp.prix 
            
        ))
        console.log(prix_total)
        
                        
    }
    
    useEffect(()=>{

        fetch('http://localhost:3001/menu')
            .then(response=>{ 
                return response.json()
            })
            .then(json =>{ 
                setContenu(json)
                
            })
            
            
        })
        
            
            
        
   
    
    

    return(
        <div id = 'bordPrincipal'>
            {titres.map(titre => (
                <fieldset className="cadre">
                    <details>
                        <summary className="titre" key = {titre}> {titre} </summary>
                        {contenu && contenu.filter(contenus => contenus.Catégorie === titre).map(contenu_filtre => (
                            <div> 
                                <div className="haut">
                                <span className="contenu">{contenu_filtre.Produit}</span>
                                <span className="price">{contenu_filtre.Prix.toFixed(2) + "€" }</span>
                                
                                </div>
                                <div className="bas">  
                                <span className="description">{contenu_filtre.Commentaire}</span>  
                                <span><input id= {contenu_filtre.id+ "compteur"} className="valeur" type ="number"  step="1" min="0" defaultValue="0" onChange= {()=>panier(contenu_filtre.id)} ></input></span>
                                </div>
                            </div>
                        ))}
                        
                    </details>
                </fieldset>
            ))}
            
            <button id="voir" onClick={Afficher_commande} className = "boutton">Voir ma commande</button> 
            
            
            
        </div>
    );
};

export default  Carte; 


