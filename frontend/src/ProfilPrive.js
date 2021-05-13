import Header from './components/Header'
import Picture from './components/Picture'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Button from './components/Button/Button'
import Input from './components/Input/Input'



import Banner from './Banner.js';
import BannerConnect from './components/BannerConnect.js';

const ProfilPrive = () => {
    require('./profilPrive.css')
    Axios.defaults.withCredentials = true;

    const [username, setUsername] = useState('');
    const [clientInfosList, setClientInfosList] = useState([]);
    const [street, setStreet] = useState('');
    const [zipCode, setZip] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('')

    const [loginStatus, setLoginStatus] = useState(false);
	const [usernameCON, setUsernameCON] = useState("");

    useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
				setUsernameCON(response.data.user[0].IdClient);
			}
			else {
				setLoginStatus(false);
			}
		});
	}, []);

    const deconnexion = () => {
		Axios.get(`http://localhost:3001/api/deconnexion`).then((response) => {
			console.log("deconnexion: ", response) ; 
			setLoginStatus(false);
			console.log("deconnecté");
		});
	}

    const submitUsername = () => {
        Axios.put('http://localhost:3001/api/client/username', {
            username : username,
            usernameCON : usernameCON,
        }).then(() => {
            console.log("Hello")
        })
    }
    
    const getClient = () => {
        Axios.get(`http://localhost:3001/api/client/${usernameCON}`).then((response)=> {
            setClientInfosList(response.data)
        })
    }

    const submitAdress = () => {
        Axios.put('http://localhost:3001/api/client/adress', {
            usernameCON : usernameCON,
            street : street,
            number : number,
            zipCode : zipCode,
            city : city,

        }).then(() => {
            console.log("Hello")
        })
    }

    const submitPhone = () => {
        Axios.put('http://localhost:3001/api/client/phone', {
            usernameCON : usernameCON,
            phone : phone
        }).then ((response) => {
            if (response){
                window.alert("Ce numéro de téléphone existe déjà !")
            }
        })
    }

    const submitMail = () => {
        Axios.put('http://localhost:3001/api/client/mail', {
            usernameCON : usernameCON,
            mail : mail
        }).then ((response) => {
            if (response){
                console.log(response)
                window.alert("Cette adresse mail existe déjà !")
            }
        })
    }
    
    if(usernameCON){
        return (
            <div onLoad={getClient}>
                {loginStatus ? <BannerConnect onClick={deconnexion} client={username}/> : <Banner />}
                <div className="profilPrive">
                    <Header title= {"Votre profil" } headerclass="profilheader"  />
                    <Picture />
                    <div className="privateinfo">                    
                        <div className="gauche">
                            {clientInfosList.map((val) =>{
                                return (
                                <label>
                                    <h1>
                                        {val.Pseudo}
                                    </h1>
                                </label>
                                );
                            })}
                            <form onSubmit={submitUsername}> 
                                <Input name="Username" min="5" placeholder="Changer le pseudo" setFunc={setUsername}/>
                                <Button />
                            </form>
                            {clientInfosList.map((val) =>{
                                return (
                                    <p>
                                        {val.Nom} | {val.Prenom}<br />
                                        {(val.Anniversaire).slice(0,10)}
                                    </p>
                                    );  
                            })}                   
                            {clientInfosList.map((val) => {
                                return (
                                    <p>{val.Rue} {val.Numero}, <br />
                                    {val.Zip} {val.Ville}
                                    </p>
                                    );
                            })}
                            <form onSubmit={submitAdress}>
                                <Input name="Street" max="50" placeholder="Rue" setFunc={setStreet}/><br/>
                                <Input type="number" name="Number" min="1" placeholder="Numéro" setFunc={setNumber}/><br/>
                                <Input type="number" name="Zip" maxLength="6" placeholder="Code Postal" setFunc={setZip}/><br/>
                                <Input name="City" max="40" placeholder="Ville" setFunc={setCity}/><br/>
                                <Button />
                            </form>
                            {clientInfosList.map((val) =>{
                                return (
                                    <p>
                                            {val.Gsm}
                                    </p>
                                    );  
                            })} 
                            <form onSubmit={submitPhone}>
                                <Input type="tel" name="Phone" pattern="[0-9]{4,}"  max="14" placeholder="Numéro de téléphone" title="Ne rentrez pas le préfixe du pays, minimum 4 chiffres" setFunc={setPhone}/><br/>
                                <Button/>
                            </form>
                            {clientInfosList.map((val) =>{
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
    else return <div></div>
};

export default ProfilPrive