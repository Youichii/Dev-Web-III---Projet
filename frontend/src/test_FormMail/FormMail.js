import {useState} from 'react';
import '../FormMail.css'

function FormEmail (){

    const [emailer, setEmailer] = useState({
        message:""
    });

    //tient compte des changement du champ

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
                message:""
            });
        });
    };


    return(
        <div className="email-container">
            <div className="formulaire-email">

                <form data-testid="mailform" className="champ-formulaire" onSubmit={SubmitEmail}>
                    <legend>Creer une newsletter</legend>
                    <textarea 
                        placeholder="Message"
                        onChange = {handleChange}
                        name="message"
                        value={emailer.message}
                    />
                    <button className="btn-email">Envoyer email</button>
                </form>

            </div>
 

        </div>
    );
}

export default FormEmail;