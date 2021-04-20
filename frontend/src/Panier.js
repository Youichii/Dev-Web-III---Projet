import {useEffect, useState} from "react" ;
import Axios from 'axios'

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

                                            
    const [client, setClient] = useState([{"adresse": "rue coucou tout le monde", "numero": 10, "ville": "Meux", "postal":1000}]) ;

    const [heures, setHeures] = useState([]);

    const [total, setTotal] = useState(0);
    //const [compteur, setCompteur] =  useState(1);
    let compteur = 1 ;
    const [type_couleur, setTypeCouleur] =  useState("couleur_bg1");


    const recuperer_utilisateur = () => {
        Axios.post('http://localhost:3001/api/insert', {
            identifiant : "2",
        }).then(() => {
            console.log("Hello")
        })
    }

    const ajouter_commande = () => {
        Axios.post('http://localhost:3001/api/insert', {
            table : "encours",
            commande : "1001",
        }).then(() => {
            console.log("Hello")
        })
    }

    const supprimer_commande = () => {
        Axios.post('http://localhost:3001/api/insert', {
            table : "afaire",
            commande : "1001",
        }).then(() => {
            console.log("Hello")
        })
    }

    const recuperer_panier = () => {
        Axios.post('http://localhost:3001/api/insert', {
            identifiantClient : "4",
        }).then(() => {
            console.log("Hello")
        })
    }

    const modifier_quantite = () => {
        Axios.post('http://localhost:3001/api/insert', {
            idCommande : "1002",
            quantite : "2"
        }).then(() => {
            console.log("Hello")
        })
    }

    useEffect(() => {
        const intermediaire = [] ;
        let min = 1080 ; //18h
        let max = 1440 ; //00h

        for (var i = min; i < max; i+=15) {
            var minutes = i ;
            var nbHour = parseInt(minutes / 60);
            var nbminuteRestante = (minutes % 60);
            if(nbminuteRestante == 0){   
                intermediaire.push(({"h" : nbHour.toString(), "m" : "00"}));
            }
            else{
                intermediaire.push(({"h" : nbHour.toString(), "m" : nbminuteRestante.toString()}));
            }
        }
        setHeures(intermediaire);

        let total = 0 ;
        aliments.map(x => total+=x["quantite"]*x["prix_unite"]);
        setTotal(total) ;
    }, []);

    const changer_prix = (id_prix) => {
        let information ;
        for (var i = 0; i < aliments.length; i++) {
            if (aliments[i]["id"] == id_prix) {
                information = aliments[i] ;
                break ;
            }
        }
        
        document.getElementById(id_prix).innerHTML = document.getElementById(id_prix + "_input").value * information["prix_unite"] + " €";
        information["quantite"] = Number(document.getElementById(id_prix + "_input").value);
        let total = 0 ;
        aliments.map(x => total+=x["quantite"]*x["prix_unite"]);
        setTotal(total) ;
    }

    const incrementer = (identifiant) => {
        let valeur = Number(document.getElementById(identifiant + "_input").value)
        document.getElementById(identifiant + "_input").value = valeur + 1;
        changer_prix(identifiant);
    }

    const decrementer = (identifiant) => {
        let valeur = Number(document.getElementById(identifiant + "_input").value)
        document.getElementById(identifiant + "_input").value = valeur - 1;
        changer_prix(identifiant);
    }

    const afficher_adresse = () => {
	    document.getElementById('zone_adresse').style.display = "inline" ; 
    }

    const cacher_adresse = () => {
        document.getElementById('zone_adresse').style.display = "none" ; 
    }
    
    const valider_panier = () => {
        document.getElementById('i_grise_etape1').style.display= "none";
        document.getElementById('i_grise_etape2').style.display= "inline";
        
        document.getElementById('i_ligne_avant_1').style.borderColor= "#414141";
        document.getElementById('i_numero_1').style.backgroundColor= "#414141";
        document.getElementById('i_ligne_apres_1').style.borderColor= "#414141";
        
        document.getElementById('i_ligne_avant_2').style.borderColor= "white";
        document.getElementById('i_numero_2').style.backgroundColor= "#A18C7B";
        document.getElementById('i_ligne_apres_2').style.borderColor= "white";
    }
    
    const annuler_panier = () => {
        console.log("annuler_panier");
    }
    const valider_info = () => {
        console.log("valider_info");
    }
    const annuler_info = () => {
        document.getElementById('i_grise_etape2').style.display= "none";
        document.getElementById('i_grise_etape1').style.display= "inline";
        
        document.getElementById('i_ligne_apres_1').style.borderColor= "white";
        document.getElementById('i_numero_1').style.backgroundColor= "#A18C7B";
        document.getElementById('i_ligne_avant_1').style.borderColor= "white";
    
        document.getElementById('i_ligne_avant_2').style.borderColor= "#414141";
        document.getElementById('i_numero_2').style.backgroundColor= "#414141";
        document.getElementById('i_ligne_apres_2').style.borderColor= "#414141";
    }

    const affichage_aliments = (element) => {
        let type_couleur ;
        (compteur%2 == 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur++ ;

        return (
            <div className='c_info_ligne i_info_ligne'> 
                <div className={`i_nom_aliment ${type_couleur}`}>{element.nom}</div> 
                <div className={`i_quantite_aliment c_quantite_aliment  ${type_couleur}`}> 
                    <button className='bouton_moins incrementeur' onClick={() => decrementer(element.id)} >-</button> 
                    <input id={`${element.id}_input`} className='nombre_aliment' type='number' value={element.quantite} onChange={() => changer_prix(element.id)} min='0' max='100' />
                    <button className='bouton_plus incrementeur' onClick={() => incrementer(element.id)}>+</button>
                </div> 
                <div id={element.id} className={`i_prix_aliment ${type_couleur}`}>{element.prix_unite*element.quantite}{" €"}</div> 
            </div>
        )
    }



    return (
        <div className="panier">
            <div id="i_grise_etape1">Courage,<br />vous y êtes presque !</div>
			<div id="i_grise_etape2">Plus qu'un clic,<br />et c'est parti !</div>

            <div className="i_avancement c_avancement">
				<div id="i_ligne_avant_1"></div>
				<div id="i_numero_1">1</div>
				<div id="i_ligne_apres_1"></div>
				<div id="i_ligne_avant_2"></div>
				<div id="i_numero_2">2</div>
				<div id="i_ligne_apres_2"></div>
			</div>

            <div className="c_info_panier i_info_panier">
                <div className="c_titres_panier i_titres_panier">
					<div className="i_titre_produit titres">Produit</div>
					<div className="i_titre_quantite titres" id="titre_qtite">Quantité</div>
					<div className="i_titre_prix titres">Prix</div>
				</div>
			
				<div className="i_info_aliments c_info_aliments" id="info_aliments">
                    {aliments.map(affichage_aliments)}
				</div>
                <div className="c_cadre_total i_cadre_total">
                    <div id='prix_total' className='i_prix_total'>{total}{" €"}</div>
                </div>
			</div>

            <div className="i_boutons1 c_boutons1">
				<div className="i_bouton_envoyer1" id="elem_bouton_envoyer1">
					<input id="bouton_envoyer1" name="bout_envoyer1" type="button" value="Suivant" onClick={valider_panier} />
				</div>
				
				<div className="i_bouton_annuler1" id="elem_bouton_annuler1">
					<input id="bouton_annuler1" name="bout_annuler1" type="button" value="Annuler" onClick={annuler_panier} />
				</div>
			</div>

            <div className="c_info_reception i_info_reception">
				<div className="i_heure" id="elem_heure">
					<label for="heure_livraison">Heure</label><br />
					<div id="heure_livraison">
                        <select name="heures_reserv" id="heures_reserv">
                            {heures.map(heure => (
                                <option value={heure.h, ":", heure.m}>{heure.h}{":"}{heure.m}</option>
                            ))}
                        </select>
                    </div>								
				</div>

                <div className="i_apres_heure"></div>

				<div className="i_moy_reception">
					<label for="moyen_reception">Moyen de réception</label><br />
					<div className="c_reception">
						<div className="i_place" id="radio_place">
							<input type="radio" name="myradio1" value="femme" id="place" onClick={cacher_adresse} />
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
					<label for="mode_payement">Mode de payement</label><br />
					<div className="i_mode_payement c_mode_payement">
						<div class="i_liquide" id="radio_liquide">
							<input type="radio" name="myradio2" value="femme" id="liquide" />
							<label for="liquide" className="label-info">Liquide</label>
						</div>
						<div className="i_mistercash" id="radio_mistercash">
							<input type="radio" name="myradio2" value="homme" id="mistercash" />
							<label for="mistercash" className="label-info">Mistercash</label>
						</div>
					</div>
				</div>
				
                <div class="i_apres_payement"></div>
                
                {client.map(info => (
                    <div className="i_adresse c_adresse" id="zone_adresse">
                        <div className="i_adresse_livraison"> 
                            <label for="adresse_livraison">Adresse de livraison</label><br /> 
                            <input id="adresse_livraison" name="add_livraison" type="text" placeholder={info.adresse} /> 
                        </div> 
                        <div className="i_numero_maison"> 
                            <label for="numero_maison">Numéro</label><br /> 
                            <input id="numero_maison" name="num_maison" type="number" placeholder={info.numero} /> 
                        </div> 
                        <div className="i_code_postal"> 
                            <label for="code_postal">Code postal</label><br /> 
                            <input id="code_postal" name="num_postal" type="number" placeholder={info["postal"]} /> 
                        </div> 
                        <div className="i_ville"> 
                            <label for="ville">Ville</label><br /> 
                            <input id="ville" name="nom_ville" type="text" placeholder={info["ville"]} /> 
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
					<input id="bouton_envoyer2" name="bout_envoyer2" type="button" value="Valider" onClick={valider_info} />
				</div>
				
				<div className="i_bouton_annuler2" id="elem_bouton_annuler2">
					<input id="bouton_annuler2" name="bout_annuler2" type="button" value="Retour" onClick={annuler_info} />
				</div>
			</div>

        </div>
    );
}

export default Panier;
