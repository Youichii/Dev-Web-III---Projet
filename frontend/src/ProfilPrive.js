import Header from './components/Header'
import Picture from './components/Picture'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Button from './components/Button/Bouton'
import Input from './components/Input/Input'
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import  { useHistory } from 'react-router-dom';

const ProfilPrive = () => {
    require('./css/profilPrive.css')
    Axios.defaults.withCredentials = true;

    const [pseudo, setPseudo] = useState('');
    const [listeClients, setlisteClients] = useState([]);
    const [rue, setRue] = useState('');
    const [zipCode, setZip] = useState('');
    const [ville, setVille] = useState('');
    const [numero, setNumero] = useState('');
    const [mail, setMail] = useState('');
    const [telephone, setTelephone] = useState('')
    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateur, setUtilisateur] = useState(0);

    const history = useHistory();
	const redirection= function onfinish(data){
		return history.push('/connexion') ;
	}

	/**
	 * Vérifie si l'utilisateur est connecté au chargement de la page
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(async () => {
		Axios.get("/api/connexion").then((reponse) => {
			if (reponse.data.loggedIn === true) {
                setStatutConnexion(true);
			    setUtilisateur(reponse.data.user[0].IdClient);
                
                
			}
			else {redirection()}
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

    const submitUsername = () => {
        Axios.put('/api/client/pseudo', {
            pseudo : pseudo,
            utilisateur : utilisateur,
        }).then(() => {
        })
    }
    
    const getClient = () => {        
        Axios.get(`http://localhost:3001/api/client/${utilisateur}`).then((response)=> {
            setlisteClients(response.data)

        })
    }

    const submitAdress = () => {
        Axios.put('http://localhost:3001/api/client/adress', {
            utilisateur : utilisateur,
            rue : rue,
            numero : numero,
            zipCode : zipCode,
            ville : ville,

        }).then(() => {
        })
    }

    const submitPhone = () => {
        Axios.put('http://localhost:3001/api/client/telephone', {
            utilisateur : utilisateur,
            telephone : telephone
        }).then ((response) => {
            if (response){
                window.alert("Ce numéro de téléphone existe déjà !")
            }
        })
    }

    const submitMail = () => {
        Axios.put('http://localhost:3001/api/client/mail', {
            utilisateur : utilisateur,
            mail : mail
        }).then ((response) => {
            if (response){
                console.log(response)
                window.alert("Cette adresse mail existe déjà !")
            }
        })
    }
    
    return (
            <div style={{margin: "0px 0px 1295px 0px"}}>  
                {statutConnexion ? <BanniereConnection page="profilprive" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
                <div onLoad={getClient} className="profilPrive">                    
                    <Header title= {"Votre profil" } headerclass="profilheader"  />
                    <Picture />
                    <div className="privateinfo">                    
                        <div className="gauche">
                            {listeClients.map((val) =>{
                                return (
                                <label>
                                    <h1>
                                        {val.Pseudo}
                                    </h1>
                                </label>
                                );
                            })}
                            <form onSubmit={submitUsername}> 
                                <Input name="Username" min="5" placeholder="Changer le pseudo" setFunc={setPseudo}/>
                                <Button />
                            </form>
                            {listeClients.map((val) =>{
                                return (
                                    <p>
                                        {val.Nom} | {val.Prenom}<br />
                                        {(val.Anniversaire).slice(0,10)}
                                    </p>
                                    );  
                            })}                   
                            {listeClients.map((val) => {
                                return (
                                    <p>{val.Rue} {val.Numero}, <br />
                                    {val.Zip} {val.Ville}
                                    </p>
                                    );
                            })}
                            <form onSubmit={submitAdress}>
                                <Input name="Street" max="50" placeholder="Rue" setFunc={setRue}/><br/>
                                <Input type="number" name="Number" min="1" placeholder="Numéro" setFunc={setNumero}/><br/>
                                <Input type="number" name="Zip" maxLength="6" placeholder="Code Postal" setFunc={setZip}/><br/>
                                <Input name="City" max="40" placeholder="Ville" setFunc={setVille}/><br/>
                                <Button />
                            </form>
                            {listeClients.map((val) =>{
                                return (
                                    <p>
                                            {val.Gsm}
                                    </p>
                                    );  
                            })} 
                            <form onSubmit={submitPhone}>
                                <Input type="tel" name="Phone" pattern="[0-9]{4,}"  max="14" placeholder="Numéro de téléphone" title="Ne rentrez pas le préfixe du pays, minimum 4 chiffres" setFunc={setTelephone}/><br/>
                                <Button/>
                            </form>
                            {listeClients.map((val) =>{
                                return (
                                    <p>
                                            {val.Mail}
                                    </p>
                                    );  
                            })}
                            <form onSubmit={submitMail}>
                                <Input type="mail" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" name="Mail" max="50" placeholder="Changer l'adresse mail" setFunc={setMail}/><br/>
                                <Button />
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
        )
    }

export default ProfilPrive