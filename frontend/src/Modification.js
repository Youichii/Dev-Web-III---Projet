import React, { useState } from 'react'
import Dropdown from './components/DropDown'
import Button from './components/Button/Button'
import Axios from 'axios'
import Input from './components/Input/Input'

const Modification = () => {
    require('./modification.css')
    const [Lundi, setLundi] = useState(null)
    const [Mardi, setMardi] = useState(null)
    const [Mercredi, setMercredi] = useState(null)
    const [Jeudi, setJeudi] = useState(null)
    const [Vendredi, setVendredi] = useState(null)
    const [Samedi, setSamedi] = useState(null)
    const [Dimanche, setDimanche] = useState(null)
    const [horairesList, setHorairesList] = useState([]);

    const getHoraires = () => {
        Axios.get(`http://localhost:3001/api/horaires`).then((response)=> {
            setHorairesList(response.data)
        })
    }

    const submitDay = () => {
        Axios.put('http://localhost:3001/api/horaires', {
            Lundi : Lundi,
            Mardi : Mardi,
            Mercredi : Mercredi,
            Jeudi : Jeudi,
            Vendredi : Vendredi,
            Samedi : Samedi,
            Dimanche : Dimanche,
            }).then(() => {
                console.log("hello")
            })
    }

    return (
        <div onLoad={getHoraires}>
            <Dropdown title= "Horaires" 
                content={
                    <ul className="listHoraires">
                            <li>
                                <u>Lundi :</u>  
                                {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Lundi}
                                        </p>
                                    );
                                    })
                                }
                        
                                <form onSubmit={submitDay}>
                                    <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setLundi}/>
                                    <Button/>
                                </form>
                            </li>

                            <li>
                                <u>Mardi :</u> 
                                {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Mardi}
                                        </p>
                                    );
                                    })
                                }
                        
                                <form onSubmit={submitDay}>
                                <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setMardi}/>
                                    <Button/>
                                </form>
                            </li>

                            <li>
                               <u>Mercredi</u>  
                               {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Mercredi}
                                        </p>
                                    );
                                    })
                                }
                
                                <form onSubmit={submitDay}>
                                    <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setMercredi}/>
                                    <Button/>
                                </form>
                            </li>

                            <li>
                                <u>Jeudi :</u> 
                                {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Jeudi}
                                        </p>
                                    );
                                    })
                                }
                        
                                <form onSubmit={submitDay}>
                                    <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setJeudi}/>
                                    <Button/>
                                </form>
                            </li>

                            <li>
                                <u>Vendredi :</u> 
                                {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Vendredi}
                                        </p>
                                    );
                                    })
                                }
                            
                                <form onSubmit={submitDay}>
                                    <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setVendredi}/>
                                    <Button/>
                                </form>
                            </li>

                            <li>
                                <u>Samedi :</u> 
                                {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Samedi}
                                        </p>
                                    );
                                    })
                                }
                
                                <form onSubmit={submitDay}>
                                    <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setSamedi}/>
                                    <Button/>
                                </form>
                            </li>

                            <li>
                                <u>Dimanche & jours féries :</u>  
                                {horairesList.map((val) => {
                                    return (
                                        <p>
                                            {val.Dimanche}
                                        </p>
                                    );
                                    })
                                }
                                
                                <form onSubmit={submitDay}>
                                    <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setDimanche}/>
                                    <Button/>
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