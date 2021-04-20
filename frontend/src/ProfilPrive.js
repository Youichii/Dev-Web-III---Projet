import Header from './components/Header'
import Picture from './components/Picture'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'



const ProfilPrive = () => {
    const [username, setUsername] = useState('')
    const cecile = "Cécile"

    const submitUsername = () => {
        console.log(username)
        Axios.post('http://localhost:3001/api/insert', {
            Username : username,
        }).then(() => {
            console.log("Hello")
        })
    }
    const getCecile = () => {
        Axios.get(`http://localhost:3001/api/get/${cecile}`).then((response)=> {
            console.log(response)
        })
    }
    

    return (
        <div className="profilPrive">
            <Header title= { "Votre profil :" } headerclass="profilheader"  />
            
            <Picture /> 
            <div className="privateinfo">
                    
                <div className="gauche">
                    <label>*Your username*</label><br />
                    <input type="text" name="Username" maxLength="10" placeholder="Changer le pseudo" onChange="" />
                    <button onClick=" ">Modifier</button>
                    <p>{cecile}</p>                    
                    <p>Clos de la Croisette 5 <br /> 1325 Chaumont Gistoux</p>
                    <input type="text" name="Username" maxLength="50" placeholder="Rue" onChange="" /><br/>
                    <input type="text" name="Username" maxLength="10" placeholder="Numéro" onChange="" /><br/>
                    <input type="text" name="Username" maxLength="6" placeholder="Code Postal" onChange="" /><br/>
                    <input type="text" name="Username" maxLength="40" placeholder="Ville" onChange="" /><br/>
                    <button onClick=" ">Modifier</button>
                    <p>0495757504</p>
                    <input type="text" name="Username" maxLength="20" placeholder="Changer le numéro de téléphone" onChange="" />
                    <button onClick=" ">Modifier</button>
                    <p>baurelien@hotmail.com</p>
                    <input type="text" name="Username" maxLength="50" placeholder="Changer l'adresse mail" onChange="" /><br />
                    <input type="text" name="Username" maxLength="10" placeholder="Changer username test" onChange= {(e) => {
                        setUsername(e.target.value)
                    }}/><br />
                    <button onClick={submitUsername}>Username</button>
                    <button onClick={getCecile}>Modifier</button>
                </div>
            </div>            
        </div>
    )
};

export default ProfilPrive