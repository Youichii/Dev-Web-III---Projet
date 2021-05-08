import React, { useState } from 'react'
import Dropdown from './components/DropDown'
import Button from './components/Button/Button'

const Modification = () => {
    require('./modification.css')
    const [lundi, setLundi] = useState("")
    return (
        <div>
            <Dropdown title= "Horaires" 
                content={
                    <ul className="listHoraires">
                            <li>
                                Lundi : 
                                        
                                        <form onSubmit={setLundi}>
                                            <input type="texte" placeholder="heures"/>
                                            <Button onClick={setLundi}>Modifier</Button>
                                        </form>
                            </li>
                            <li>
                                Mardi : 
                                        
                                        <form onSubmit={setLundi}>
                                            <input type="texte" placeholder="heures"/>
                                            <Button onClick={setLundi}>Modifier</Button>
                                        </form>
                            </li>
                            <li>
                                Mercredi :  
                                
                                            <form onSubmit={setLundi}>
                                                <input type="texte" placeholder="heures"/>
                                                <Button onClick={setLundi}>Modifier</Button>
                                            </form>
                            </li>
                            <li>
                                Jeudi : 
                                        
                                        <form onSubmit={setLundi}>
                                            <input type="texte" placeholder="heures"/>
                                            <Button onClick={setLundi}>Modifier</Button>
                                        </form>
                            </li>
                            <li>
                                Vendredi : 
                                            
                                            <form onSubmit={setLundi}>
                                                <input type="texte" placeholder="heures"/>
                                                <Button onClick={setLundi}>Modifier</Button>
                                            </form>
                            </li>
                            <li>
                                Samedi :    
                                
                                            <form onSubmit={setLundi}>
                                                <input type="texte" placeholder="heures"/>
                                                <Button onClick={setLundi}>Modifier</Button>
                                            </form>
                            </li>
                            <li>
                                Dimanche :  
                                
                                            <form onSubmit={setLundi}>
                                                <input type="texte" placeholder="heures"/>
                                                <Button onClick={setLundi}>Modifier</Button>
                                            </form>
                            </li>
                    </ul>
                }
            />
            <Dropdown title="Coordonnées" />
        </div>
    )    
}

export default Modification