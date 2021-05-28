import {useEffect, useState} from "react" ;
import React from 'react' ;
import DetailCommande from './components/DetailCommande';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';

const Staff = () => {
    require('./css/staff.css');
    Axios.defaults.withCredentials = true;

    let compteur_afaire = 1 ;
    let compteur_encours = 1 ;
    let compteur_envoye = 1 ;
    const [condAfaire, setCondAfaire] = useState(true);
    const [condEncours, setCondEncours] = useState(true);
    const [condEnvoyee, setCondEnvoyee] = useState(true);
    const [donnees, setDonnees] = useState(null);
    const [changement, setChangement] = useState(true);
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
     * Récupére toutes les commandes à faire des clients, et stocke ces informations 
     * dans une variable
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(() => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };

        fetch('/api/orders', myInit)
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
            fetch('/api/commande_prete', donnees)
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

        fetch('/api/orders/states', myInit)
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

        fetch('/api/orders', myInit)
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
        
        ligne_info.getElementsByClassName("i_id")[0].style.backgroundColor=couleur_survol;
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
        let liste_aliments = donnees.filter(element => element.IdCommande === identifiant)[0] ;
        let couleur_quitter, bg_bouton ;
        (couleur === "couleur_bg1") ? couleur_quitter = "var(--bg_ligne2)" : couleur_quitter = "var(--bg_ligne1)";
        (liste_aliments.IdMethode === "EMP") ? bg_bouton = "var(--bg_bouton_surplace)" : bg_bouton = couleur_quitter;
        
        ligne_info.getElementsByClassName("i_id")[0].style.backgroundColor=couleur_quitter;
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
        let liste_commandes = donnees.filter(x => x.IdEtat === informations.IdEtat);
        let indice = liste_commandes.indexOf(informations);
        let classe, classeDetail ; 

        if (identifiant === "afaire") {
            document.getElementsByClassName("detailCommandeAfaire")[0].style.gridRowStart = indice + 2 ;
            document.getElementsByClassName("detailCommandeAfaire")[0].style.gridRowEnd = indice + 3 ;
            document.getElementsByClassName("detailCommandeAfaire")[0].style.display = "grid" ;
            setCondAfaire(false);
            classe = "i_afaire" ;
            classeDetail = "detailCommandeAfaire" ;
        }
        else if (identifiant === "encours") {
            document.getElementsByClassName("detailCommandeEnCours")[0].style.gridRowStart = indice + 2 ;
            document.getElementsByClassName("detailCommandeEnCours")[0].style.gridRowEnd = indice + 3 ;
            document.getElementsByClassName("detailCommandeEnCours")[0].style.display = "grid" ;
            setCondEncours(false);
            classe = "i_encours" ;
            classeDetail = "detailCommandeEnCours" ;
        }
        else {
            document.getElementsByClassName("detailCommandeEnvoyee")[0].style.gridRowStart = indice + 2 ;
            document.getElementsByClassName("detailCommandeEnvoyee")[0].style.gridRowEnd = indice + 3 ;
            document.getElementsByClassName("detailCommandeEnvoyee")[0].style.display = "grid" ;
            setCondEnvoyee(false);
            classe = "i_envoye" ;
            classeDetail = "detailCommandeEnvoyee" ;
        }

        let taille = "13% ", nbr_lignes = "13% " ;
        for (let i = 0 ; i < donnees.filter(x => x.IdEtat === informations.IdEtat).length ; i++) {
            if (i=== indice) {nbr_lignes += "250px ";}
            else {nbr_lignes += taille;}
        }
        console.log("classe : ", classe, " nbr : ", nbr_lignes);
        document.getElementById(classe).style.gridTemplateRows = nbr_lignes ;


        let identifiantCommande = informations.IdCommande ;
        fetch(`/api/orders/${identifiantCommande}`, {
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
                    <div class="i_adresse_detail_postal">Postal :  <span class="info_client">' + informations.Zip + '</span>' ;

            (informations.Commentaire === null) ? info_commentaire = "/" : info_commentaire = informations.Commentaire ;
            (informations.IdMethode === "EMP") ? lieu = '<div class="i_adresse_detail_adresse">Lieu :  <span class="info_client">sur place</span></div>' : lieu = info_lieu ;

            let liste_finale = "<div class='i_titre_detail'>Détails de la commande <span class='id_client_detail'>" + informations.IdCommande + "</span> :</div><br><div class='i_aliments_detail' id='c_aliments_detail_" + identifiant + "'>" ;
            for (let i=0 ; i< donnees.length ; i++){
                liste_finale += "<div class='i_ligne_aliment c_ligne_aliment'><div class='titre_aliment'>○ " + donnees[i]["Produit"] + "</div><div class=quantite_aliment>x&ensp;" + donnees[i]["Quantite"] + "</div></div>";
                nbr_lignes += "14% " ;
            }
            liste_finale += '</div><div class="i_payement_detail">Mode de payement : <span class="info_payement">' + ((informations.PayementLiquide === 0) ? "Mistercash" : "Liquide") + '</span></div><div class="i_commentaire_detail">Commentaire : <span class="info_com">' + info_commentaire + '</span></div><div class="i_heure_detail">Heure passée : <span class="info_client">' + informations.DateCommande.substring(14, 19) + " - " + informations.DateCommande.substring(8, 10) + "/" + informations.DateCommande.substring(5, 7) + "/" + informations.DateCommande.substring(0, 4) + '</span></div>' + lieu + '</div>';
                            
            document.getElementsByClassName(classeDetail)[0].innerHTML = liste_finale;
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
        let taille = "13% ";
        let nbr_lignes_afaire = "13% " ;
        let type_couleur, bg_bouton ;
        (compteur_afaire%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_afaire++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "AFA").map(aliment => nbr_lignes_afaire += taille) ;
        if (condAfaire) {
            document.getElementById("i_afaire").style.gridTemplateRows = nbr_lignes_afaire ;
        }
        return (
            <DetailCommande informations={elem} type_couleur={type_couleur} bg_bouton={bg_bouton} onMouseOver={() => nouveauBg(elem.IdCommande)} onMouseLeave={() => ancienBg(elem.IdCommande, type_couleur)} onClick_panier={() => chargementPanier(elem, "afaire")} onClick_ok={() => ajouterCommande(elem, "ENC")}  />        
        )
    }


    /**
     * Affiche une ligne de commande en cours avec les informations importantes
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} elem contient toutes les informations relatives à une commandem
     */
    const elementsEncours = (elem) => {
        let taille = "13% ";
        let  nbr_lignes_encours = "13% ";
        let type_couleur, bg_bouton ;
        (compteur_encours%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_encours++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "ENC").map(aliment => nbr_lignes_encours += taille) ;
        if (condEncours) {
            document.getElementById("i_encours").style.gridTemplateRows = nbr_lignes_encours ;
        }
        return (

            <DetailCommande informations={elem} type_couleur={type_couleur} bg_bouton={bg_bouton} onMouseOver={() => nouveauBg(elem.IdCommande)} onMouseLeave={() => ancienBg(elem.IdCommande, type_couleur)} onClick_panier={() => chargementPanier(elem, "encours")} onClick_ok={() => ajouterCommande(elem, "ENV")}  />
        )
    }


    /**
     * Affiche une ligne de commande envoyée avec les informations importantes
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} elem contient toutes les informations relatives à une commande
     */
    const elementsEnvoye = (elem) => {
        let taille = "13% ";
        let nbr_lignes_envoye = "13% " ;
        let type_couleur, bg_bouton ;
        (compteur_envoye%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_envoye++ ;
        (elem.IdMethode === "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        donnees.filter(element => element.IdEtat === "ENV").map(aliment => nbr_lignes_envoye += taille) ;
        if (condEnvoyee) {
            document.getElementById("i_envoye").style.gridTemplateRows = nbr_lignes_envoye ;
        }
        return (
            <DetailCommande informations={elem} type_couleur={type_couleur} bg_bouton={bg_bouton} onMouseOver={() => nouveauBg(elem.IdCommande)} onMouseLeave={() => ancienBg(elem.IdCommande, type_couleur)} onClick_panier={() => chargementPanier(elem, "envoye")} onClick_ok={() => supprimerCommande(elem.IdCommande)}  />
        )
    }

    return (
        <div>
			{statutConnexion ? <BanniereConnection page="staff" onClick={deconnexion} client={utilisateur}/> : <BanniereBasique />}
            <div className="staff c_page">

                <div className="c_cadre_commandes_afaire i_cadre_attente">
                    <div className="c_titres_commandes i_titres_commandes">
                        <div className="i_id_commande" id="titre_idcom">Commande</div>
                        <div className="i_heures">Heure</div>
                        <div className="i_noms">Nom</div>
                        <div className="i_contacts">Contact</div>
                        <div className="i_prix_titre">Prix</div>
                    </div>

                    <div className="cadre_aliment">
                        <div className="cadre_afaire">Commandes à faire</div>
                        <div className="c_afaire" id="i_afaire">
                            {donnees && donnees.filter(element => element.IdEtat === "AFA").map(elementsAfaire)}
                            <div className="detailCommandeAfaire"></div>
                        </div>
                        
                        <div className="cadre_encours">Commandes en cours</div>
                        <div className="c_encours" id="i_encours">
                            {donnees && donnees.filter(element => element.IdEtat === "ENC").map(elementsEncours)}
                            <div className="detailCommandeEnCours"></div>
                        </div>

                        <div className="cadre_envoye">Commandes envoyées</div>
                        <div className="c_envoye" id="i_envoye">
                            {donnees && donnees.filter(element => element.IdEtat === "ENV").map(elementsEnvoye)}
                            <div className="detailCommandeEnvoyee"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Staff;
