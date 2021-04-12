import {useState} from "react" ;

const Panier = () => {

    const [aliments, setAliments] = useState([{"id" : "A", "nom" : "poulet", "quantite" : 2, "prix_unite" : 5}, 
                                            {"id" : "B", "nom" : "viande", "quantite" : 7, "prix_unite" : 8}, 
                                            {"id" : "C", "nom" : "clem", "quantite" : 9, "prix_unite" : 260}]);

    const [heures, setHeures] = useState([]);

    const [total, setTotal] = useState(0);

    const init_heures = () => {
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
        console.log(intermediaire);
        setHeures(intermediaire);
    }

    const changer_prix = () => {
        console.log('hello ninjas');
    }

    return (
        <div className="panier" onLoad={init_heures}>

            <div className="c_info_panier i_info_panier">
				<div className="i_titre_produit" onClick={init_heures}>Produit</div>
				<div className="i_titre_quantite" id="titre_qtite">Quantité</div>
				<div className="i_titre_prix">Prix</div>
			
				<div className="i_info_aliments c_info_aliments" id="info_aliments">
                    {aliments.map(element => (
                        <div class='c_info_ligne i_info_ligne'>
                            <div class='i_nom_aliment'>{element.nom}</div>

                            <div class='i_quantite_aliment'> 
                            <input className="nombre_aliment" type="number" value={element.quantite} onChange={changer_prix(this, element.id)} min="0" max="100" />
                            </div> 

                            <div id={element.id}  class='i_prix_aliment'> 
                                {element.prix_unite}*{element.quantite}{"€"}
                            </div>
                        </div>
                    ))}
                    <div class='i_prix_total'>{total}</div>
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

				<div className="i_moy_reception">
					<label for="moyen_reception">Moyen de réception</label><br />
					<input id="moyen_reception" name="moy_reception" type="text" />
				</div>
				
				<div className="i_payement">
					<label for="mode_payement">Mode de payement</label><br />
					<input id="mode_payement" name="moy_payement" type="text" />
				</div>
				
				<div className="i_adresse">
					<label for="adresse_livraison">Adresse de livraison</label><br />
					<input id="adresse_livraison" name="add_livraison" type="text" />
				</div>
			</div>

            <div className="i_commentaire" id="elem_commentaire">
				<label for="commentaire" id="titre_elem_commentaire">Commentaire</label><br />
				<input id="commentaire" name="com" type="text" />
			</div>

			<div className="i_boutons c_boutons">
				<div className="i_bouton_envoyer" id="elem_bouton_envoyer">
					<input id="bouton_envoyer" name="bout_envoyer" type="button" value="Envoyer" />
				</div>
				
				<div className="i_bouton_annuler" id="elem_bouton_annuler">
					<input id="bouton_annuler" name="bout_annuler" type="button" value="Annuler" />
				</div>
			</div>

        </div>
    );
}

export default Panier;
