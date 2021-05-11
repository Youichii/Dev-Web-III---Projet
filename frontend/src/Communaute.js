import {useEffect, useState} from 'react';

const Communaute = () => {
    require("./communaute.css")
    let [utilisateurs, setUtilisateurs] = useState(null)
    let[commentaires, setCommentaires] = useState(null)
    let [bis, setBis] = useState(null)
    // let [filtreStatus, setFiltreStatus]= useState(null)
    // let user2 = []
    // let [filtreVille , setFiltreVille]= useState(null)
    // let user = []
  
    

    useEffect(()=>{

        // GET qui va chercher tous les profil de la communauté
        var remplirCommunaute = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/users', remplirCommunaute)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setUtilisateurs(json)
            setBis(json)
        })

        // GET qui va chercher tous les commentaires du patron sur la communauté
        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/comments', remplirCommentaire)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setCommentaires(json)
        })
    },[])
    
   
   
    // Fonctionnelle 
    function changerCouleur(id){
        
        // Récupère les valeurs du boutons et de l'id 
        let boutonValeur = document.getElementById("blacklist"+id).innerHTML 

        // Déclarer une variable commune aux deux conditions 
        var retournerStatus;

        // Condition 1 
        if (boutonValeur === "Blacklister"){

            // Changer dans la page HTML la Couleur du Nom ainsi que l'intitulé du bouton 
            document.getElementById("blacklist"+id).innerHTML = "De-Blacklister"
            document.getElementById(id+"utilisateur").style.color = "red"  

            //Update le status du client dans la base de donnée. 
            retournerStatus = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ Status: "De-Blacklister" , Couleur: "red", Identifiant:id})
            
            }
            fetch('http://localhost:3001/status', retournerStatus)
            .then(res => {
                return res.json();
            })
        }

        // Condition 2 
        else {

            // Changer dans la page HTML la Couleur du Nom ainsi que l'intitulé du bouton 
            document.getElementById("blacklist"+id).innerHTML = "Blacklister"   
            document.getElementById(id+"utilisateur").style.color = "white" 

            //Update le status du client dans la base de donnée. 
            retournerStatus = { method:'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ Status: "Blacklister" , Couleur: "white", Identifiant:id})
            }
            fetch('http://localhost:3001/status', retournerStatus)
            .then(res => {
                return res.json();
            })       
        }
    }

    //Fonctionnelle 
    function supprimer(id) {

        // DELETE le commentaire de la table 
        var supprimerCommentaire = { method : 'DELETE',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({IdCommentaire : id})
        }
        fetch('http://localhost:3001/commentaire', supprimerCommentaire)
            .then(response => {
                return response.json();
            }) 

        // Recharge les commentaires de la page 
        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/comments', remplirCommentaire)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setCommentaires(json)
        })    
    }

    // Fonctionnelle 
    function ecrire(id){ 
        
        // Récupérer la valeur du commentaire 
        let comment = document.getElementById("text"+id).value
        
        // Empêcher l'envoie d'un commentaire vide
        if (comment === ""){
            return false
        }

        // POST qui ajoute le commentaire dans la base de donnée
        var retournerCommentaire = { method:'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({  IdUtilisateur :id,
                                Commentaire : comment,
                                IdCommentaire :comment+id , 
                            })
        }
        fetch('http://localhost:3001/comment', retournerCommentaire)
        .then(res => {
            return res.json();
        })

        // Vider le placeHolder et remettre la place initial 
        document.getElementById("text"+id).value = ""
        document.getElementById("text"+id).innerHTML = "<placeholder = 'Commentaire sur le client'>" 
        
        // Recharger les commentaires
        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/comments', remplirCommentaire)
        .then(response =>{
            return response.json()
        })
        .then(json =>{
            setCommentaires(json)
        })
    }
  

    function Trie(){
        
        let valueStatus =document.getElementById("selectStatus").value
        let valueVille = document.getElementById("selectVille").value
        let valueNom = document.getElementById("selectName").value 


        
        if(valueVille === '' && valueStatus === '' && valueNom === ''){
            
            // GET qui va chercher tous les profil de la communauté
            var remplirCommunaute = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch('http://localhost:3001/users', remplirCommunaute)
            .then(response =>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
                    
            })
        }
    
        else if(valueStatus === '' && valueVille !== '' && valueNom === ''){

            // GET qui va chercher les profils sur base de la ville selectionné  
            var remplirCommunauteVille = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch(`http://localhost:3001/usersville/${valueVille}`, remplirCommunauteVille)
            .then(response =>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }

        else if (valueVille === '' && valueStatus !== '' && valueNom === ''){

            // GET qui va chercher les profils sur base du status slesctionné 
            var remplirCommunauteStatus = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch(`http://localhost:3001/usersstatus/${valueStatus}`, remplirCommunauteStatus)
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
            fetch(`http://localhost:3001/usersnom/${valueNom}`, remplirCommunauteNom)
            .then(response=>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }
        
        else{
            //  Ne fonctionne pas 
            var remplirCommunauteStatusVille = {method : 'GET',
            headers:{'Content-type':'application/json'}
            }
            fetch(`http://localhost:3001/userstrie1/${valueStatus}/${valueVille}/${valueNom}`, remplirCommunauteStatusVille)
            .then(response =>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }

        
    }

    return(

        <div>
       
            <fieldset id = "recherche">

                <select id="selectVille" onChange={()=>Trie()}>

                    <option value=''>--Selectionnez un ville--</option>

                    {bis&&bis.map(utilisateur => 
                        <option>{utilisateur.Ville}</option>
                    )}

                </select>
                
                <select id="selectStatus" onChange={()=>Trie()}>

                    <option value=''>--Selectionnez un status--</option>
                    <option>De-Blacklister</option>
                    <option>Blacklister</option>
                                
                </select>

                <select id="selectName" onChange={()=>Trie()}>
                    
                    <option value=''>--Selectionnez un Nom--</option>
                    {bis&&bis.map(utilisateur => 
                        <option>{utilisateur.Nom}</option>
                    )}
                                
                </select>
                

            </fieldset>

            <div id = "communaute"> 

                {utilisateurs&&utilisateurs.map(utilisateur => (

                    <div  className = "coordonnes">

                        <div className="utilisateur" style={{color:utilisateur.Couleur}} id={utilisateur.Identifiant+"utilisateur"} >{utilisateur.Prenom} {utilisateur.Nom}</div>

                        <button className = "blacklist" id={"blacklist" + utilisateur.Identifiant}  onClick={() => changerCouleur(utilisateur.Identifiant)}>{utilisateur.Status}</button>

                        <div className="mail">{utilisateur.Mail}</div>

                        <div className="tel">{utilisateur.Tel}</div>

                        <div className="ville">{utilisateur.Ville}</div>

                        <div className="age">{utilisateur.DateNaissance}</div>

                        <input type="text" placeholder="Commentaire sur le client" className = "text" id = {"text"+utilisateur.Identifiant} ></input>

                        <button className="envoyer" id = {"envoyer" + utilisateur.Identifiant} onClick={() => ecrire(utilisateur.Identifiant)} > Envoyer</button>

                        <div className ='commentaire' id={utilisateur.Identifiant+"commentaire"}> 

                            {commentaires&&commentaires.filter(commentaire =>  commentaire.IdUtilisateur === utilisateur.Identifiant).map(commentaire_id => (
                                <div id = {commentaire_id.IdUtilisateur} > -  {commentaire_id.Commentaire}<button className='boutton_supprimer' onClick={() => supprimer(commentaire_id.IdCommentaire)}>X</button></div>
                            ))}   
                            
                        </div>

                    </div>
           
                ))}
            </div>

        </div>
            
    )


}

export default Communaute; 