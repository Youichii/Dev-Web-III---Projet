import {useState} from "react" ;

const Staff = () => {
    
    const [afaire, setAfaire] = useState([{"id" : "aaaaz", "heure_passee" : "18h06", "nom" : "Jean", "contact" : "0000000000", "adresse" : "Rue kiku ojizjroajzrkjkije", "commande" : ["poulet - 3", "viande - 4"], "prix" : 17, "heure_prevue" : "19h00"},
    {"id" : "aaaaa", "heure_passee" : "06h25", "nom" : "Pierre", "contact" : "1111111111", "adresse" : "alkz", "commande" : ["poet"], "prix" : 96, "heure_prevue" : "07h00"},
    {"id" : "aaaab", "heure_passee" : "07h25", "nom" : "Pirre", "contact" : "11111", "adresse" : "alkfghftz", "commande" : ["ulet"], "prix" : 967, "heure_prevue" : "07h01"},
    {"id" : "aaaac", "heure_passee" : "08h25", "nom" : "Pire", "contact" : "1111111", "adresse" : "al654kz", "commande" : ["pout"], "prix" : 9, "heure_prevue" : "07h02"},
    {"id" : "aaaad", "heure_passee" : "09h25", "nom" : "Pie", "contact" : "11111111", "adresse" : "alkazrrez", "commande" : ["polet"], "prix" : 6, "heure_prevue" : "07h03"},
    {"id" : "aaaae", "heure_passee" : "21h36", "nom" : "Richard", "contact" : "222222222", "adresse" : "zraz", "commande" : ["poulet"], "prix" : 63.5, "heure_prevue" : "22h15"},
    {"id" : "aaaaf", "heure_passee" : "19h45", "nom" : "Vincent", "contact" : "3333333333", "adresse" : "hrehyer", "commande" : ["olet"], "prix" : 452, "heure_prevue" : "20h30"},
    {"id" : "aaaag", "heure_passee" : "19h27", "nom" : "Jeanne", "contact" : "4444444444", "adresse" : "gfbvc", "commande" : ["poule"], "prix" : 75.2, "heure_prevue" : "20h00"},
    {"id" : "aaaah", "heure_passee" : "18h00", "nom" : "Marie", "contact" : "5555555555", "adresse" : "azaez", "commande" : ["pulet"], "prix" : 10, "heure_prevue" : "18h30"},
    {"id" : "aaaai", "heure_passee" : "17h54", "nom" : "Clem", "contact" : "66666666666", "adresse" : "vpcvht", "commande" : ["poulet"], "prix" : 5, "heure_prevue" : "18h15"},
    {"id" : "aaaaj", "heure_passee" : "14h06", "nom" : "Tom", "contact" : "77777777777", "adresse" : "tiutur", "commande" : ["oulet"], "prix" : 13, "heure_prevue" : "15h45"},
    {"id" : "aaaak", "heure_passee" : "03h59", "nom" : "Louise", "contact" : "888888888", "adresse" : "hrturaz", "commande" : ["pou"], "prix" : 23.15, "heure_prevue" : "04h30"}]) ;
    
    const [encours, setEncours] = useState([]);

    const [envoye, setEnvoye] = useState([]);
    
    const envoi_etape1 =(identifiant) => {
        const newAfaire = afaire.filter(element => element.id !== identifiant);
        const newEncours = encours.concat(afaire.filter(element => element.id === identifiant));

        setAfaire(newAfaire) ;
        setEncours(newEncours) ;
    }

    const envoi_etape2 =(identifiant) => {
        const newEncours = encours.filter(element => element.id !== identifiant);
        const newEnvoye = envoye.concat(encours.filter(element => element.id === identifiant));

        setEncours(newEncours) ;
        setEnvoye(newEnvoye) ;
    }

    const envoi_etape3 =(identifiant) => {
        const newEnvoye = envoye.filter(element => element.id !== identifiant);

        setEnvoye(newEnvoye) ;
    }

    return (
        <div className="staff">
            <div>
                <table id="titre_colonne_afaire">
                    <tr>
                        <td width="60px">Heure</td>
                        <td width="90px">Nom</td>
                        <td width="90px">Contact</td>
                        <td width="180px">Adresse</td>
                        <td width="80px">Commande</td>
                        <td width="60px">Prix</td>
                        <td width="140px">Heure <br /> prévue</td>
                    </tr>
                </table>
                <div className="cadre" id="cadre_afaire">
                    {afaire.map( element => (
                        <table>
                            <tr id={element.id}>
                                <td width="72px">{element.heure_passee}</td>
                                <td width="112px">{element.nom}</td>
                                <td width="105px">{element.contact}</td>
                                <td width="220px">{element.adresse}</td>
                                <td width="115px">
                                    <select width="95px">
                                        <option>
                                            {element.id}
                                        </option>
                                        {element.commande.map(nourriture => (
                                            <option>{nourriture}</option>
                                        ))}
                                    </select>
                                </td>
                                <td width="80px">{element.prix}</td>
                                <td width="72px">{element.heure_prevue}</td>
                                <td><button onClick={() => envoi_etape1(element.id)}>suivant</button></td>
                            </tr>
                        </table>
                    ))}
                </div>
            </div>

            <div>
                <table id="titre_colonne_encours">
                    <tr>
                        <td width="60px">Heure</td>
                        <td width="90px">Nom</td>
                        <td width="90px">Contact</td>
                        <td width="180px">Adresse</td>
                        <td width="80px">Commande</td>
                        <td width="60px">Prix</td>
                        <td width="140px">Heure <br /> prévue</td>
                    </tr>
                </table>
                <div className="cadre" id="cadre_encours">
                    {encours.map( element => (
                        <table>
                            <tr id={element.id}>
                                <td width="72px">{element.heure_passee}</td>
                                <td width="112px">{element.nom}</td>
                                <td width="105px">{element.contact}</td>
                                <td width="220px">{element.adresse}</td>
                                <td width="115px">
                                    <select width="95px">
                                        <option>
                                            {element.id}
                                        </option>
                                        {element.commande.map(nourriture => (
                                            <option>{nourriture}</option>
                                        ))}
                                    </select>
                                </td>
                                <td width="80px">{element.prix}</td>
                                <td width="72px">{element.heure_prevue}</td>
                                <td><button onClick={() => envoi_etape2(element.id)}>suivant</button></td>
                            </tr>
                        </table>
                    ))}
                </div>
            </div>

            <div>
                <table id="titre_colonne_envoye">
                    <tr>
                        <td width="60px">Heure</td>
                        <td width="90px">Nom</td>
                        <td width="90px">Contact</td>
                        <td width="180px">Adresse</td>
                        <td width="80px">Commande</td>
                        <td width="60px">Prix</td>
                        <td width="140px">Heure <br /> prévue</td>
                    </tr>
                </table>
                <div className="cadre" id="cadre_envoye">
                    {envoye.map( element => (
                        <table>
                            <tr id={element.id}>
                                <td width="72px">{element.heure_passee}</td>
                                <td width="112px">{element.nom}</td>
                                <td width="105px">{element.contact}</td>
                                <td width="220px">{element.adresse}</td>
                                <td width="115px">
                                    <select width="95px">
                                        <option>
                                            {element.id}
                                        </option>
                                        {element.commande.map(nourriture => (
                                            <option>{nourriture}</option>
                                        ))}
                                    </select>
                                </td>
                                <td width="80px">{element.prix}</td>
                                <td width="72px">{element.heure_prevue}</td>
                                <td><button onClick={() => envoi_etape3(element.id)}>suivant</button></td>
                            </tr>
                        </table>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Staff;