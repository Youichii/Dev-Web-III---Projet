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
                    <label>Your username</label><br />
                    <input type="text" name="Username" maxLength="10" placeholder="enter your Username" onChange= {(e) => {
                        setUsername(e.target.value)
                    }}/><br />
                    <button onClick={submitUsername}>Submit</button>
                    <button onClick={getCecile}>Cécile</button>
                </div>
                
                <div className="droite">
                    Chaumont-Gistoux
                </div>       
            </div>            
        </div>
    )
};

export default ProfilPrive