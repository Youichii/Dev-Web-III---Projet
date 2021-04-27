import {useEffect, useState} from "react" ;
import React from 'react'

const Staff = () => {
    
    let compteur_afaire = 1 ;
    let compteur_encours = 1 ;
    let compteur_envoye = 1 ;

    let taille_afaire = "450px " ;
    let taille_encours = "450px " ;
    let taille_envoye = "450px " ;

    let taille_petit_afaire = "320px ";
    let taille_petit_encours = "320px ";
    let taille_petit_envoye = "320px ";

    const [blogs, setBlogs] = useState(null);
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
            setBlogs(data);
        })

    }, [changement]);

    /*function updateWidthAndHeight() {
        if (window.innerWidth >= 1060){
            document.getElementsByClassName("c_cadre_commandes_afaire")[0].style.gridTemplateRows = "7% 16% 140px 201px 10%";
            document.getElementsByClassName("c_cadre_commandes_encours")[0].style.gridTemplateRows = "7% 16% 140px 201px 10%";
            document.getElementsByClassName("c_cadre_commandes_envoye")[0].style.gridTemplateRows = "7% 16% 140px 201px 10%";
            document.getElementsByClassName("c_page")[0].style.gridTemplateRows = "495px 495px 495px";
        }
        else if (window.innerWidth < 1060){
            document.getElementsByClassName("c_cadre_commandes_afaire")[0].style.gridTemplateRows = "36px 64px 150px 171px 10% 26px 530px;";
            document.getElementsByClassName("c_cadre_commandes_encours")[0].style.gridTemplateRows = "36px 64px 150px 171px 10% 26px 530px;";
            document.getElementsByClassName("c_cadre_commandes_envoye")[0].style.gridTemplateRows = "36px 64px 150px 171px 10% 26px 530px;";
            document.getElementsByClassName("c_page")[0].style.gridTemplateRows = "1000px 1000px 1000px";
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
    });*/

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
        let liste_aliments = blogs.filter(element => element.idClient == identifiant)[0] ;
        let couleur_quitter, bg_bouton ;
        (couleur === "couleur_bg1") ? couleur_quitter = "var(--bg_ligne2)" : couleur_quitter = "var(--bg_ligne1)";
        (liste_aliments.idMethode == "EMP") ? bg_bouton = "var(--bg_bouton_surplace)" : bg_bouton = couleur_quitter;
        
        ligne_info.getElementsByClassName("i_nom")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_contact")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_prix_commande")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_heure_prevue")[0].style.backgroundColor=couleur_quitter;
        ligne_info.getElementsByClassName("i_div_bouton")[0].style.backgroundColor=bg_bouton;
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.backgroundColor="var(--bg_titres)";
        ligne_info.getElementsByClassName("i_bouton_suivant")[0].style.color = "black";
    }


    const load_panier = (informations, identifiant) => {
        let identifiantCommande = informations.idCom ; 
        console.log("info : ", informations, " id : ", identifiant, " idcom : ", identifiantCommande);

        /*if (window.innerWidth <= 1060){
            let cadre, cadre_detail ;
            if (identifiant === "afaire"){
                cadre = "c_cadre_commandes_afaire" ;
                if (taille_afaire != "1000px") {
                    taille_afaire = "1000px " ;
                    taille_petit_afaire = "700px ";
                }
            }
            else if (identifiant === "encours"){
                cadre = "c_cadre_commandes_encours" ;
                if (taille_encours != "1000px") {
                    taille_encours = "1000px " ;
                    taille_petit_encours = "700px ";
                }
            }
            else if (identifiant === "envoye"){
                cadre = "c_cadre_commandes_envoye" ;
                if (taille_envoye != "1000px") {
                    taille_envoye = "1000px " ;
                    taille_petit_envoye = "700px ";
                }
            }

            (window.innerWidth <= 700) ? cadre_detail = "36px 40px 128px 113px 27px 26px 430px" : cadre_detail = "36px 64px 150px 171px 10% 26px 530px" ;
            document.getElementsByClassName(cadre)[0].style.gridTemplateRows = cadre_detail;
            if (window.innerWidth <= 700) {
                document.getElementsByClassName("c_page")[0].style.gridTemplateRows = taille_petit_afaire + taille_petit_encours + taille_petit_envoye;
            }
            else {
                document.getElementsByClassName("c_page")[0].style.gridTemplateRows = taille_afaire + taille_encours + taille_envoye;
            }
        }*/
        fetch(`http://localhost:3001/api/panier/${identifiantCommande}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        }).then(res => {
            return res.json();
        })
        .then(data => {
            
            let nbr_lignes = "";
            let info_commentaire, lieu ;
            let info_lieu = '<div class="i_adresse_detail_adresse">Adresse :  <span class="info_client">' + informations.rue + '</span></div> \
                    <div class="i_adresse_detail_numero">Numéro :  <span class="info_client">' + informations.numero + '</span></div> \
                    <div class="i_adresse_detail_ville">Ville :  <span class="info_client">' + informations.ville + '</span></div> \
                    <div class="i_adresse_detail_postal">Postal :  <span class="info_client">' + informations.postal + '</span>' ;

            (informations.commentaire === null) ? info_commentaire = "/" : info_commentaire = informations.commentaire ;
            (informations.idMethode == "EMP") ? lieu = '<div class="i_adresse_detail_adresse">Lieu :  <span class="info_client">sur place</span></div>' : lieu = info_lieu ;

            let liste_finale = "<div class='i_titre_detail'>Détails de la commande <span class='id_client_detail'>" + informations.idCom + "</span> :</div><br><div class='i_aliments_detail' id='c_aliments_detail_" + identifiant + "'>" ;
            for (let i=0 ; i< data.length ; i++){
                liste_finale += "<div class='i_ligne_aliment c_ligne_aliment'><div class='titre_aliment'>○ " + data[i]["produit"] + "</div><div class=quantite_aliment>x&ensp;" + data[i]["quantite"] + "</div></div>";
                nbr_lignes += "14% " ;
            }
            liste_finale += '</div><div class="i_commentaire_detail">Commentaire : <br><span class="info_com">' + info_commentaire + '</span></div><div class="i_heure_detail">Heure passée : <span class="info_client">' + informations.dateCom + '</span></div>' + lieu + '</div>';
                            
            document.getElementById(identifiant).innerHTML = liste_finale;
            document.getElementById("c_aliments_detail_" + identifiant).style.gridTemplateRows = nbr_lignes ;
        })
    }

    const elements_afaire = (elem) => {
        let taille = "12% ";
        let nbr_lignes_afaire = "12% " ;
        let type_couleur, bg_bouton ;
        (compteur_afaire%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_afaire++ ;
        (elem.idMethode == "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        blogs.filter(element => element.idEtat === "AFA").map(aliment => nbr_lignes_afaire += taille) ;
        document.getElementById("cadre_afaire").style.gridTemplateRows = nbr_lignes_afaire ;

        return (
            <div className="i_commande c_commande" id={elem.idClient} onMouseOver={() => nouveau_bg(elem.idClient)} onMouseLeave={() => ancien_bg(elem.idClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "afaire")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.hLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => ajouter_commandes(elem.idCom, "ENC")}>OK</button>
                </div> 
            </div>
        )
    }

    const elements_encours = (elem) => {
        let taille = "12% ";
        let  nbr_lignes_encours = "12% ";
        let type_couleur, bg_bouton ;
        (compteur_encours%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_encours++ ;
        (elem.idMethode == "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        blogs.filter(element => element.idEtat === "ENC").map(aliment => nbr_lignes_encours += taille) ;
        document.getElementById("cadre_encours").style.gridTemplateRows = nbr_lignes_encours ;

        return (
            <div className="i_commande c_commande" id={elem.idClient} onMouseOver={() => nouveau_bg(elem.idClient)} onMouseLeave={() => ancien_bg(elem.idClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "encours")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.hLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => ajouter_commandes(elem.idCom, "ENV")}>OK</button>
                </div> 
            </div>
        )
    }

    const elements_envoye = (elem) => {
        let taille = "12% ";
        let nbr_lignes_envoye = "12% " ;
        let type_couleur, bg_bouton ;
        (compteur_envoye%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur_envoye++ ;
        (elem.idMethode == "EMP") ? bg_bouton = "couleur_surplace" : bg_bouton = type_couleur ;

        blogs.filter(element => element.idEtat === "ENV").map(aliment => nbr_lignes_envoye += taille) ;
        document.getElementById("cadre_envoye").style.gridTemplateRows = nbr_lignes_envoye ;

        return (
            <div className="i_commande c_commande" id={elem.idClient} onMouseOver={() => nouveau_bg(elem.idClient)} onMouseLeave={() => ancien_bg(elem.idClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => load_panier(elem, "envoye")}>
                    <div className={`i_nom ${type_couleur}`}>{elem.prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{elem.gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{elem.prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{elem.hLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => supprimer_commandes(elem.idCom)}>OK</button>
                </div> 
            </div>
        )
    }

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
                    {blogs && blogs.filter(element => element.idEtat === "AFA").map(elements_afaire)}
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
                    {blogs && blogs.filter(element => element.idEtat === "ENC").map(elements_encours)}
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
                    {blogs && blogs.filter(element => element.idEtat === "ENV").map(elements_envoye)}
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
