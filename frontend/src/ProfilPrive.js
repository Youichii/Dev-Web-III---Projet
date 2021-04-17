import Header from './components/Header'
import Picture from './components/Picture'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'


const ProfilPrive = () => {
    const [username, setUsername] = useState('')

    const submitUsername = () => {
        Axios.post('http://localhost:3001/api/insert', {
            Username : username,
        }).then(() => {
            console.log("Hello")
        })
    }

    return (
        <div className="profilPrive">
            <Header title= { "Votre profil :" } headerclass="profilheader"  />
            
            <Picture /> 
            <div className="privateinfo">
                    
                <div className="gauche">
                    <label>Your username</label><br />
                    <input type="text" name="Username" placeholder="enter your Username" onChange= {(e) => {
                        setUsername(e.target.value)
                    }}/><br />
                    <button onClick={submitUsername}>Submit</button>
                </div>
                
                <div className="droite">
                    Chaumont-Gistoux
                </div>       
            </div>            
        </div>
    )
};

export default ProfilPrive