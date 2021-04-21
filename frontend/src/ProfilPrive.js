import Header from './components/Header'
import Picture from './components/Picture'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'



const ProfilPrive = () => {
    const [username, setUsername] = useState('');
    const clientName = "3";
    const [clientInfosList, setClientInfosList] = useState([]);

    const submitUsername = () => {
        console.log(username)
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
    

    return (
        <div onLoad={getClient} className="profilPrive">
            <Header title= {"Your profile" } headerclass="profilheader"  />
            
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
                    <input type="text" name="Username" maxLength="10" placeholder="Changer le pseudo" onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    <button onClick={submitUsername}>Modifier</button>
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
                    <input type="text" name="Street" maxLength="50" placeholder="Rue"  /><br/>
                    <input type="text" name="Number" maxLength="10" placeholder="Numéro"  /><br/>
                    <input type="text" name="Zip" maxLength="6" placeholder="Code Postal" /><br/>
                    <input type="text" name="City" maxLength="40" placeholder="Ville"  /><br/>
                    <button >Modifier</button>
                    <p>0495757504</p>
                    <input type="text" name="Phone" maxLength="20" placeholder="Changer le numéro de téléphone" />
                    <button >Modifier</button>
                    <p>baurelien@hotmail.com</p>
                    <input type="text" name="Mail" maxLength="50" placeholder="Changer l'adresse mail" /><br />
                    <input type="text" name="Test" maxLength="10" placeholder="Changer username test" onChange= {(e) => {
                        setUsername(e.target.value)
                    }}/><br />
                    <button onClick={submitUsername}>Username</button>
                    
                </div>
            </div>            
        </div>
    )
};

export default ProfilPrive