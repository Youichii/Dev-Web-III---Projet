import {useEffect, useState} from "react" ;

const Panier = () => {
    const [aliments, setAliments] = useState([{"id" : "A", "nom" : "poulet", "quantite" : 2, "prix_unite" : 5}, 
                                            {"id" : "B", "nom" : "viande", "quantite" : 7, "prix_unite" : 8}, 
                                            {"id" : "C", "nom" : "clem", "quantite" : 9, "prix_unite" : 260},
                                            {"id" : "D", "nom" : "poulet", "quantite" : 2, "prix_unite" : 5}, 
                                            {"id" : "E", "nom" : "viande", "quantite" : 7, "prix_unite" : 8}, 
                                            {"id" : "F", "nom" : "clem", "quantite" : 9, "prix_unite" : 260},
                                            {"id" : "G", "nom" : "poulet", "quantite" : 2, "prix_unite" : 5}, 
                                            {"id" : "H", "nom" : "viande", "quantite" : 7, "prix_unite" : 8}, 
                                            {"id" : "I", "nom" : "clem", "quantite" : 9, "prix_unite" : 260}]);

                                            
    const [heures, setHeures] = useState([]);

    const [total, setTotal] = useState(0);
    let compteur = 1 ;
    let identifiantClient = 2 ;
    let id_commande = 1000 ;
    const [donnees_panier, setDonneesPanier] =  useState(null);
    const [donnees_adresse, setDonneesAdresse] =  useState(null);

    useEffect(() => {
        recuperer_utilisateur();
        recuperer_panier();

        var myInit = { method: 'GET',
                headers: {'Content-Type': 'application/json'},
        };
        fetch(`http://localhost:3001/api/hours`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let liste_heures_prises = data.map(heure => heure.heure_reservee);
            const intermediaire = [] ;
            let min = 1080 ; //18h
            let max = 1440 ; //00h
            for (var i = min; i < max; i+=15) {
                var minutes = i ;
                var nbHour = parseInt(minutes / 60);
                var nbminuteRestante = (minutes % 60);
                let heure_finale ;
                (nbminuteRestante === 0 ) ? heure_finale = "00" : heure_finale =  nbminuteRestante.toString();
                if ( liste_heures_prises.indexOf(("heure : ", nbHour.toString() + ":" + heure_finale).toString()) == 0 ) {
                    console.log("occupée");
                }
                else {   
                    intermediaire.push(({"h" : nbHour.toString(), "m" : heure_finale}));
                }

            }
            setHeures(intermediaire);
        })

        let total = 0 ;
        aliments.map(x => total+=x["quantite"]*x["prix_unite"]);
        setTotal(total) ;
    }, []);

    const recuperer_panier = () => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch(`http://localhost:3001/api/orders/users/${identifiantClient}`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setDonneesPanier(data);
        })
    }

    const recuperer_utilisateur = () => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch(`http://localhost:3001/api/users/${identifiantClient}`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setDonneesAdresse(data);
        })
    }

    const ajouter_commande = () => {
        let typeCommande ;
        let commentaire_client = document.getElementById("commentaire").value;
        (document.getElementsByName("myradio1")[0].checked == true) ? typeCommande= "emporter" : typeCommande = "livrer";
        var myInit = { method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : id_commande, type : typeCommande, commentaire : commentaire_client})
        };
        fetch(`http://localhost:3001/api/orders`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            supprimer_commande() ;
        })
    }

    const supprimer_commande = () => {
        var myInit = { method: 'DELETE',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : id_commande})
        };
        fetch(`http://localhost:3001/api/orders`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("supprimer ok");
        })
    }

    const supprimer_panier = () => {
        var myInit = { method: 'DELETE',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : id_commande})
        };
        fetch(`http://localhost:3001/api/orders/del`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            supprimer_commande() ;
        })
    }

    const modifier_quantite = (id_commande, id_produit, qtite, calcul) => {
        let nouvelle_qtite ;
        (calcul === "moins") ? nouvelle_qtite = qtite-1 : nouvelle_qtite = qtite + 1 ;
        var myInit = { method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({ idCommande : id_commande, idProduit : id_produit, quantite : nouvelle_qtite})
        };

        if ((nouvelle_qtite <= 100) && (nouvelle_qtite >= 0)) {
            fetch(`http://localhost:3001/api/orders/foods`, myInit)
            .then(res => {
                return res.json();
            })
            .then(data => {
                document.getElementById(String(id_commande) + String(id_produit)).value = nouvelle_qtite;
                changer_prix(id_produit, String(id_commande) + String(id_produit));
            })
            if (nouvelle_qtite === 0) {
                console.log("passe bien ici");
                document.getElementById(id_produit).style.display = "inline";
            }
            else if (nouvelle_qtite === 1) {
                console.log("passe bien ici");
                document.getElementById(id_produit).style.display = "none";
            }
        }
    }

    const changer_prix = (id_produit, id_prix) => {
        let information = donnees_panier.filter(element => element.idProduit == id_produit)[0];
        
        document.getElementById(id_prix + "total").innerHTML = document.getElementById(id_prix).value * information.prix + " €";
        information.quantite = Number(document.getElementById(id_prix).value);
        let total = 0 ;
        donnees_panier.map(aliment => total+=aliment.quantite*aliment.prix);
        setTotal(total) ;
    }

    const afficher_adresse = () => {
	    document.getElementById('zone_adresse').style.display = "grid" ; 
    }

    const cacher_adresse = () => {
        document.getElementById('zone_adresse').style.display = "none" ; 
    }
    
    const valider_panier = () => {
        document.getElementById('i_grise_etape1').style.display= "none";
        document.getElementById('i_grise_etape2').style.display= "inline";
        
        document.getElementById('i_ligne_avant_1').style.borderColor= "#414141";
        document.getElementById('i_numero_1').style.backgroundColor= "#414141";
        //document.getElementById('i_ligne_apres_1').style.borderColor= "#414141";
        
        document.getElementById('i_ligne_avant_2').style.borderColor= "white";
        document.getElementById('i_numero_2').style.backgroundColor= "#A18C7B";
        //document.getElementById('i_ligne_apres_2').style.borderColor= "white";
    }

    const annuler_info = () => {
        document.getElementById('i_grise_etape2').style.display= "none";
        document.getElementById('i_grise_etape1').style.display= "inline";
        
        //document.getElementById('i_ligne_apres_1').style.borderColor= "white";
        document.getElementById('i_numero_1').style.backgroundColor= "#A18C7B";
        document.getElementById('i_ligne_avant_1').style.borderColor= "white";
    
        document.getElementById('i_ligne_avant_2').style.borderColor= "#414141";
        document.getElementById('i_numero_2').style.backgroundColor= "#414141";
        //document.getElementById('i_ligne_apres_2').style.borderColor= "#414141";
    }

    const affichage_aliments = (element) => {
        let type_couleur ;
        (compteur%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur++ ;

        return (
            <div className='c_info_ligne i_info_ligne'> 
                <div className={`i_nom_aliment ${type_couleur}`}>{element.nomProduit}</div> 
                <div class="aliment_barre" id={element.idProduit}><hr /></div>
                <div className={`i_quantite_aliment c_quantite_aliment  ${type_couleur}`}> 
                    <button className='bouton_moins incrementeur' onClick={() => modifier_quantite(element.idCommande, element.idProduit, element.quantite,"moins")} >-</button> 
                    <input id={`${element.idCommande}${element.idProduit}`} className='nombre_aliment' type='number' value={element.quantite} readonly="readonly" />
                    <button className='bouton_plus incrementeur' onClick={() => modifier_quantite(element.idCommande, element.idProduit, element.quantite, "plus")}>+</button>
                </div> 
                <div id={`${element.idCommande}${element.idProduit}total`} className={`i_prix_aliment ${type_couleur}`}>{element.prix*element.quantite}{" €"}</div> 
            </div>
        )
    }

    return (
        <div className="panier">
            <div id="i_grise_etape1">Courage,<br />vous y êtes presque !</div>
			<div id="i_grise_etape2">Plus qu'un clic,<br />et c'est parti !</div>

            <div className="i_avancement1 c_avancement1">
				<div id="i_ligne_avant_1"></div>
				<div id="i_numero_1">1</div>
			</div>

            <div className="i_avancement2 c_avancement2">
                <div id="i_ligne_avant_2"></div>
				<div id="i_numero_2">2</div>
			</div>

            <div className="c_info_panier i_info_panier">
                <div className="c_titres_panier i_titres_panier">
					<div className="i_titre_produit titres">Produit</div>
					<div className="i_titre_quantite titres" id="titre_qtite">Quantité</div>
					<div className="i_titre_prix titres">Prix</div>
				</div>
			
				<div className="i_info_aliments c_info_aliments" id="info_aliments">
                    {donnees_panier && donnees_panier.map(affichage_aliments)}
				</div>

                <div className="c_cadre_total i_cadre_total">
                <div className="i_titre_total">Total</div>
                    <div id='prix_total' className='i_prix_total'>{total}{" €"}</div>
                </div>
			</div>

            <div className="i_boutons1 c_boutons1">
				<div className="i_bouton_envoyer1" id="elem_bouton_envoyer1">
					<input id="bouton_envoyer1" name="bout_envoyer1" type="button" value="Suivant" onClick={valider_panier} />
				</div>
				
				<div className="i_bouton_annuler1" id="elem_bouton_annuler1">
					<input id="bouton_annuler1" name="bout_annuler1" type="button" value="Annuler" onClick={supprimer_panier} />
				</div>
			</div>

            <div className="c_info_reception i_info_reception">
				<div className="i_heure" id="elem_heure">
					<label class="label_informations" for="heure_livraison">Heure</label><br />
					<div id="heure_livraison">
                        <select className="decorated" name="heures_reserv" id="heures_reserv">
                            {heures.map(heure => (
                                <option class="choix_heure" value={`${heure.h}:${heure.m}`}>{heure.h}{":"}{heure.m}</option>
                            ))}
                        </select>
                    </div>								
				</div>

                <div className="i_apres_heure"></div>

				<div className="i_moy_reception">
					<label class="label_informations" for="moyen_reception">Moyen de réception</label><br />
					<div className="c_reception">
						<div className="i_place" id="radio_place">
							<input type="radio" name="myradio1" value="femme" id="place" onClick={cacher_adresse} checked />
							<label for="place" className="label-info">A emporter</label>
						</div>
						<div className="i_livrer" id="radio_livrer">
							<input type="radio" name="myradio1" value="homme" id="livrer" onClick={afficher_adresse}/>
							<label for="livrer" className="label-info">A livrer</label>
						</div>
					</div>
				</div>

                <div className="i_apres_reception"></div>
				
				<div className="i_payement">
					<label class="label_informations" for="mode_payement">Mode de payement</label><br />
					<div className="i_mode_payement c_mode_payement">
						<div class="i_liquide" id="radio_liquide">
							<input type="radio" name="myradio2" value="femme" id="liquide" />
							<label for="liquide" className="label-info">Liquide</label>
						</div>
						<div className="i_mistercash" id="radio_mistercash">
							<input type="radio" name="myradio2" value="homme" id="mistercash" checked/>
							<label for="mistercash" className="label-info">Mistercash</label>
						</div>
					</div>
				</div>
				
                <div class="i_apres_payement"></div>
                
                {donnees_adresse && donnees_adresse.map(info => (
                    <div className="i_adresse c_adresse" id="zone_adresse">
                        <div className="i_adresse_livraison"> 
                            <label class="label_adresse" for="adresse_livraison">Adresse de livraison</label><br /> 
                            <input id="adresse_livraison" name="add_livraison" type="text" placeholder={info.address} /> 
                        </div> 
                        <div className="i_numero_maison"> 
                            <label class="label_adresse" for="numero_maison">Numéro</label><br /> 
                            <input id="numero_maison" name="num_maison" type="number" placeholder={info.numero} /> 
                        </div> 
                        <div className="i_code_postal"> 
                            <label class="label_adresse" for="code_postal">Code postal</label><br /> 
                            <input id="code_postal" name="num_postal" type="number" placeholder={info.postal} /> 
                        </div> 
                        <div className="i_ville"> 
                            <label class="label_adresse" for="ville">Ville</label><br /> 
                            <input id="ville" name="nom_ville" type="text" placeholder={info.ville} /> 
                        </div> 
                    </div>
                ))}
				
			</div>

            <div className="i_commentaire" id="elem_commentaire">
				<label for="commentaire" id="titre_elem_commentaire">Commentaire</label><br />
				<textarea placeholder="Texte prédéfini" id="commentaire" wrap="hard"></textarea>
			</div>

			<div className="i_boutons2 c_boutons2">
				<div className="i_bouton_envoyer2" id="elem_bouton_envoyer2">
					<input id="bouton_envoyer2" name="bout_envoyer2" type="button" value="Valider" onClick={() => ajouter_commande()} />
				</div>
				
				<div className="i_bouton_annuler2" id="elem_bouton_annuler2">
					<input id="bouton_annuler2" name="bout_annuler2" type="button" value="Retour" onClick={annuler_info} />
				</div>
			</div>
        </div>
    );
}

export default Panier;
