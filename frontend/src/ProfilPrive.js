import Header from './components/Header'
import Picture from './components/Picture'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'



const ProfilPrive = () => {
    require('./profilPrive.css')
    const [username, setUsername] = useState('');
    const clientName = "3";
    const [clientInfosList, setClientInfosList] = useState([]);
    const [street, setStreet] = useState('');
    const [zipCode, setZip] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('')

    const submitUsername = () => {
        Axios.put('http://localhost:3001/api/put', {
            username : username,
            clientName : clientName,
        }).then(() => {
            console.log("Hello")
        })
    }
    
    const getClient = () => {
        Axios.get(`http://localhost:3001/api/get/${clientName}`).then((response)=> {
            setClientInfosList(response.data)
        })
    }

    const submitAdress = () => {
        Axios.put('http://localhost:3001/api/adress', {
            clientName : clientName,
            street : street,
            number : number,
            zipCode : zipCode,
            city : city,

        }).then(() => {
            console.log("Hello")
        })
    }

    const submitPhone = () => {
        Axios.put('http://localhost:3001/api/phone', {
            clientName : clientName,
            phone : phone
        }).then ((response) => {
            if (response){
                window.alert("Ce numéro de téléphone existe déjà !")
            }
        })
    }

    const submitMail = () => {
        Axios.put('http://localhost:3001/api/mail', {
            clientName : clientName,
            mail : mail
        }).then ((response) => {
            if (response){
                window.alert("Cette adresse mail existe déjà !")
            }
        })
    }
    

    return (
        <div onLoad={getClient} className="profilPrive">
            <Header title= {"Votre profil" } headerclass="profilheader"  />
            <Picture />
            <div className="privateinfo">                    
                <div className="gauche">
                    {clientInfosList.map((val) =>{
                        return (
                        <label>
                            <h1>
                                {val.Username}
                            </h1>
                        </label>
                        );
                    })}
                    <form> 
                        <input type="text" name="Username" required minLength="5" maxLength="10" placeholder="Changer le pseudo" onChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                        <button onClick={submitUsername}>Modifier</button>
                    </form>
                    {clientInfosList.map((val) =>{
                        return (
                            <p>
                                    {val.LastName} | {val.FirstName}
                                <br />
                                14 janvier 1997
                            </p>
                            );  
                    })}                   
                    {clientInfosList.map((val) => {
                        return (
                            <p>{val.Street} {val.Number}<br />
                             {val.Zip} {val.City}
                             </p>
                             );
                    })}
                    <form>
                        <input  type="text" name="Street" maxLength="50" placeholder="Rue" required minLength="1" onChange={(e) => {
                            setStreet(e.target.value)
                         }}/><br/>
                        <input type="text" name="Number" maxLength="10" placeholder="Numéro" required minLength="1" onChange={(e) => {
                            setNumber(e.target.value)
                         }}/><br/>
                        <input type="text" name="Zip" maxLength="6" placeholder="Code Postal" required minLength="1" onChange={(e) => {
                            setZip(e.target.value)
                         }}/><br/>
                        <input type="text" name="City" maxLength="40" placeholder="Ville" required minLength="1"  onChange={(e) => {
                            setCity(e.target.value)
                         }}/><br/>
                        <button onClick={submitAdress}>Modifier</button>
                    </form>
                    {clientInfosList.map((val) =>{
                        return (
                            <p>
                                    {val.Phone}
                            </p>
                            );  
                    })} 
                    <form>
                        <input type="text" name="Phone" maxLength="20" placeholder="Changer le numéro de téléphone" onChange={(e) => {
                            setPhone(e.target.value)
                         }}/><br/>
                        <button onClick={ submitPhone }>Modifier</button>
                    </form>
                    {clientInfosList.map((val) =>{
                        return (
                            <p>
                                    {val.Mail}
                            </p>
                            );  
                    })}
                    
                        <input type="text" name="Mail" maxLength="50" placeholder="Changer l'adresse mail" onChange={(e) => {
                                setMail(e.target.value)
                            }}/><br/>
                        <button onClick= { submitMail }>Modifier</button>
                    
                </div>
            </div>            
        </div>
    )
};

export default ProfilPrive