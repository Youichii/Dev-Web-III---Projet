import {useState} from 'react';
import MailingList from './components/MailingList';
import './FormMail.css'

 function FormEmail (){

     const [emailer, setEmailer] = useState({
         message:"",
         subject:"",
         corps:""
     });

     //tient compte des changement des champs
    

     function handleChange(e){
         setEmailer((prevState)=>({
             ...prevState,
             [e.target.name]: e.target.value,
         }));
     }

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

                    <textarea
                        data-testid="sujet-msg"
                        placeholder="Sujet du message"
                        onChange={handleChange}
                        name="subject"
                        value={emailer.subject}
                     />
                    <textarea 
                        data-testid="promo-msg"
                        placeholder="Promo"
                        onChange = {handleChange}
                        name="message"
                        value={emailer.message}
                    />
                    <textarea 
                        data-testid="corps-msg"
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