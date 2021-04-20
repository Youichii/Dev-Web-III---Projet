import {useEffect, useState} from "react" ;
import Axios from 'axios'

const Staff = () => {
    
    const [afaire, setAfaire] = useState([{"id" : "aaaaz", "heure_passee" : "18h06", "nom" : "Jean", "contact" : "0000000000", "adresse" : "Rue kiku ojizjroajzrkjkije", "commande" : [["poulet", 3], ["viande", 4], ["pipi", 6], ["aljkrzlaklr", 7], ["viande", 5]], "prix" : 17, "heure_prevue" : "19h00"},
    {"id" : "aaaaa", "heure_passee" : "06h25", "nom" : "Pierre", "contact" : "1111111111", "adresse" : "ici", "commande" : [["poet", 2]], "prix" : 96, "heure_prevue" : "07h00"},
    {"id" : "aaaab", "heure_passee" : "07h25", "nom" : "Pirre", "contact" : "11111", "adresse" : "ici", "commande" : [["ulet", 3]], "prix" : 967, "heure_prevue" : "07h01"},
    {"id" : "aaaac", "heure_passee" : "08h25", "nom" : "Pire", "contact" : "1111111", "adresse" : "al654kz", "commande" : [["ulet", 3]], "prix" : 9, "heure_prevue" : "07h02"},
    {"id" : "aaaad", "heure_passee" : "09h25", "nom" : "Pie", "contact" : "11111111", "adresse" : "alkazrrez", "commande" : [["ulet", 3]], "prix" : 6, "heure_prevue" : "07h03"},
    {"id" : "aaaae", "heure_passee" : "21h36", "nom" : "Richard", "contact" : "222222222", "adresse" : "zraz", "commande" : [["ulet", 3]], "prix" : 63.5, "heure_prevue" : "22h15"},
    {"id" : "aaaaf", "heure_passee" : "19h45", "nom" : "Vincent", "contact" : "3333333333", "adresse" : "hrehyer", "commande" : [["ulet", 3]], "prix" : 452, "heure_prevue" : "20h30"},
    {"id" : "aaaag", "heure_passee" : "19h27", "nom" : "Jeanne", "contact" : "4444444444", "adresse" : "ici", "commande" : [["ulet", 3]], "prix" : 75.2, "heure_prevue" : "20h00"},
    {"id" : "aaaah", "heure_passee" : "18h00", "nom" : "Marie", "contact" : "5555555555", "adresse" : "azaez", "commande" : [["pulet", 3]], "prix" : 10, "heure_prevue" : "18h30"},
    {"id" : "aaaai", "heure_passee" : "17h54", "nom" : "Clem", "contact" : "66666666666", "adresse" : "vpcvht", "commande" : [["poulet", 1]], "prix" : 5, "heure_prevue" : "18h15"},
    {"id" : "aaaaj", "heure_passee" : "14h06", "nom" : "Tom", "contact" : "77777777777", "adresse" : "tiutur", "commande" : [["oulet", 1]], "prix" : 13, "heure_prevue" : "15h45"},
    {"id" : "aaaak", "heure_passee" : "03h59", "nom" : "Louise", "contact" : "888888888", "adresse" : "hrturaz", "commande" : [["pou", 7]], "prix" : 23.15, "heure_prevue" : "04h30"},
    {"id" : "aaaal", "heure_passee" : "19h27", "nom" : "Jeanne", "contact" : "4444444444", "adresse" : "gfbvc", "commande" : [["poule", 9]], "prix" : 75.2, "heure_prevue" : "20h00"},
    {"id" : "aaaam", "heure_passee" : "18h00", "nom" : "Marie", "contact" : "5555555555", "adresse" : "azaez", "commande" : [["pulet", 2]], "prix" : 10, "heure_prevue" : "18h30"},
    {"id" : "aaaan", "heure_passee" : "17h54", "nom" : "Clem", "contact" : "66666666666", "adresse" : "vpcvht", "commande" : [["poulet", 1]], "prix" : 5, "heure_prevue" : "18h15"},
    {"id" : "aaaao", "heure_passee" : "14h06", "nom" : "Tom", "contact" : "77777777777", "adresse" : "ici", "commande" : [["oulet", 5]], "prix" : 13, "heure_prevue" : "15h45"},
    {"id" : "aaaap", "heure_passee" : "03h59", "nom" : "Louise", "contact" : "888888888", "adresse" : "hrturaz", "commande" : [["pou", 2]], "prix" : 23.15, "heure_prevue" : "04h30"}]) ;
    
    const [encours, setEncours] = useState([]);
    const [envoye, setEnvoye] = useState([]);
    const [informations_commande, setInformationsCommande] = useState("");
    let compteur = 1 ;
    
    useEffect(() => {
        init() ;
    }, []);

    const recuperer_utilisateur = () => {
        Axios.get('http://localhost:3001/api/users', {
            identifiant : "2",
            test : "coucou"
        }).then(() => {
            console.log("Hello")
        })
    }

    const recuperer_commandes = () => {
        Axios.get('http://localhost:3001/api/orders', {
            Username : "clem", //à supprimer
        }).then(() => {
            console.log("Hello")
        })
    }

    const ajouter_commandes = () => {
        Axios.post('http://localhost:3001/api/orders', {
            table : "encours",
            commande : "xx",
        }).then(() => {
            console.log("Hello")
        })
    }

    const supprimer_commandes = () => {
        Axios.delete('http://localhost:3001/api/orders', {
            table : "afaire",
            commande : "xx",
        }).then(() => {
            console.log("Hello")
        })
    }

    const init = () => {
        let taille = "12% ";
        let nbr_lignes_afaire = "12% ", nbr_lignes_encours = "12% ", nbr_lignes_envoye = "12% " ;

        afaire.map(x => nbr_lignes_afaire += taille) ;
        document.getElementById("cadre_afaire").style.gridTemplateRows = nbr_lignes_afaire ;

        encours.map(x => nbr_lignes_encours += taille) ;
        document.getElementById("cadre_encours").style.gridTemplateRows = nbr_lignes_encours ;

        envoye.map(x => nbr_lignes_envoye += taille) ;
        document.getElementById("cadre_envoye").style.gridTemplateRows = nbr_lignes_envoye ;
    }

    const envoi_etape1 =(identifiant) => {
        const newAfaire = afaire.filter(element => element.id !== identifiant);
        const newEncours = encours.concat(afaire.filter(element => element.id === identifiant));

        setAfaire(newAfaire) ;
        setEncours(newEncours) ;
        init() ;
    }

    const envoi_etape2 =(identifiant) => {
        const newEncours = encours.filter(element => element.id !== identifiant);
        const newEnvoye = envoye.concat(encours.filter(element => element.id === identifiant));

        setEncours(newEncours) ;
        setEnvoye(newEnvoye) ;
        init() ;
    }

    const envoi_etape3 =(identifiant) => {
        const newEnvoye = envoye.filter(element => element.id !== identifiant);

        setEnvoye(newEnvoye) ;
        init() ;
    }

    const nouveau_bg = (identifiant) => {
        let ligne_info = document.getElementById(identifiant);
        let couleur_survol = "var(--bg_survol)";
        
        ligne_info.getElementsByClassName("i_nom")[0].style.backgroundColor=couleur_survol;
        ligne_info.getElementsByClassName("i_contact")[0].style.backgroundColor=couleur_survol;
        ligne_info.getElementsByClassName("i_prix_commande")[0].style.backgroundColor=couleur_survol;
        ligne_info.getElementsByClassName("i_heure_prevue")[0].style.backgroundColor=couleur_survol;
        ligne_info.getElementsByClassName("i_div_bouton")[0].style.backgroundColor=couleur_survol;
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.backgroundColor="#4A4444";
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.color = "white";
    }

    const ancien_bg = (identifiant, couleur) => {
        let ligne_info = document.getElementById(identifiant);
        let couleur_quitter ;
        if (couleur == "couleur_bg1") {
            couleur_quitter = "var(--bg_ligne2)";
        }
        else {
            couleur_quitter = "var(--bg_ligne1)";
        }
        
        let liste_aliments ;	
        for (var i = 0; i < afaire.length; i++) {
            if (afaire[i]["id"] == identifiant) {
                liste_aliments = afaire[i] ;
                break ;
            }
        }
        for (var i = 0; i < envoye.length; i++) {
            if (envoye[i]["id"] == identifiant) {
                liste_aliments = envoye[i] ;
                break ;
            }
        }
        for (var i = 0; i < encours.length; i++) {
            if (encours[i]["id"] == identifiant) {
                liste_aliments = encours[i] ;
                break ;
            }
        }
        
        let bg_bouton = couleur_quitter;
        if (liste_aliments['adresse'] == "ici") {
            bg_bouton = "var(--bg_bouton_surplace)";
        }
        
        ligne_info.getElementsByClassName("i_nom")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_contact")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_prix_commande")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_heure_prevue")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_div_bouton")[0].style.backgroundColor=bg_bouton;
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.backgroundColor="var(--bg_titres)";
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.color = "black";
    }


    const afficher_commande= (commande, identifiant) => {
        let nbr_lignes = "";
        let liste_aliments ;	
        for (var i = 0; i < afaire.length; i++) {
            if (afaire[i]["id"] == commande) {
                liste_aliments = afaire[i] ;
                break ;
            }
        }
        for (var i = 0; i < envoye.length; i++) {
            if (envoye[i]["id"] == commande) {
                liste_aliments = envoye[i] ;
                break ;
            }
        }
        for (var i = 0; i < encours.length; i++) {
            if (encours[i]["id"] == commande) {
                liste_aliments = encours[i] ;
                break ;
            }
        }
        
        let liste_finale = "<div class='info_commande c_info_commande'><div class='i_titre_detail'>Détails de la commande <span class='id_client_detail'>" + commande + "</span> :</div><br><div class='i_aliments_detail' id='c_aliments_detail_" + identifiant + "'>" ;
        for (let i=0 ; i<liste_aliments["commande"].length ; i++){
            liste_finale += "<div class='i_ligne_aliment c_ligne_aliment'><div class='titre_aliment'>○ " + liste_aliments["commande"][i][0] + "</div><div class=quantite_aliment>x&ensp;" + liste_aliments["commande"][i][1] + "</div></div>";
            
            nbr_lignes += "14% " ;
        }
        liste_finale += '</div> <div class="i_heure_detail">Heure passée : <span class="info_client">' + liste_aliments['heure_passee'] + '</span></div> \
        <div class="i_adresse_detail">Adresse :  <span class="info_client">' + liste_aliments["adresse"] + '</span></div></div>' ;
        
        document.getElementById(identifiant).innerHTML = liste_finale;
        document.getElementById("c_aliments_detail_" + identifiant).style.gridTemplateRows = nbr_lignes ;
    }

    const elements_afaire = (elem) => {
        let type_couleur, bg_bouton ;
        (compteur%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur++ ;
        (elem.adresse == "ici") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        return (
            <div className="i_commande c_commande" id={elem.id} onMouseOver={() => nouveau_bg(elem.id)} onMouseLeave={() => ancien_bg(elem.id, type_couleur)} onClick={() => afficher_commande(elem.id, "id_details_commande")}>
                <div className={`i_nom ${type_couleur}`}>{elem.nom}</div> 
                <div className={`i_contact ${type_couleur}`}>{elem.contact}</div> 
                <div className={`i_prix_commande ${type_couleur}`}>{elem.prix}</div> 
                <div className={`i_heure_prevue ${type_couleur}`}>{elem.heure_prevue}</div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button class="i_bouton_suivant" onClick={() => envoi_etape1(elem.id)}>OK</button>
                </div> 
            </div>
        )

    }

    const elements_encours = (elem) => {
        let type_couleur, bg_bouton ;
        (compteur%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur++ ;
        (elem.adresse == "ici") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        return (
            <div className="i_commande c_commande" id={elem.id} onMouseOver={() => nouveau_bg(elem.id)} onMouseLeave={() => ancien_bg(elem.id, type_couleur)} onClick={() => afficher_commande(elem.id, "id_details_commande2")}>
                <div className={`i_nom ${type_couleur}`}>{elem.nom}</div> 
                <div className={`i_contact ${type_couleur}`}>{elem.contact}</div> 
                <div className={`i_prix_commande ${type_couleur}`}>{elem.prix}</div> 
                <div className={`i_heure_prevue ${type_couleur}`}>{elem.heure_prevue}</div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button class="i_bouton_suivant" onClick={() => envoi_etape2(elem.id)}>OK</button>
                </div> 
            </div>
        )

    }

    const elements_envoye = (elem) => {
        let type_couleur, bg_bouton ;
        (compteur%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur++ ;
        (elem.adresse == "ici") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        return (
            <div className="i_commande c_commande" id={elem.id} onMouseOver={() => nouveau_bg(elem.id)} onMouseLeave={() => ancien_bg(elem.id, type_couleur)} onClick={() => afficher_commande(elem.id, "id_details_commande3")}>
                <div className={`i_nom ${type_couleur}`}>{elem.nom}</div> 
                <div className={`i_contact ${type_couleur}`}>{elem.contact}</div> 
                <div className={`i_prix_commande ${type_couleur}`}>{elem.prix}</div> 
                <div className={`i_heure_prevue ${type_couleur}`}>{elem.heure_prevue}</div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button class="i_bouton_suivant" onClick={() => envoi_etape3(elem.id)}>OK</button>
                </div> 
            </div>
        )

    }

    return (
        <div className="staff c_page">

            <div className="c_cadre_commandes i_cadre_attente">
                <div className="c_titre_fileattente i_titre_fileattente">
					<div className="file_attente">File d'attente</div>
					<div className="barre_haut_attente"></div>
					<div className="barre_bas_attente"></div>
				</div>
                <div className="c_titres_commandes i_titres_commandes">
                    <div class="i_heures">Heure</div>
					<div class="i_noms">Nom</div>
					<div class="i_contacts">Contact</div>
					<div class="i_prix_titre">Prix</div>
                </div>

                <div className="i_commandes_afaire c_commandes" id="cadre_afaire">
                    {afaire.map(elements_afaire)}
                </div>

                <div id="id_details_commande" class="details_commande"></div>
                <div className="i_bout_cadre_afaire"></div>
            </div>

            <div className="c_cadre_commandes i_cadre_preparation">
                <div className="c_titre_preparation i_titre_preparation">
					<div className="en_cours_preparation">En cours de préparation</div>
					<div className="barre_haut_preparation"></div>
					<div className="barre_bas_preparation"></div>
				</div>

                <div className="c_titres_commandes i_titres_commandes">
                    <div class="i_heures">Heure</div>
					<div class="i_noms">Nom</div>
					<div class="i_contacts">Contact</div>
					<div class="i_prix_titre">Prix</div>
                </div>
                <div className="i_commandes_encours c_commandes" id="cadre_encours">
                    {encours.map(elements_encours)}
                </div>
                <div id="id_details_commande2" className="details_commande"></div>
				<div className="i_bout_cadre_afaire"></div>
            </div>

            <div className="c_cadre_commandes i_cadre_envoi">
                <div className="c_titre_envoi i_titre_envoi">
					<div className="en_cours_envoi">En cours d'envoi</div>
					<div className="barre_haut_envoi"></div>
					<div className="barre_bas_envoi"></div>
				</div>

                <div className="c_titres_commandes i_titres_commandes">
                    <div class="i_heures">Heure</div>
					<div class="i_noms">Nom</div>
					<div class="i_contacts">Contact</div>
					<div class="i_prix_titre">Prix</div>
                </div>
                <div className="i_commandes_envoye c_commandes" id="cadre_envoye">
                    {envoye.map(elements_envoye)}
                </div>
                <div id="id_details_commande3" className="details_commande"></div>
				<div className="i_bout_cadre_afaire"></div>
            </div>

            <button class="i_bouton_suivant" onClick={() => recuperer_utilisateur()}>users</button>
            <button class="i_bouton_suivant" onClick={() => recuperer_commandes()}>getorder</button>
            <button class="i_bouton_suivant" onClick={() => ajouter_commandes()}>postorder</button>
            <button class="i_bouton_suivant" onClick={() => supprimer_commandes()}>delorder</button>
        </div>
    );
}

export default Staff;
