import {useEffect, useState} from "react" ;
import React from 'react'

const Staff = () => {
    require('./staff.css')
    let compteur_afaire = 1 ;
    let compteur_encours = 1 ;
    let compteur_envoye = 1 ;

    const [donnees, setDonnees] = useState(null);
    const [changement, setChangement] = useState(true);

    useEffect(() => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };

        fetch('http://localhost:3001/api/orders', myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setDonnees(data);
        })

    }, [changement]);

    const ajouter_commandes = (idCommande, type_commande) => {
        var myInit = { method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : idCommande, type: type_commande})
        };

        fetch('http://localhost:3001/api/orders', myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setChangement(!changement) ;
        })
    }

    const supprimer_commandes = (idCommande) => {
        var myInit = { method: 'DELETE',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({"commande" : idCommande})
        };

        fetch('http://localhost:3001/api/orders', myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setChangement(!changement) ;
        })
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
        let liste_aliments = donnees.filter(element => element.IdClient === identifiant)[0] ;
        let couleur_quitter, bg_bouton ;
        (couleur === "couleur_bg1") ? couleur_quitter = "var(--bg_ligne2)" : couleur_quitter = "var(--bg_ligne1)";
        (liste_aliments.IdMethode === "EMP") ? bg_bouton = "var(--bg_bouton_surplace)" : bg_bouton = couleur_quitter;
        
        ligne_info.getElementsByClassName("i_nom")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_contact")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_prix_commande")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_heure_prevue")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_div_bouton")[0].style.backgroundColor=bg_bouton;
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.backgroundColor="var(--bg_titres)";
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.color = "black";
    }


    const load_panier = (informations, identifiant) => {
        let identifiantCommande = informations.IdCommande ; 
        fetch(`http://localhost:3001/api/panier/${identifiantCommande}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        }).then(res => {
            return res.json();
        })
        .then(data => {
            
            let nbr_lignes = "";
            let info_commentaire, lieu ;
            let info_lieu = '<div class="i_adresse_detail_adresse">Adresse :  <span class="info_client">' + informations.Rue + '</span></div> \
                    <div class="i_adresse_detail_numero">Numéro :  <span class="info_client">' + informations.Numero + '</span></div> \
                    <div class="i_adresse_detail_ville">Ville :  <span class="info_client">' + informations.Ville + '</span></div> \
                    <div class="i_adresse_detail_postal">Postal :  <span class="info_client">' + informations.Zip + '</span>' ;

            (informations.Commentaire === null) ? info_commentaire = "/" : info_commentaire = informations.Commentaire ;
            (informations.IdMethode === "EMP") ? lieu = '<div class="i_adresse_detail_adresse">Lieu :  <span class="info_client">sur place</span></div>' : lieu = info_lieu ;

            let liste_finale = "<div class='i_titre_detail'>Détails de la commande <span class='id_client_detail'>" + informations.IdCommande + "</span> :</div><br><div class='i_aliments_detail' id='c_aliments_detail_" + identifiant + "'>" ;
            for (let i=0 ; i< data.length ; i++){
                liste_finale += "<div class='i_ligne_aliment c_ligne_aliment'><div class='titre_aliment'>○ " + data[i]["Produit"] + "</div><div class=quantite_aliment>x&ensp;" + data[i]["Quantite"] + "</div></div>";
                nbr_lignes += "14% " ;
            }
            liste_finale += '</div><div class="i_commentaire_detail">Commentaire : <br><span class="info_com">' + info_commentaire + '</span></div><div class="i_heure_detail">Heure passée : <span class="info_client">' + informations.DateCom.substring(14, 19) + " - " + informations.DateCom.substring(8, 10) + "/" + informations.DateCom.substring(5, 7) + "/" + informations.DateCom.substring(0, 4) + '</span></div>' + lieu + '</div>';
                            
            document.getElementById(identifiant).innerHTML = liste_finale;
            document.getElementById("c_aliments_detail_" + identifiant).style.gridTemplateRows = nbr_lignes ;
        })
    }

    const elements_afaire = (elem) => {
        let taille = "12% ";
        let nbr_lignes_afaire = "12% " ;
        let type_couleur, bg_bouton ;
        (compteur_afaire%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_afaire++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "AFA").map(aliment => nbr_lignes_afaire += taille) ;
        document.getElementById("cadre_afaire").style.gridTemplateRows = nbr_lignes_afaire ;

        return (
            <div className="i_commande c_commande" id={elem.IdClient} onMouseOver={() => nouveau_bg(elem.IdClient)} onMouseLeave={() => ancien_bg(elem.IdClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "afaire")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.Prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.Gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.Prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.HLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => ajouter_commandes(elem.IdCommande, "ENC")}>OK</button>
                </div> 
            </div>
        )
    }

    const elements_encours = (elem) => {
        let taille = "12% ";
        let  nbr_lignes_encours = "12% ";
        let type_couleur, bg_bouton ;
        (compteur_encours%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_encours++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "ENC").map(aliment => nbr_lignes_encours += taille) ;
        document.getElementById("cadre_encours").style.gridTemplateRows = nbr_lignes_encours ;

        return (
            <div className="i_commande c_commande" id={elem.IdClient} onMouseOver={() => nouveau_bg(elem.IdClient)} onMouseLeave={() => ancien_bg(elem.IdClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "encours")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.Prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.Gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.Prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.HLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => ajouter_commandes(elem.IdCommande, "ENV")}>OK</button>
                </div> 
            </div>
        )
    }

    const elements_envoye = (elem) => {
        let taille = "12% ";
        let nbr_lignes_envoye = "12% " ;
        let type_couleur, bg_bouton ;
        (compteur_envoye%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_envoye++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "ENV").map(aliment => nbr_lignes_envoye += taille) ;
        document.getElementById("cadre_envoye").style.gridTemplateRows = nbr_lignes_envoye ;

        return (
            <div className="i_commande c_commande" id={elem.IdClient} onMouseOver={() => nouveau_bg(elem.IdClient)} onMouseLeave={() => ancien_bg(elem.IdClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "envoye")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.Prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.Gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.Prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.HLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => supprimer_commandes(elem.IdCommande)}>OK</button>
                </div> 
            </div>
        )
    }

    /*const [heure_courante, setHeureCourante] = useState("allo");
    function RepeatMessage({ message }) {
        useEffect(() => {
          setInterval(() => {
            setHeureCourante(new Date().toLocaleTimeString()) ;
          }, 1000);
        });
        <RepeatMessage message="coucou" />
        return <div className="message" style={{color:"white"}} >{heure_courante}</div>;
    }*/

    return (
        <div className="staff c_page">

            <div className="c_cadre_commandes_afaire i_cadre_attente">
                <div className="c_titre_fileattente i_titre_fileattente">
					<div className="file_attente">File d'attente</div>
					<div className="barre_haut_attente"></div>
					<div className="barre_bas_attente"></div>
				</div>
                <div className="c_titres_commandes i_titres_commandes">
                    <div className="i_heures">Heure</div>
					<div className="i_noms">Nom</div>
					<div className="i_contacts">Contact</div>
					<div className="i_prix_titre">Prix</div>
                </div>

                <div className="i_commandes_afaire c_commandes" id="cadre_afaire">
                    {donnees && donnees.filter(element => element.IdEtat === "AFA").map(elements_afaire)}
                </div>

                <div className="details_commande">
                    <div id="afaire" class='info_commande c_info_commande'></div>
                </div>

                <div className="i_bout_cadre_afaire"></div>
            </div>

            <div className="c_cadre_commandes_encours i_cadre_preparation">
                <div className="c_titre_preparation i_titre_preparation">
					<div className="en_cours_preparation">En cours de préparation</div>
					<div className="barre_haut_preparation"></div>
					<div className="barre_bas_preparation"></div>
				</div>

                <div className="c_titres_commandes i_titres_commandes">
                    <div className="i_heures">Heure</div>
					<div className="i_noms">Nom</div>
					<div className="i_contacts">Contact</div>
					<div className="i_prix_titre">Prix</div>
                </div>
                <div className="i_commandes_encours c_commandes" id="cadre_encours">
                    {donnees && donnees.filter(element => element.IdEtat === "ENC").map(elements_encours)}
                </div>

                <div className="details_commande">
                    <div id="encours" class='info_commande c_info_commande'></div>
                </div>

				<div className="i_bout_cadre_afaire"></div>
            </div>

            <div className="c_cadre_commandes_envoye i_cadre_envoi">
                <div className="c_titre_envoi i_titre_envoi">
					<div className="en_cours_envoi">En cours d'envoi</div>
					<div className="barre_haut_envoi"></div>
					<div className="barre_bas_envoi"></div>
				</div>

                <div className="c_titres_commandes i_titres_commandes">
                    <div className="i_heures">Heure</div>
					<div className="i_noms">Nom</div>
					<div className="i_contacts">Contact</div>
					<div className="i_prix_titre">Prix</div>
                </div>
                <div className="i_commandes_envoye c_commandes" id="cadre_envoye">
                    {donnees && donnees.filter(element => element.IdEtat === "ENV").map(elements_envoye)}
                </div>

                <div className="details_commande">
                    <div id="envoye" class='info_commande c_info_commande'></div>
                </div>

				<div className="i_bout_cadre_afaire"></div>
            </div>
        </div>
    );
}

export default Staff;
