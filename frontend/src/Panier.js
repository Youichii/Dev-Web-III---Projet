import {useEffect, useState} from "react" ;
import BoutonPanier from './components/BoutonPanier';
import AdresseCommande from './components/AdresseCommande';
import BoutonRadio from './components/BoutonRadio';
import Axios from "axios";
import BanniereBasique from './components/BanniereBasique.js';
import BanniereConnection from './components/BanniereConnection.js';
import PiedPage from './components/PiedPage.js';

const Panier = () => {
    require('./css/panier.css');
    Axios.defaults.withCredentials = true;

    const [heures, setHeures] = useState([]);
    const [total, setTotal] = useState(0);
    let compteur = 1 ;
    const [donnees_panier, setDonneesPanier] =  useState(null);
    const [donnees_adresse, setDonneesAdresse] =  useState(null);
    const [IDCommande, setIdCommande]= useState("");
    let utilisateur = 100000000000;
    let id_commande =  100000000000;
    const [statutConnexion, setStatutConnexion] = useState(false);
	const [utilisateurCON, setUtilisateur] = useState(10000000000);


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
                utilisateur = reponse.data.user[0].IdClient;

                recupererUtilisateur();
                recupererPanier();
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
     * Permet de créer une liste contenant les heures encore disponibles pour passer commande
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(() => {
        var myInit = { method: 'GET',
                headers: {'Content-Type': 'application/json'},
        };
        fetch(`/api/hours`, myInit)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            const intermediaire = [] ;
            let min = 1080 ; //18h
            let max = 1440 ; //00h
            for (var minutes = min; minutes < max; minutes+=15) {
                var nbHeures = parseInt(minutes / 60);
                var nbminuteRestante = (minutes % 60);
                let heure_finale ;

                (nbminuteRestante === 0 ) ? heure_finale = "00" : heure_finale =  nbminuteRestante.toString();
                if ( donnees.filter(elem => elem.HLivree === (nbHeures.toString() + ":" + heure_finale)).length === 0 ){ 
                    intermediaire.push(({"h" : nbHeures.toString(), "m" : heure_finale}));
                }
            }
            setHeures(intermediaire);
        })
    }, []);


    /**
     * Récupére les différents éléments du panier du client connecté, et stocke les informations dans différentes variables
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const recupererPanier = () => {
        var info = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch(`/api/orders/users/${utilisateur}`, info)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            id_commande = donnees[0].IdCommande;
            setIdCommande(donnees[0].IdCommande);

            var myInit = { method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            fetch(`/api/orders/${id_commande}`, myInit)
            .then(res => {
                return res.json();
            })
            .then(donnees => {
                setDonneesPanier(donnees);
                let total = 0 ;
                donnees.map(x => total+=x["Quantite"]*x["Prix"]);
                setTotal(total.toFixed(2)) ;
                
                let nbr_lignes = ""
                for (let i = 0 ; i<donnees.length ; i++) {
                    nbr_lignes += "45px " ;
                }
                document.getElementsByClassName("c_info_aliments")[0].style.gridTemplateRows = nbr_lignes ;
            })
        })
    }


    /**
     * Récupère le mail, la rue, le numéro de maison, le ZIP et la ville de l'utilisateur connecté, et stocke ces informations
     * dans une variable
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const recupererUtilisateur = () => {
        var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch(`/api/users/${utilisateur}/address`, myInit)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            setDonneesAdresse(donnees);
        })
    }


     /**
     * Ajoute la commande du panier dans les commandes à faire du restaurant, avec les informations nécessaires
     * Envoie également un mail pour valider la commande
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const ajouterCommande = () => {
        let heure_selectionnee = document.getElementById('heures_reserv').value ;
        let typeCommande, commentaire_client, rue, numero, postal, ville, payement ;
        (document.getElementById("commentaire").value === "") ? commentaire_client = null : commentaire_client = document.getElementById("commentaire").value;
        (document.getElementsByName("myradio1")[0].checked === true) ? typeCommande= "EMP" : typeCommande = "LIV";
        (document.getElementsByName("myradio2")[0].checked === true) ? payement= 1 : payement = 0;

        if (typeCommande === "EMP") {
            rue = null ;
            numero = null ;
            postal = null ;
            ville = null ;
        }
        else {
            (document.getElementById('adresse_livraison').value === "") ? rue = document.getElementById('adresse_livraison').placeholder : rue = document.getElementById('adresse_livraison').value ;
            (document.getElementById('numero_maison').value === "") ? numero = document.getElementById('numero_maison').placeholder : numero = document.getElementById('numero_maison').value ;
            (document.getElementById('code_postal').value === "") ? postal = document.getElementById('code_postal').placeholder : postal = document.getElementById('code_postal').value ;
            (document.getElementById('ville').value === "") ? ville = document.getElementById('ville').placeholder : ville = document.getElementById('ville').value ;
        }

        var myInit = { method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : IDCommande, methode : typeCommande, commentaire : commentaire_client, hSelec : heure_selectionnee, rue : rue, numero : numero, postal : postal, ville : ville, typePayement : payement})
        };
        fetch(`/api/orders`, myInit)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            fetch ("/api/valider_commande",{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({prenom : donnees_adresse[0].Prenom, mail:donnees_adresse[0].Mail, commande:donnees_panier, heure:document.getElementById('heures_reserv').value})
            })
            .then((res)=> {
                return res;
            })
            .then (()=>{
                console.log("mail envoye");
            });
        })
    }


    /**
     * Permet de supprimer une commande complète
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const supprimerCommande = () => {
        var myInit = { method: 'DELETE',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({commande : id_commande})
        };
        fetch(`/api/orders`, myInit)
        .then(res => {
            return res.json();
        })
        .then(donnees => {
            console.log("supprimer ok");
        })
    }


    /**
     * Vérifie si l'utilisateur est connecté au chargement de la page
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {number} id_commande identifiant de la commande du client connecté
     * @param {number} id_produit  identifiant du produit pour lequel il faut modifier la quantité
     * @param {number} qtite       quantité actuelle
     * @param {string} calcul      type de calcul à appliquer sur la quantité actuelle ; moins ou plus
     */
    const modifierQuantite = (id_commande, id_produit, qtite, calcul) => {
        let nouvelle_qtite ;
        (calcul === "moins") ? nouvelle_qtite = qtite-1 : nouvelle_qtite = qtite+1 ;
        var myInit = { method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({quantite : nouvelle_qtite})
        };

        if ((nouvelle_qtite <= 100) && (nouvelle_qtite >= 0)) {
            fetch(`/api/orders/${id_commande}/foods/${id_produit}`, myInit)
            .then(res => {
                return res.json();
            })
            .then(donnees => {
                document.getElementById(String(id_commande) + String(id_produit)).value = nouvelle_qtite;
                changerPrix(id_produit, String(id_commande) + String(id_produit));
            })
            if (nouvelle_qtite === 0) {
                document.getElementById(id_produit).style.display = "inline";
            }
            else if (nouvelle_qtite === 1) {
                document.getElementById(id_produit).style.display = "none";
            }
        }
    }


    /**
     * Permet de supprimer une commande complète
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {number} id_produit  identifiant du produit pour lequel il faut modifier la quantité
     * @param {string} id_prix     identifiant du div dans lequel il faut afficher le nouveau prix du produit selon la quantité
     */
    const changerPrix = (id_produit, id_prix) => {
        let information = donnees_panier.filter(element => element.IdProduit === id_produit)[0];
        
        document.getElementById(id_prix + "total").innerHTML = document.getElementById(id_prix).value * information.Prix + " €";
        information.Quantite = Number(document.getElementById(id_prix).value);
        let total = 0 ;
        donnees_panier.map(aliment => total+=aliment.Quantite*aliment.Prix);
        setTotal(total) ;
    }


    /**
     * Affiche les informations concernant l'adresse du client
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const afficherAdresse = () => {
	    document.getElementById('zone_adresse').style.display = "grid" ; 
    }


    /**
     * Masque les informations concernant l'adresse du client
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const cacherAdresse = () => {
        document.getElementById('zone_adresse').style.display = "none" ; 
    }
    

    /**
     * Valide la première partie de la commande pour passer à la seconde partie, concernant les informations
     * d'heure, de payement, de livraison et de payement
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const validerPanier = () => {
        document.getElementById('i_grise_etape1').style.display= "none";
        document.getElementById('i_grise_etape2').style.display= "inline";
        document.getElementById('i_ligne_avant_1').style.borderColor= "#414141";
        document.getElementById('i_numero_1').style.backgroundColor= "#414141";
        document.getElementById('i_ligne_avant_2').style.borderColor= "white";
        document.getElementById('i_numero_2').style.backgroundColor= "#A18C7B";
    }


    /**
     * Annule la seconde partie de la commande pour revenir à la première partie, concernant les informations
     * de la commande et le commentaire éventuel
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const annulerInfo = () => {
        document.getElementById('i_grise_etape2').style.display= "none";
        document.getElementById('i_grise_etape1').style.display= "inline";
        document.getElementById('i_numero_1').style.backgroundColor= "#A18C7B";
        document.getElementById('i_ligne_avant_1').style.borderColor= "white";
        document.getElementById('i_ligne_avant_2').style.borderColor= "#414141";
        document.getElementById('i_numero_2').style.backgroundColor= "#414141";
    }


    /**
     * Affiche l'information à propos d'un produit présent dans le panier
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {object} element informations concernant un aliment ; sa quantité, son nom, son prix, son id 
     */
    const affichageAliments = (element) => {
        let type_couleur ;
        (compteur%2 === 0) ? type_couleur = "couleur_bg1" : type_couleur = "couleur_bg2" ;
        compteur++ ;

        return (
            <div className='c_info_ligne i_info_ligne'> 
                <div className={`i_nom_aliment ${type_couleur}`}>{element.Produit}</div> 
                <div class="aliment_barre" id={element.IdProduit}><hr /></div>
                <div className={`i_quantite_aliment c_quantite_aliment  ${type_couleur}`}> 
                    <button className='bouton_moins incrementeur' onClick={() => modifierQuantite(element.IdCommande, element.IdProduit, element.Quantite,"moins")} >-</button> 
                    <input id={`${element.IdCommande}${element.idProd}`} className='nombre_aliment' type='number' value={element.Quantite} readonly="readonly" />
                    <button className='bouton_plus incrementeur' onClick={() => modifierQuantite(element.IdCommande, element.IdProduit, element.Quantite, "plus")}>+</button>
                </div> 
                <div id={`${element.IdCommande}${element.IdProduit}total`} className={`i_prix_aliment ${type_couleur}`}>{(element.Prix*element.Quantite).toFixed(2)}{" €"}</div> 
            </div>
        )
    }

    return (
        <div>
			{statutConnexion ? <BanniereConnection page="panier" onClick={deconnexion} client={utilisateurCON}/> : <BanniereBasique />}
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
                        {donnees_panier && donnees_panier.map(affichageAliments)}
                    </div>

                    <div className="c_cadre_total i_cadre_total">
                    <div className="i_titre_total">Total</div>
                        <div id='prix_total' className='i_prix_total'>{total}{" €"}</div>
                    </div>
                </div>

                <div className="i_boutons1 c_boutons1">
                    <BoutonPanier className="i_bouton_envoyer1" id_div="elem_bouton_envoyer1" id_elem="bouton_envoyer1" name="bout_envoyer1" value="Suivant" onClick={validerPanier} />
                    <BoutonPanier className="i_bouton_annuler1" id_div="elem_bouton_annuler1" id_elem="bouton_annuler1" name="bout_annuler1" value="Annuler" onClick={supprimerCommande} />
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
                            <BoutonRadio className_div="i_place" id_div="radio_place" name="myradio1" value="a_emporter" form="place" text="A emporter" checked="yes" onClick={cacherAdresse}/>
                            <BoutonRadio className_div="i_livrer" id_div="radio_livrer" name="myradio1" value="a_livrer" form="livrer" text="A livrer" onClick={afficherAdresse}/>
                        </div>
                    </div>

                    <div className="i_apres_reception"></div>
                    
                    <div className="i_payement">
                        <label class="label_informations" for="mode_payement">Mode de payement</label><br />
                        <div className="i_mode_payement c_mode_payement">
                            <BoutonRadio className_div="i_liquide" id_div="radio_liquide" name="myradio2" value="liquide" form="liquide" text="Liquide"/>
                            <BoutonRadio className_div="i_mistercash" id_div="radio_mistercash" name="myradio2" value="mistercash" form="mistercash" text="Mistercash" checked="yes"/>
                        </div>
                    </div>
                    
                    <div class="i_apres_payement"></div>
                    
                    {donnees_adresse && donnees_adresse.map(info => (
                        <div className="i_adresse c_adresse" id="zone_adresse">
                            <AdresseCommande className_div="i_adresse_livraison" fom="adresse_livraison" Text="Adresse de livraison" id="adresse_livraison" name="add_livraison" type="text" placeholder={info.Rue}/>
                            <AdresseCommande className_div="i_numero_maison" fom="numero_maison" Text="Numéro" id="numero_maison" name="num_maison" type="number" placeholder={info.Numero}/>
                            <AdresseCommande className_div="i_code_postal" fom="code_postal" Text="Code postal" id="code_postal" name="num_postal" type="number" placeholder={info.Zip}/>
                            <AdresseCommande className_div="i_ville" fom="ville" Text="Ville" id="ville" name="nom_ville" type="text" placeholder={info.Ville}/>
                        </div>
                    ))}
                    
                </div>

                <div className="i_commentaire" id="elem_commentaire">
                    <label for="commentaire" id="titre_elem_commentaire">Commentaire</label><br />
                    <textarea placeholder="Texte prédéfini" id="commentaire" wrap="hard"></textarea>
                </div>

                <div className="i_boutons2 c_boutons2">
                    <BoutonPanier className="i_bouton_envoyer2" id_div="elem_bouton_envoyer2" id_elem="bouton_envoyer2" name="bout_envoyer2" value="Valider" onClick={ajouterCommande} />
                    <BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour" onClick={annulerInfo} />
                </div>
            </div>
        </div>
    );
}

export default Panier;
