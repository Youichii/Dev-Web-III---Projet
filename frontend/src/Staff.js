import {useEffect, useState} from "react" ;
import Axios from 'axios';

const Staff = () => {
    
    let compteur_afaire = 1 ;
    let compteur_encours = 1 ;
    let compteur_envoye = 1 ;

    const [blogs, setBlogs] = useState(null);
    const [changement, setChangement] = useState(true);

    let total_commandes = null;
    let donnees ;
    
    useEffect(() => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch('http://localhost:3001/api/orders', myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setBlogs(data);
        })

    }, [changement]);

    const ajouter_commandes = (idCommande, type_commande) => {
        var myInit = { method: 'POST',
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
        let couleur_quitter ;
        if (couleur == "couleur_bg1") {
            couleur_quitter = "var(--bg_ligne2)";
        }
        else {
            couleur_quitter = "var(--bg_ligne1)";
        }
        
        let liste_aliments = blogs.filter(element => element.id == identifiant)[0] ;
        
        let bg_bouton = couleur_quitter;
        if (liste_aliments.Lieu == "emporter") {
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


    const load_panier = (informations, identifiant) => {
        let identifiantCommande = informations.idCommande ; 
        return fetch(`http://localhost:3001/api/panier/${identifiantCommande}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        }).then(res => {
            return res.json();
        })
        .then(data => {
            donnees = data ;

            let nbr_lignes = "";
            let lieu ;
            (informations.Lieu == "emporter") ? lieu = "sur place" : lieu = informations.address ;
            let liste_finale = "<div class='info_commande c_info_commande'><div class='i_titre_detail'>Détails de la commande <span class='id_client_detail'>" + informations.id + "</span> :</div><br><div class='i_aliments_detail' id='c_aliments_detail_" + identifiant + "'>" ;
            for (let i=0 ; i< data.length ; i++){
                liste_finale += "<div class='i_ligne_aliment c_ligne_aliment'><div class='titre_aliment'>○ " + data[i]["nomProduit"] + "</div><div class=quantite_aliment>x&ensp;" + data[i]["quantite"] + "</div></div>";
                
                nbr_lignes += "14% " ;
            }
            liste_finale += '</div> <div class="i_heure_detail">Heure passée : <span class="info_client">' + informations.heure_passee + '</span></div> \
            <div class="i_adresse_detail">Adresse :  <span class="info_client">' + lieu + '</span></div></div>' ;
            
            document.getElementById(identifiant).innerHTML = liste_finale;
            document.getElementById("c_aliments_detail_" + identifiant).style.gridTemplateRows = nbr_lignes ;
        })
    }

    const elements_afaire = (elem) => {
        let taille = "12% ";
        let nbr_lignes_afaire = "12% " ;

        blogs.filter(element => element.typeCommande === "afaire").map(x => nbr_lignes_afaire += taille) ;
        document.getElementById("cadre_afaire").style.gridTemplateRows = nbr_lignes_afaire ;

        let type_couleur, bg_bouton ;
        (compteur_afaire%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_afaire++ ;
        (elem.Lieu == "emporter") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        return (
            <div className="i_commande c_commande" id={elem.id} onMouseOver={() => nouveau_bg(elem.id)} onMouseLeave={() => ancien_bg(elem.id, type_couleur)}>
                <div class="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "afaire")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.firstname}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.phone}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.price}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.heure_reservee}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button class="i_bouton_suivant" onClick={() => ajouter_commandes(elem.idCommande, "encours")}>OK</button>
                </div> 
            </div>
        )
    }

    const elements_encours = (elem) => {
        let taille = "12% ";
        let  nbr_lignes_encours = "12% ";

        blogs.filter(element => element.typeCommande === "encours").map(x => nbr_lignes_encours += taille) ;
        document.getElementById("cadre_encours").style.gridTemplateRows = nbr_lignes_encours ;

        let type_couleur, bg_bouton ;
        (compteur_encours%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_encours++ ;
        (elem.Lieu == "emporter") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        return (
            <div className="i_commande c_commande" id={elem.id} onMouseOver={() => nouveau_bg(elem.id)} onMouseLeave={() => ancien_bg(elem.id, type_couleur)}>
                <div class="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "encours")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.firstname}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.phone}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.price}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.heure_reservee}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button class="i_bouton_suivant" onClick={() => ajouter_commandes(elem.idCommande, "envoye")}>OK</button>
                </div> 
            </div>
        )
    }

    const elements_envoye = (elem) => {
        let taille = "12% ";
        let nbr_lignes_envoye = "12% " ;

        blogs.filter(element => element.typeCommande === "envoye").map(x => nbr_lignes_envoye += taille) ;
        document.getElementById("cadre_envoye").style.gridTemplateRows = nbr_lignes_envoye ;

        let type_couleur, bg_bouton ;
        (compteur_envoye%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_envoye++ ;
        (elem.Lieu == "emporter") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        return (
            <div className="i_commande c_commande" id={elem.id} onMouseOver={() => nouveau_bg(elem.id)} onMouseLeave={() => ancien_bg(elem.id, type_couleur)}>
                <div class="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "envoye")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.firstname}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.phone}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.price}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.heure_reservee}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button class="i_bouton_suivant" onClick={() => supprimer_commandes(elem.idCommande)}>OK</button>
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
                    {blogs && blogs.filter(element => element.typeCommande === "afaire").map(elements_afaire)}
                </div>

                <div id="afaire" class="details_commande"></div>
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
                    {blogs && blogs.filter(element => element.typeCommande === "encours").map(elements_encours)}
                </div>
                <div id="encours" className="details_commande"></div>
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
                    {blogs && blogs.filter(element => element.typeCommande === "envoye").map(elements_envoye)}
                </div>
                <div id="envoye" className="details_commande"></div>
				<div className="i_bout_cadre_afaire"></div>
            </div>
        </div>
    );
}

export default Staff;
