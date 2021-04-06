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

    const [informations_commande, setInformationsCommande] = useState("");
    
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

    const afficher_commande = (commande) => {
        let liste_aliments ;
        let liste_finale = "<div class='info_commande'><div>Détails de la commande " + commande + "</div><br>" ;
        
        if (commande in afaire) {
            liste_aliments = afaire[commande]["commande"];
        }
        else if (commande in encours) {
            liste_aliments = encours[commande]["commande"];
        }
        else if (commande in envoye) {
            liste_aliments = envoye[commande]["commande"];
        }
        
        for (i=0 ; i<liste_aliments.length ; i++){
            liste_finale += "<div>- " + liste_aliments[i] + "</div>";
        }
        liste_finale += "</div>" ;
        
        setInformationsCommande(liste_finale) ; 
        //document.getElementById('id_details_commande').innerHTML = liste_finale;
    }

    return (
        <div className="staff">

            <div className="c_cadre_commandes">
                <div className="c_titres_commandes i_titres_commandes">
                    <div class="i_heures">Heure</div>
					<div class="i_noms">Nom</div>
					<div class="i_contacts">Contact</div>
					<div class="i_adresses">Adresse</div>
					<div class="i_prix_titre">Prix</div>
					<div class="i_heures_prevues">Heure <br /> prévue</div>
                </div>
                <div className="i_commandes_afaire c_commandes" id="cadre_afaire">
                    {afaire.map( element => (

                        <div className="i_commande c_commande" onClick={afficher_commande(element.id)}>
                            <tr id={element.id}> 
                                <div width='72px' className="i_heure">{element.heure_passee}</div>
                                <div width='112px' className="i_nom">{element.nom}</div> 
                                <div width='105px' className="i_contact">{element.contact}</div> 
                                <div width='220px' className="i_adresse">{element.adresse}</div>
                                <div width='80px' className="i_prix_commande">{element.prix}</div> 
                                <div width='72px' className="i_heure_prevue">{element.heure_prevue}</div>
                                <div>
                                    <button class="i_bouton_suivant" onClick={() => envoi_etape1(element.id)}>suivant</button>
                                </div> 
                            </tr>
                        </div>
                    ))}
                </div>
                <div id="id_details_commande" class="details_commande">{informations_commande}</div>
            </div>

            <div className="c_cadre_commandes">
                <div className="c_titres_commandes i_titres_commandes">
                    <div class="i_heures">Heure</div>
					<div class="i_noms">Nom</div>
					<div class="i_contacts">Contact</div>
					<div class="i_adresses">Adresse</div>
					<div class="i_prix_titre">Prix</div>
					<div class="i_heures_prevues">Heure <br /> prévue</div>
                </div>
                <div className="i_commandes_encours c_commandes" id="cadre_encours">
                    {encours.map( element => (

                        <div className="i_commande c_commande">
                            <tr id={element.id}> 
                                <div width='72px' className="i_heure">{element.heure_passee}</div>
                                <div width='112px' className="i_nom">{element.nom}</div> 
                                <div width='105px' className="i_contact">{element.contact}</div> 
                                <div width='220px' className="i_adresse">{element.adresse}</div>
                                <div width='80px' className="i_prix_commande">{element.prix}</div> 
                                <div width='72px' className="i_heure_prevue">{element.heure_prevue}</div>
                                <div>
                                    <button class="i_bouton_suivant" onClick={() => envoi_etape2(element.id)}>suivant</button>
                                </div> 
                            </tr>
                        </div>
                    ))}
                </div>
            </div>

            <div className="c_cadre_commandes">
                <div className="c_titres_commandes i_titres_commandes">
                    <div class="i_heures">Heure</div>
					<div class="i_noms">Nom</div>
					<div class="i_contacts">Contact</div>
					<div class="i_adresses">Adresse</div>
					<div class="i_prix_titre">Prix</div>
					<div class="i_heures_prevues">Heure <br /> prévue</div>
                </div>
                <div className="i_commandes_envoye c_commandes" id="cadre_envoye">
                    {envoye.map( element => (

                        <div className="i_commande c_commande">
                            <tr id={element.id}> 
                                <div width='72px' className="i_heure">{element.heure_passee}</div>
                                <div width='112px' className="i_nom">{element.nom}</div> 
                                <div width='105px' className="i_contact">{element.contact}</div> 
                                <div width='220px' className="i_adresse">{element.adresse}</div>
                                <div width='80px' className="i_prix_commande">{element.prix}</div> 
                                <div width='72px' className="i_heure_prevue">{element.heure_prevue}</div>
                                <div>
                                    <button class="i_bouton_suivant" onClick={() => envoi_etape3(element.id)}>suivant</button>
                                </div> 
                            </tr>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Staff;
