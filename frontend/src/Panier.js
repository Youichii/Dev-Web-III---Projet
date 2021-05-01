import {useEffect, useState} from "react" ;
import "./panier.css";

const Panier = () => {
    const [heures, setHeures] = useState([]);

    const [total, setTotal] = useState(0);
    let compteur = 1 ;
    let identifiantClient = 7 ;
    let id_commande = 1 ;
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
            
            const intermediaire = [] ;
            let min = 1080 ; //18h
            let max = 1440 ; //00h
            for (var minutes = min; minutes < max; minutes+=15) {
                var nbHour = parseInt(minutes / 60);
                var nbminuteRestante = (minutes % 60);
                let heure_finale ;

                (nbminuteRestante === 0 ) ? heure_finale = "00" : heure_finale =  nbminuteRestante.toString();
                if ( data.filter(elem => elem.hLivree === (nbHour.toString() + ":" + heure_finale)).length === 0 ){ 
                    intermediaire.push(({"h" : nbHour.toString(), "m" : heure_finale}));
                }
            }
            setHeures(intermediaire);
        })
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
            let total = 0 ;
            data.map(x => total+=x["quantite"]*x["prix"]);
            setTotal(total.toFixed(2)) ;
            
            let nbr_lignes = ""
            for (let i = 0 ; i<data.length ; i++) {
                nbr_lignes += "45px " ;
            }
            document.getElementsByClassName("c_info_aliments")[0].style.gridTemplateRows = nbr_lignes ;
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
        let heure_selectionnee = document.getElementById('heures_reserv').value ;
        let typeCommande, commentaire_client, rue, numero, postal, ville ;
        (document.getElementById("commentaire").value == "") ? commentaire_client = null : commentaire_client = document.getElementById("commentaire").value;
        (document.getElementsByName("myradio1")[0].checked == true) ? typeCommande= "EMP" : typeCommande = "LIV";

        if (typeCommande == "EMP") {
            rue = null ;
            numero = null ;
            postal = null ;
            ville = null ;
        }
        else {
            (document.getElementById('adresse_livraison').value == "") ? rue = document.getElementById('adresse_livraison').placeholder : rue = document.getElementById('adresse_livraison').value ;
            (document.getElementById('numero_maison').value == "") ? numero = document.getElementById('numero_maison').placeholder : numero = document.getElementById('numero_maison').value ;
            (document.getElementById('code_postal').value == "") ? postal = document.getElementById('code_postal').placeholder : postal = document.getElementById('code_postal').value ;
            (document.getElementById('ville').value == "") ? ville = document.getElementById('ville').placeholder : ville = document.getElementById('ville').value ;
        }
        
        var myInit = { method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : id_commande, methode : typeCommande, commentaire : commentaire_client, hSelec : heure_selectionnee, rue : rue, numero : numero, postal : postal, ville : ville})
        };
        fetch(`http://localhost:3001/api/orders`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
            supprimer_commande() ;
            console.log("ok");
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
        let information = donnees_panier.filter(element => element.idProd == id_produit)[0];
        
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
                <div className={`i_nom_aliment ${type_couleur}`}>{element.produit}</div> 
                <div class="aliment_barre" id={element.idProd}><hr /></div>
                <div className={`i_quantite_aliment c_quantite_aliment  ${type_couleur}`}> 
                    <button className='bouton_moins incrementeur' onClick={() => modifier_quantite(element.idCom, element.idProd, element.quantite,"moins")} >-</button> 
                    <input id={`${element.idCom}${element.idProd}`} className='nombre_aliment' type='number' value={element.quantite} readonly="readonly" />
                    <button className='bouton_plus incrementeur' onClick={() => modifier_quantite(element.idCom, element.idProd, element.quantite, "plus")}>+</button>
                </div> 
                <div id={`${element.idCom}${element.idProd}total`} className={`i_prix_aliment ${type_couleur}`}>{(element.prix*element.quantite).toFixed(2)}{" €"}</div> 
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
					<input id="bouton_annuler1" name="bout_annuler1" type="button" value="Annuler" onClick={supprimer_commande} />
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
                            <input id="adresse_livraison" name="add_livraison" type="text" placeholder={info.rue} /> 
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
