import {useEffect, useState} from "react" ;
import React from 'react' ;
import DetailCommande from './components/DetailCommande';

import Axios from "axios";
import Banner from './Banner.js';
import BannerConnect from './components/BannerConnect.js';

const Staff = () => {
    require('./staff.css');
    Axios.defaults.withCredentials = true;

    let compteur_afaire = 1 ;
    let compteur_encours = 1 ;
    let compteur_envoye = 1 ;
    const [donnees, setDonnees] = useState(null);
    const [changement, setChangement] = useState(true);
    const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState("");


    /**
     * Vérifie si l'utilisateur est connecté au chargement de la page
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
				setUsername(response.data.user[0].IdClient);
			}
			else {setLoginStatus(false);}
		});
	}, []);


    /**
     * Déconnecte l'utilisateur
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const deconnexion = () => {
		Axios.get(`http://localhost:3001/api/deconnexion`).then((response) => {
			setLoginStatus(false);
		});
	}


    /**
     * Récupére toutes les commandes à faire des clients, et stocke ces informations 
     * dans une variable
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(() => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };

        fetch('http://localhost:3001/api/orders', myInit)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            setDonnees(donnees);
        })

    }, [changement]);


    /**
     * Prévenient un client que sa commande arrive / est prête et déplace sa ligne de commande
     * dans le cadre adéquat
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} client           contient toutes les informations relatives à la commande d'un client
     * @param {string} type_commande    type de commande ; à faire ou en cours
     */
    const ajouterCommande = (client, type_commande) => {
        if (type_commande === "ENV") {
            var donnees = { method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: client.Mail, methode:client.IdMethode, prenom:client.Prenom, idcommande:client.IdCommande})
            };
            fetch('http://localhost:3001/api/commande_prete', donnees)
            .then(res => {
                return res.json();
            })
            .then(donnees => {
                console.log("mail envoyé")
            })
        }
        var myInit = { method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : client.IdCommande, type: type_commande})
        };

        fetch('http://localhost:3001/api/orders/states', myInit)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            setChangement(!changement) ;
        })
    }


    /**
     * Supprime une commande totale
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {number} idCommande identifiant de la commande à supprimer
     */
    const supprimerCommande = (idCommande) => {
        var myInit = { method: 'DELETE',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({"commande" : idCommande})
        };

        fetch('http://localhost:3001/api/orders', myInit)
        .then(res => {
            return res.json();
        })
        .then(donnnees => {
            setChangement(!changement) ;
        })
    }


    /**
     * Change la couleur de fond d'une ligne lors du survol de celle-ci
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {number} identifiant identifiant du div/de la ligne d'informations pour lequel/laquelle la couleur de fond doit changer
     */
    const nouveauBg = (identifiant) => {
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


    /**
     * Remet la couleur de fond d'une ligne de base lorsque le survol n'est plus présent
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {number} identifiant  identifiant du div/de la ligne d'informations pour lequel/laquelle la couleur de fond doit changer
     * @param {string} couleur      ancienne couleur de fond de la ligne
     */
    const ancienBg = (identifiant, couleur) => {
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


    /**
     * Charge les informations détaillées d'une commande ; les différents aliments de la commande, ainsi que
     * les informations relatives au client
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} informations contient toutes les informations concernant une commande
     * @param {string} identifiant  type de commande ; à faire, en cours ou envoyé
     */
    const chargementPanier = (informations, identifiant) => {
        let identifiantCommande = informations.IdCommande ;
        fetch(`http://localhost:3001/api/orders/users/${identifiantCommande}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        }).then(res => {
            return res.json();
        })
        .then(donnees => {
            let nbr_lignes = "";
            let info_commentaire, lieu ;
            let info_lieu = '<div class="i_adresse_detail_adresse">Adresse :  <span class="info_client">' + informations.Rue + '</span></div> \
                    <div class="i_adresse_detail_numero">Numéro :  <span class="info_client">' + informations.Numero + '</span></div> \
                    <div class="i_adresse_detail_ville">Ville :  <span class="info_client">' + informations.Ville + '</span></div> \
                    <div class="i_adresse_detail_postal">Postal :  <span class="info_client">' + informations.Postal + '</span>' ;

            (informations.Commentaire === null) ? info_commentaire = "/" : info_commentaire = informations.Commentaire ;
            (informations.IdMethode === "EMP") ? lieu = '<div class="i_adresse_detail_adresse">Lieu :  <span class="info_client">sur place</span></div>' : lieu = info_lieu ;

            let liste_finale = "<div class='i_titre_detail'>Détails de la commande <span class='id_client_detail'>" + informations.IdCommade + "</span> :</div><br><div class='i_aliments_detail' id='c_aliments_detail_" + identifiant + "'>" ;
            for (let i=0 ; i< donnees.length ; i++){
                liste_finale += "<div class='i_ligne_aliment c_ligne_aliment'><div class='titre_aliment'>○ " + donnees[i]["Produit"] + "</div><div class=quantite_aliment>x&ensp;" + donnees[i]["Quantite"] + "</div></div>";
                nbr_lignes += "14% " ;
            }
            liste_finale += '</div><div class="i_commentaire_detail">Commentaire : <br><span class="info_com">' + info_commentaire + '</span></div><div class="i_heure_detail">Heure passée : <span class="info_client">' + informations.DateCommande.substring(14, 19) + " - " + informations.DateCommande.substring(8, 10) + "/" + informations.DateCommande.substring(5, 7) + "/" + informations.DateCom.substring(0, 4) + '</span></div>' + lieu + '</div>';
                            
            document.getElementById(identifiant).innerHTML = liste_finale;
            document.getElementById("c_aliments_detail_" + identifiant).style.gridTemplateRows = nbr_lignes ;
        })
    }


    /**
     * Affiche une ligne de commande à faire avec les informations importantes
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} elem contient toutes les informations relatives à une commande
     */
    const elementsAfaire = (elem) => {
        let taille = "12% ";
        let nbr_lignes_afaire = "12% " ;
        let type_couleur, bg_bouton ;
        (compteur_afaire%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_afaire++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "AFA").map(aliment => nbr_lignes_afaire += taille) ;
        document.getElementById("cadre_afaire").style.gridTemplateRows = nbr_lignes_afaire ;
        console.log("informations : ", elem);
        return (
            <DetailCommande informations={elem} type_couleur={type_couleur} bg_bouton={bg_bouton} onMouseOver={() => nouveauBg(elem.IdClient)} onMouseLeave={() => ancienBg(elem.IdClient, type_couleur)} onClick_panier={() => chargementPanier(elem, "afaire")} onClick_ok={() => ajouterCommande(elem, "ENC")}  />        
        )
    }


    /**
     * Affiche une ligne de commande en cours avec les informations importantes
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} elem contient toutes les informations relatives à une commandem
     */
    const elementsEncours = (elem) => {
        let taille = "12% ";
        let  nbr_lignes_encours = "12% ";
        let type_couleur, bg_bouton ;
        (compteur_encours%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_encours++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "ENC").map(aliment => nbr_lignes_encours += taille) ;
        document.getElementById("cadre_encours").style.gridTemplateRows = nbr_lignes_encours ;

        return (

            <DetailCommande informations={elem} type_couleur={type_couleur} bg_bouton={bg_bouton} onMouseOver={() => nouveauBg(elem.IdClient)} onMouseLeave={() => ancienBg(elem.IdClient, type_couleur)} onClick_panier={() => chargementPanier(elem, "encours")} onClick_ok={() => ajouterCommande(elem, "ENV")}  />
        )
    }


    /**
     * Affiche une ligne de commande envoyée avec les informations importantes
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} elem contient toutes les informations relatives à une commande
     */
    const elementsEnvoye = (elem) => {
        let taille = "12% ";
        let nbr_lignes_envoye = "12% " ;
        let type_couleur, bg_bouton ;
        (compteur_envoye%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_envoye++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "ENV").map(aliment => nbr_lignes_envoye += taille) ;
        document.getElementById("cadre_envoye").style.gridTemplateRows = nbr_lignes_envoye ;

        return (
            <DetailCommande informations={elem} type_couleur={type_couleur} bg_bouton={bg_bouton} onMouseOver={() => nouveauBg(elem.IdClient)} onMouseLeave={() => ancienBg(elem.IdClient, type_couleur)} onClick_panier={() => chargementPanier(elem, "envoye")} onClick_ok={() => supprimerCommande(elem.IdCommande)}  />
        )
    }

    return (
        <div>
			{loginStatus ? <BannerConnect onClick={deconnexion} client={username}/> : <Banner />}
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
                        {donnees && donnees.filter(element => element.IdEtat === "AFA").map(elementsAfaire)}
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
                        {donnees && donnees.filter(element => element.IdEtat === "ENC").map(elementsEncours)}
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
                        {donnees && donnees.filter(element => element.IdEtat === "ENV").map(elementsEnvoye)}
                    </div>

                    <div className="details_commande">
                        <div id="envoye" class='info_commande c_info_commande'></div>
                    </div>

                    <div className="i_bout_cadre_afaire"></div>
                </div>
            </div>
        </div>
    );
}

export default Staff;
