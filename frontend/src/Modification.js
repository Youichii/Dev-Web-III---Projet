import React, { useState, useEffect } from 'react'
import Dropdown from './components/DropDown'
import Button from './components/Button/Bouton'
import Axios from 'axios'
import Input from './components/Input/Input'
import BanniereBasique from './BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';

const Modification = () => {
    require('./css/modification.css');
    Axios.defaults.withCredentials = true;

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

    const [titres, setTitres] = useState([]);
    const [contenu, setContenu]= useState([]);

    const [categorie, setCategorie] = useState("blank");
    const [prix, setPrix] = useState("");
    const [description, setDescription] = useState("");
    const [produit, setProduit] = useState("");

    //const [mapRest, setMapRest] = useState(''); 

    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateur, setUtilisateur] = useState(10000000000);


	/**
	 * Vérifie si l'utilisateur est connecté au chargement de la page
	 * 
	 * @author Clémentine Sacré <c.sacre@students.ephec.be>
	 */
	useEffect(()=> {
		Axios.get("/api/connexion").then((reponse) => {
			if (reponse.data.loggedIn === true) {
				setStatutConnexion(true);
				setUtilisateur(reponse.data.user[0].IdClient);
			}
			else {setStatutConnexion(false);}
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

    /**
     * Reçoit toutes les heures d'ouverture du restaurant
     * 
     * @author Aurélien Brille
     */

    const getHoraires = () => {
        Axios.get(`/api/coord/horaires`).then((response)=> {
            setHorairesList(response.data)
        })
    }

    /**
     * Reçoit toutes les catégories du menu
     * 
     * @author Cécile Bonnet
     */

    const getCategorie =() => {
        Axios.get('/api/categories').then((response) =>{
            setTitres(response.data)
        })
    }

    /**
     * Reçoit toutes les produits du menu
     * 
     * @author Cécile Bonnet
     */

    const getMenu =() => {
        Axios.get('/api/menu').then((response) =>{
            setContenu(response.data)
        })
    }

    /**
     * Supprime un produit de la carte
     * 
     * @author Aurélien Brille
     */

    const DelProduit = (id) => {
        Axios.delete(`/api/menu`, {
            id : id
        }).then((response) => {
            
        })
    }

    /**
     * Reçoit toutes les coordonnées du restaurant (adresse, mail,..)
     * 
     * @author Aurélien Brille
     */

    const getCoordonnees = () => {
        getHoraires();
        getCategorie();
        getMenu();
        Axios.get('/api/coordonnees').then((response) => {
           setCoordonneesList(response.data)
       })
    } 

    const submitMailRest = () => {
        Axios.put('/api/coord/mail', {
            mailRest : mailRest
        }).then ((response) => {
            if (response){
                window.alert("Cette adresse mail existe déjà !")
            }
        })
    }

    const submitTelRest = () => {
        Axios.put('/api/coord/tel', {
            telRest : telRest
        }).then ((response) => {
            if (response){
                window.alert("Ce numéro de téléphone existe déjà !")
            }
        })
    }

    const submitMenu = () => {
        if(categorie !== ""){
            Axios.post('/api/menu', {
                categorie : categorie,
                produit : produit,
                prix : prix,
                description : description,
            }).then((response) => {
                if (response) {
                    window.alert("Veuillez spécifier la catégorie du produit")
                }

            })
        }
        else window.alert("Veuillez spécifier la catégorie du produit")
    }

    /*const submitMapRest = () => {
        Axios.put('/api/coord/map', {
            mapRest : mapRest
        }).then((response) => {
            console.log("ok")
        })
    }*/

    const submitAdressRest = () => {
        Axios.put('/api/coord/address', {
            streetRest : streetRest,
            numberRest : numberRest,
            zipCodeRest : zipCodeRest,
            cityRest : cityRest,

        }).then(() => {
            console.log("Hello")
        })
    }

    const submitDay = () => {
        Axios.put('/api/coord/horaires', {
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
            {statutConnexion ? <BanniereConnection onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
            
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
                    </form><br /><br />
                    
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
            <Dropdown title="Menu" className="dd-wraper-3" content={
                <div id = 'bordPrincipal'>
                {titres&&titres.map(titre => (
                    <fieldset className="cadre">
                        <details>
                            <summary className="titre" key = {titre.NomCategorie}> {titre.NomCategorie} </summary>
                            {contenu && contenu.filter(contenus => contenus.IdCategorie === titre.NomCategorie.slice(0,3)).map(contenu_filtre => (
                                <div> 
                                    <div className="haut">
                                        <span className="contenu">{contenu_filtre.Produit}</span>
                                        <span className="price">{contenu_filtre.Prix.toFixed(2) + "€" }</span>
                                    </div>
                                    <div className="bas">  
                                        <span className="description">{contenu_filtre.Description}</span>
                                        <form>
                                            <button onClick={DelProduit()}>X</button>
                                        </form>  
                                    </div>
                    
                                    
                                </div>
                            ))}
                            <form onSubmit={submitMenu}>
                                <select onChange={(e) => {
                                    setCategorie(e.target.value)}} name="categorie">
                                    <option value="blank"></option>
                                    <option value={titre.IdCategorie}>{titre.NomCategorie}</option>
                                </select>
                                <Input placeholder="Produit" setFunc={setProduit}/>
                                <Input type="number" min="0.00" max="999.99" step="0.01" placeholder="Prix" setFunc={setPrix}/>
                                <Input min="0" placeholder="Description" setFunc={setDescription}/>
                                <Button text="+"/>
                            </form>

                        </details>
                        
                    </fieldset>
                    
                ))}   
            </div>
            }/>
        </div>
    )    
}

export default Modification