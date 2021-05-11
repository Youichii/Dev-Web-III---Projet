import {useEffect, useState} from 'react';
import BoutonCommunautee from './components/BoutonCommunautee'; 
const Communaute = () => {
    require("./communaute.css")
    let [utilisateurs, setUtilisateurs] = useState(null)
    let[commentaires, setCommentaires] = useState(null)
    let [nom, setNom] = useState(null)
    let [ville, setVille] = useState(null)

   
  
    

    useEffect(()=>{
        
        // GET qui va chercher tous les profil de la communauté
        var remplirCommunaute = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/users', remplirCommunaute)
        .then(response =>{
            console.log("coucou : ", response)
            return response.json()

        })
        .then(json =>{
            console.log(json)
            setUtilisateurs(json)
        })

        // GET qui récupère une version sans doublons des villes 
        var remplirVille = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/filterVille', remplirVille)
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
        fetch('http://localhost:3001/filterNom', remplirNom)
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
        fetch('http://localhost:3001/comment', remplirCommentaire)
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
            body: JSON.stringify({ Status: 1 , IdClient:id})
            
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
            body: JSON.stringify({ Status: 0, IdClient:id})
            }
            fetch('http://localhost:3001/status', retournerStatus)
            .then(res => {
                return res.json();
            })       
        }
    }

    //Fonctionnelle 
    function supprimer(commentaire, id) {

       
        // DELETE le commentaire de la table 
        var supprimerCommentaire = { method : 'DELETE',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({  IdClient: id, 
                                Commentaire:commentaire
        })
        }
        fetch('http://localhost:3001/comment', supprimerCommentaire)
            .then(response => {
                return response.json();
            }) 

        // Recharge les commentaires de la page 
        var remplirCommentaire = {method : 'GET',
        headers:{'Content-type':'application/json'}
        }
        fetch('http://localhost:3001/comment', remplirCommentaire)
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
        console.log(comment)
        
        // Empêcher l'envoie d'un commentaire vide
        if (comment === ""){
            return false
        }

        // POST qui ajoute le commentaire dans la base de donnée
        var retournerCommentaire = { method:'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({  IdClient  :id,
                                Commentaire : comment
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
        fetch('http://localhost:3001/comment', remplirCommentaire)
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
    
        else if(valueVille !== '' && valueStatus === '' && valueNom === ''){

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

            if(valueStatus === "Blacklisté"){
                valueStatus=1
            }
            else{
                valueStatus=0
            }

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

        else if(valueVille !== '' && valueStatus !== '' && valueNom === ''){

            if(valueStatus === "Blacklisté"){
                valueStatus=1
            }
            else{
                valueStatus=0
            }

            var remplirCommunauteVilleStatus = {method : 'GET',    
            headers:{'Content-type':'application/json'}
            }
            fetch(`http://localhost:3001/userVilleStatus/${valueVille}/${valueStatus}`, remplirCommunauteVilleStatus)
            .then(response=>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }

        else if(valueVille === '' && valueStatus !== '' && valueNom !== ''){

            if(valueStatus === "Blacklisté"){
                valueStatus=1
            }
            else{
                valueStatus=0
            }

            var remplirCommunauteStatusNom = {method : 'GET',    
            headers:{'Content-type':'application/json'}
            }
            fetch(`http://localhost:3001/userStatusNom/${valueStatus}/${valueNom}`, remplirCommunauteStatusNom)
            .then(response=>{
                return response.json()
            })
            .then(json =>{
                setUtilisateurs(json)
            })
        }

        else if(valueVille !== '' && valueStatus === '' && valueNom !== ''){
            var remplirCommunauteVilleNom = {method : 'GET',    
            headers:{'Content-type':'application/json'}
            }
            fetch(`http://localhost:3001/userVilleNom/${valueVille}/${valueNom}`, remplirCommunauteVilleNom)
            .then(response=>{
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

                        <div className="utilisateur" id={utilisateur.IdClient+"utilisateur"} style={(utilisateur.Status === 1)?{color:"red"}:{color:"white"}}  >{utilisateur.Prenom} {utilisateur.Nom}</div>
                    
                        <BoutonCommunautee className='status' id ={"blacklist" + utilisateur.IdClient} onClick={() => changerCouleur(utilisateur.IdClient)} value={(utilisateur.Status === 0)?('Blacklister'):('Dé-Blacklister')}/>
                        
                        <div className="mail">{utilisateur.Mail}</div>

                        <div className="tel">{utilisateur.Gsm}</div>

                        <div className="ville">{utilisateur.Ville}</div>

                        <div className="age">{utilisateur.Anniversaire}</div>

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