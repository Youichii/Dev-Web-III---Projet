import {useState} from 'react';
import CadreTri from "./CadreTri.js";
import FunctionEcrire from "./FunctionEcrire.js"

const Communaute = () => {
    

    let[commentaires, setCommentaires] = useState([
        {id_utilisateur : 1, commentaire : "bon client ponctuel", id_commentaire: "bon client ponctuel1"},
        {id_utilisateur : 1, commentaire : "vient régulièrement", id_commentaire:  "vient régulièrement1"},
        {id_utilisateur : 3, commentaire : "toujours en retard", id_commentaire: "toujours en retar3"},
        {id_utilisateur : 4, commentaire : "arrogant", id_commentaire:"arrogant4"},

    ])

    let [utilisateurs, setUtilisateurs] = useState([
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 1, etat: "Blacklister", color:"white" },
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 2, etat:"Dé-Blacklister", color:"red"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 3, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 4, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 5, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 6, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 7, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 8, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 9, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 10, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 11, etat:"Blacklister", color:"white"},
        {Prénom : "Emilie", Nom : "Bonnet", Mail: "e@gmail.com", Tel: "04.70.11.71.99", id: 12, etat:"Dé-Blacklister", color:"red"}
    ]);

    document.getElementsByClassName("blacklist").innerHTML = "Blacklister";
   

    function changerCouleur(id){
        let value = id 
        let boutonValeur = document.getElementById("blacklist"+id).innerHTML 
     
        if (boutonValeur === "Blacklister"){
            document.getElementById("blacklist"+id).innerHTML = "Dé-Blacklister"
            document.getElementById(id+"utilisateur").style.color = "red"  
            utilisateurs.filter(filtre => filtre.id === value).map(changement_etat => 
                changement_etat.etat = "Dé-Blacklister"
               
            )
            utilisateurs.filter(filtre => filtre.id === value).map(changement_etat => 
                changement_etat.color = "red"
            )
            

        }
        else {
            document.getElementById("blacklist"+id).innerHTML = "Blacklister"   
            document.getElementById(id+"utilisateur").style.color = "white" 
            utilisateurs.filter(filtre => filtre.id === value).map(changement_etat => 
                changement_etat.etat = "Blacklister" 
            )
            utilisateurs.filter(filtre => filtre.id === value).map(changement_etat => 
                changement_etat.color = "white"
            )
        
    
        }

        console.log(utilisateurs)
    }

    

    function supprimer(id) {
        let inter = []
        commentaires.filter(comm => id !== comm.id_commentaire).map(comm_sup => (
         
            inter.push(comm_sup)
            
        ))
       
        commentaires = inter
        console.log(commentaires)
        
    }
    
    return(
        <div>
            {CadreTri}
        
            <div id = "communaute"> 
            
                {utilisateurs.map(utilisateur => (

                    <div  className = "coordonnes">

                        <div className="utilisateur" style={{color:utilisateur.color}} id={utilisateur.id+"utilisateur"} >{utilisateur.Prénom} {utilisateur.Nom}</div>

                        <button className = "blacklist" id={"blacklist" + utilisateur.id}  onClick={() => changerCouleur(utilisateur.id)}>{utilisateur.etat}</button>

                        <div className="mail">{utilisateur.Mail}</div>

                        <div className="tel">{utilisateur.Tel}</div>

                        <input type="text" placeholder="Commentaire sur le client" className = "text" id = {"text"+utilisateur.id} ></input>

                        <button className="envoyer" id = {"envoyer" + utilisateur.id} onClick={() => ecrire(utilisateur.id)} > Envoyer</button>

                        <div className ='commentaire' id={utilisateur.id+"commentaire"}> <FunctionEcrire id={utilisateur.id} /> 

                            {commentaires.filter(commentaire =>  commentaire.id_utilisateur === utilisateur.id).map(commentaire_id => (
                                <div id = {commentaire_id.id_commentaire} >- {commentaire_id.commentaire}   <button onClick={()=>supprimer(commentaire_id.id_commentaire)} className='boutton_supprimer'> x </button>   </div>
                            ))}   
                            
                        </div>
                    </div>
           ))}
        
            </div>
            </div>
    )


}
export default Communaute; 