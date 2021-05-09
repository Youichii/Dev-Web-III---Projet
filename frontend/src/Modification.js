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
    const [coordonneesList, setCoordonneesList] = useState([]);
    const [mailRest, setMailRest] = useState("");
    const [telRest, setTelRest] = useState("");
    const [streetRest, setStreetRest] = useState('');
    const [zipCodeRest, setZipRest] = useState('');
    const [cityRest, setCityRest] = useState('');
    const [numberRest, setNumberRest] = useState('');
    //const [mapRest, setMapRest] = useState(''); 

    const getHoraires = () => {
        Axios.get(`http://localhost:3001/api/coord/horaires`).then((response)=> {
            setHorairesList(response.data)
        })
    }

    const getCoordonnees = () => {
        getHoraires();
        Axios.get('http://localhost:3001/api/coordonnees').then((response) => {
           setCoordonneesList(response.data)
       })
    } 

    const submitMailRest = () => {
        Axios.put('http://localhost:3001/api/coord/mail', {
            mailRest : mailRest
        }).then ((response) => {
            if (response){
                window.alert("Cette adresse mail existe déjà !")
            }
        })
    }

    const submitTelRest = () => {
        Axios.put('http://localhost:3001/api/coord/tel', {
            telRest : telRest
        }).then ((response) => {
            if (response){
                window.alert("Ce numéro de téléphone existe déjà !")
            }
        })
    }

    /*const submitMapRest = () => {
        Axios.put('http://localhost:3001/api/coord/map', {
            mapRest : mapRest
        }).then((response) => {
            console.log("ok")
        })
    }*/

    const submitAdressRest = () => {
        Axios.put('http://localhost:3001/api/coord/address', {
            streetRest : streetRest,
            numberRest : numberRest,
            zipCodeRest : zipCodeRest,
            cityRest : cityRest,

        }).then(() => {
            console.log("Hello")
        })
    }

    const submitDay = () => {
        Axios.put('http://localhost:3001/api/coord/horaires', {
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
        <div onLoad={getCoordonnees}>
            <Dropdown title= "Horaires" className="dd-wraper"
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
                                        <Button />
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
                                        <Button />
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
                                        <Button />
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
                                        <Button />   
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
                                        <Button />  
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
                                        <Button />   
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
                                    
                                    <form>
                                        <Input name="lundi" max="50" min="1" type="texte" placeholder="Nouvelles heures" setFunc={setDimanche}/>
                                        <Button/>
                                    </form>    
                                    
                                </li>
                    </ul>
                }
            />
            <Dropdown title="Coordonnées" className="dd-wraper-2" content={
                <div className ="divCoord">
                    <form onSubmit={submitMailRest}>
                        {coordonneesList.map((val) => {return <p>{val.Mail}</p>})}
                        <Input type="mail" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" name="Mail" max="50" placeholder="Changer l'adresse mail" setFunc={setMailRest}/>
                        <Button />
                    </form>
                    
                    <form onSubmit={submitTelRest}>
                        {coordonneesList.map((val) => {return <p>{val.Gsm}</p>})}
                        <Input type="tel" name="Phone" pattern="[0-9]{4,}"  max="14" placeholder="Numéro de téléphone" title="Ne rentrez pas le préfixe du pays, minimum 4 chiffres" setFunc={setTelRest}/>
                        <Button />
                    </form>
                    
                    <form onSubmit={submitAdressRest}>
                        {coordonneesList.map((val) => {return <p>{val.Rue}</p>})}
                        <Input name="Street" max="50" placeholder="Rue" setFunc={setStreetRest}/><br/>
                        {coordonneesList.map((val) => {return <p>{val.Numero}</p>})}
                        <Input type="number" name="Number" min="1" placeholder="Numéro" setFunc={setNumberRest}/><br/>
                        {coordonneesList.map((val) => {return <p>{val.Zip}</p>})}
                        <Input type="number" name="Zip" maxLength="6" placeholder="Code Postal" setFunc={setZipRest}/><br/>
                        {coordonneesList.map((val) => {return <p>{val.Ville}</p>})}
                        <Input name="City" max="40" placeholder="Ville" setFunc={setCityRest}/><br/>
                        <Button />
                    </form>
                </div>
                    

            } />
        </div>
    )    
}

export default Modification