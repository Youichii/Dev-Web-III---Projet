import {useState} from 'react';

let[commentaires, setCommentaires] = useState([
    {id_utilisateur : 1, commentaire : "bon client ponctuel", id_commentaire: "bon client ponctuel1"},
    {id_utilisateur : 1, commentaire : "vient régulièrement", id_commentaire:  "vient régulièrement1"},
    {id_utilisateur : 3, commentaire : "toujours en retard", id_commentaire: "toujours en retar3"},
    {id_utilisateur : 4, commentaire : "arrogant", id_commentaire:"arrogant4"},

])

function ecrire(id){ 

    let comment = document.getElementById("text"+id).value

    if (comment === ""){
        return false
    }
 
    document.getElementById("text"+id).value = ""
    document.getElementById("text"+id).innerHTML = "<placeholder = 'Commentaire sur le client'>"

    let id_comm = comment + id 
   
    commentaires.push({
        id_utilisateur : id,
        commentaire : comment,
        id_commentaire: id_comm, 
    })


    document.getElementById(id+"commentaire").innerHTML= ""
    return(
    commentaires.filter(commentaire =>  commentaire.id_utilisateur === id).map(commentaire_id => (
        
            <div id = {commentaire_id.id_commentaire}>
                {commentaire_id.commentaire}  <button class='boutton_supprimer' onClick={() => supprimer(commentaire_id.id_commentaire )}>x</button> 
            </div>

        ))
    )
   
}

export default ecrire; 