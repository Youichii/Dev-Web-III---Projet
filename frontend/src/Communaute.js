import {useEffect, useState} from 'react';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import BoutonCommunautee from './components/BoutonCommunautee'; 
import React from 'react';


const Communaute = () => {
    require("./css/communaute.css")
    Axios.defaults.withCredentials = true;

    let [utilisateurs, setUtilisateurs] = useState(null)
    let[commentaires, setCommentaires] = useState(null)
    let [nom, setNom] = useState(null)
    let [ville, setVille] = useState(null)
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
  
    

    useEffect(()=>{
        
        // GET qui va chercher tous les profil de la communauté
        var remplirCommunaute = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/users', remplirCommunaute)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setUtilisateurs(json)
        })

        // GET qui récupère une version sans doublons des villes 
        var remplirVille = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/filterVille', remplirVille)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setVille(json)
        })

        // GET qui récupère une version sans doublons des nom
        var remplirNom = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/filterNom', remplirNom)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setNom(json)
        })

        // GET qui récupère le contenu de commentaires 
        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/comment', remplirCommentaire)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setCommentaires(json)
        })
    },[])
    
   
   

    function changerCouleur(id){
    /**
     * Change la couleur du Nom et du Prénom d'une personne 
     * de la communauté  en rouge ou en blanc lorsque le 
     * patron la Blackliste ou la Déblackliste. 
     * @author Cécile Bonnet <c.bonnet@gmail.com>
     * @param {Number} id de la Personne sur qui le patron a cliqué pour la blacklister/déblacklister. 
     * 
     */
        
        let boutonValeur = document.getElementById("blacklist"+id).innerHTML 
        var retournerStatus;

        if (boutonValeur === "Blacklister"){

            document.getElementById("blacklist"+id).innerHTML = "De-Blacklister"
            document.getElementById(id+"utilisateur").style.color = "red"  

            retournerStatus = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ Status: 1 , IdClient:id})
            }
            fetch('/api/status', retournerStatus)
            .then(res => {
                return res.json();
            })
        }
       
        else {

            document.getElementById("blacklist"+id).innerHTML = "Blacklister"   
            document.getElementById(id+"utilisateur").style.color = "white" 

            retournerStatus = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ Status: 0, IdClient:id})
            }
            fetch('/api/status', retournerStatus)
            .then(res => {
                return res.json();
            })       
        }
    }

     /**
     * Supprimer un commentaire que le patron a écrit sur un client. 
     * @author Cécile Bonnet <c.bonnet@gmail.com>
     * @param {Number} id de la personne chez qui le patron souhaite supprimer
     * un commentaire.
     * @param {String} commentaire que le patron souhaite supprimer 
     * 
     */
    function supprimer(commentaire, id) {

        var supprimerCommentaire = { method : 'DELETE',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({  IdClient: id, 
                                Commentaire:commentaire
        })
        }
        fetch('/api/comment', supprimerCommentaire)
            .then(response => {
                return response.json();
            }) 

        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/comment', remplirCommentaire)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setCommentaires(json)
        })    
    }

     /**
     * Supprimer un commentaire que le patron a écrit sur un client. 
     * @author Cécile Bonnet <c.bonnet@gmail.com>
     * @param {Number} id de la Personne chez qui le patron veut envoyer un commentaire.
     * @returns {false} la fonction return false si le patron tente d'envoyer un commentaire
     * vide. 
     */
    function ecrire(id){ 
 
        let commentaire = document.getElementById("text"+id).value
   
        if (commentaire === ""){
            return false
        }

        var retournerCommentaire = { method:'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({  IdClient  :id,
                                Commentaire : commentaire
                            })
        }
        fetch('/api/comment', retournerCommentaire)
        .then(res => {
            return res.json();
        })

        document.getElementById("text"+id).value = ""
        document.getElementById("text"+id).innerHTML = "<placeholder = 'Commentaire sur le client'>" 

        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('/api/comment', remplirCommentaire)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setCommentaires(json)
        })
    }
  
    /**
     * Effectue un trie sur base de 3 fieldset Nom, Ville et Status. Récupère le 
     * paramètre de tri souhaité et l'applique.  
     * @author Cécile Bonnet <c.bonnet@gmail.com>
     * 
     */
    function Trie(){

        
        let valueStatus =document.getElementById("selectStatus").value
        let valueVille = document.getElementById("selectVille").value
        let valueNom = document.getElementById("selectName").value 


        
        if(valueVille === '' && valueStatus === '' && valueNom === ''){
        
            var remplirCommunaute = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch('/api/users', remplirCommunaute)
            .then(response =>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
                    
            })
        }
    
        else if(valueVille !== '' && valueStatus === '' && valueNom === ''){

            var remplirCommunauteVille = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch(`/api/usersville/${valueVille}`, remplirCommunauteVille)
            .then(response =>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }

        else if (valueVille === '' && valueStatus !== '' && valueNom === ''){

            if(valueStatus === "Blacklisté"){
                valueStatus=1
            }
            else{
                valueStatus=0
            }

            var remplirCommunauteStatus = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch(`/api/usersstatus/${valueStatus}`, remplirCommunauteStatus)
            .then(response =>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })

        }

        else if (valueVille === '' && valueStatus === '' && valueNom !== ''){
            
            // GET qui va chercher les profils sur base du nom selectionné 
            var remplirCommunauteNom = {method : 'GET',    
            headers:{'Content-type':'application/json'}
            }
            fetch(`/api/usersnom/${valueNom}`, remplirCommunauteNom)
            .then(response=>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }

        // else if(valueVille !== '' && valueStatus !== '' && valueNom === ''){

        //     if(valueStatus === "Blacklisté"){
        //         valueStatus=1
        //     }
        //     else{
        //         valueStatus=0
        //     }

        //     var remplirCommunauteVilleStatus = {method : 'GET',    
        //     headers:{'Content-type':'application/json'}
        //     }
        //     fetch(`/userVilleStatus/${valueVille}/${valueStatus}`, remplirCommunauteVilleStatus)
        //     .then(response=>{
        //         return response.json()
        //     })
        //     .then(json =>{
        //         setUtilisateurs(json)
        //     })
        // }

        // else if(valueVille === '' && valueStatus !== '' && valueNom !== ''){

        //     if(valueStatus === "Blacklisté"){
        //         valueStatus=1
        //     }
        //     else{
        //         valueStatus=0
        //     }

        //     var remplirCommunauteStatusNom = {method : 'GET',    
        //     headers:{'Content-type':'application/json'}
        //     }
        //     fetch(`/userStatusNom/${valueStatus}/${valueNom}`, remplirCommunauteStatusNom)
        //     .then(response=>{
        //         return response.json()
        //     })
        //     .then(json =>{
        //         setUtilisateurs(json)
        //     })
        // }

        // else if(valueVille !== '' && valueStatus === '' && valueNom !== ''){
        //     var remplirCommunauteVilleNom = {method : 'GET',    
        //     headers:{'Content-type':'application/json'}
        //     }
        //     fetch(`/userVilleNom/${valueVille}/${valueNom}`, remplirCommunauteVilleNom)
        //     .then(response=>{
        //         return response.json()
        //     })
        //     .then(json =>{
        //         setUtilisateurs(json)
        //     })
        // }
       

        
    }

    return(

        <div>
            {statutConnexion ? <BanniereConnection page="communaute" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
            <fieldset id = "recherche">

                <select id="selectVille" onChange={()=>Trie()}>

                    <option value=''>--Selectionnez un ville--</option>

                    {ville&&ville.map(utilisateur => 
                       
                        <option>{utilisateur.Ville}</option>
                        
                    )}
    
                </select>
                
                <select id="selectStatus" onChange={()=>Trie()}>

                    <option value=''>--Selectionnez un status--</option>
                    <option>Non-Blacklisté</option>
                    <option>Blacklisté</option>
                                
                </select>

                <select id="selectName" onChange={()=>Trie()}>
                    
                    <option value=''>--Selectionnez un Nom--</option>
                    {nom&&nom.map(utilisateur => 
                        <option>{utilisateur.Nom}</option>
                    )}
                                
                </select>
                

            </fieldset>

            <div id = "communaute"> 

                {utilisateurs&&utilisateurs.map(utilisateur => (

                    <div  className = "coordonnes">

                        <div className="utilisateur" id={utilisateur.IdClient+"utilisateur"} style={(utilisateur.Statut === 0)?{color:"white"}:{color:"red"}}  >{utilisateur.Prenom} {utilisateur.Nom}</div>
                   
                        <BoutonCommunautee className='status' id ={"blacklist" + utilisateur.IdClient} onClick={() => changerCouleur(utilisateur.IdClient)} value={(utilisateur.Statut === 0)?('Blacklister'):('Dé-Blacklister')} />
                        
                        <div className="mail">{utilisateur.Mail}</div>

                        <div className="tel">{utilisateur.GSM}</div>

                        <div className="ville">{utilisateur.Ville}</div>

                        <div className="age">{utilisateur.Anniversaire.slice(0,10)}</div>

                        <div className="genre">{utilisateur.Genre}</div>


                        <input type="text" placeholder="Commentaire sur le client" className = "text" id = {"text"+utilisateur.IdClient} ></input>

                        
                        <BoutonCommunautee className='envoyer' id ={'envoyer'+ utilisateur.IdClient} onClick={() => ecrire(utilisateur.IdClient)} value='Envoyer'/>

                        <div id={utilisateur.IdClient+"commentaire"} className ='com'> 

                            {commentaires&&commentaires.filter(commentaire =>  commentaire.IdClient === utilisateur.IdClient).map(commentaire_id => (
                                <div id = {commentaire_id.Commentaire + commentaire_id.IdClient} > -  {commentaire_id.Commentaire} <BoutonCommunautee className='boutton_supprimer' onClick={() => supprimer(commentaire_id.Commentaire, commentaire_id.IdClient)} value='X'/></div>
                            ))}   
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>       
    )
}

export default Communaute; 