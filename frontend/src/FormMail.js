import {useState} from 'react';
import './FormMail.css'


/**
 * Récupère les valeurs des champs et soumet le formulaire
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 */

 function FormEmail (){

     const [emailer, setEmailer] = useState({
         message:""
     });

    /**
     * Tient compte des changement des valeurs
     * @author Noelle Khazoum <kh.noelle@gmail.com>
     * @param {*} e objet Event qui contient les informations de l'évènement actuel
     */

     function handleChange(e){
         setEmailer((prevState)=>({
             ...prevState,
             [e.target.name]: e.target.value,
         }));
     }

    /**
     * Soumet le formulaire en appuyant sur le bouton "envoyer"
     * @author Noelle Khazoum <kh.noelle@gmail.com> 
     */ 

     const SubmitEmail = async(e) =>{
        e.preventDefault();
        console.log({emailer});
        const response = await fetch ("http://localhost:3000/envoye",{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({emailer}),
        })
        .then((res)=> res.json())
        .then (()=>{
            setEmailer({
                message:"",
                subject:"",
                corps:""
            });
        });
     };


     return(
        <div className="email-container">
        <div className="formulaire-email">

            <form data-testid="mailform" className="champ-formulaire" onSubmit={SubmitEmail}>
                <legend>Creer une newsletter</legend>

               <input
                   placeholder="Sujet du message"
                   onChange={handleChange}
                   name="subject"
                   value={emailer.subject}
                />
               <textarea 
                   placeholder="Promo"
                   onChange = {handleChange}
                   name="message"
                   value={emailer.message}
               />
               <textarea 
                   placeholder="Corps"
                   onChange = {handleChange}
                   name="corps"
                   value={emailer.corps}
               />

                <button className="btn-email">Envoyer email</button>
            </form>

        </div>

    </div>
     );
 }

 export default FormEmail; 