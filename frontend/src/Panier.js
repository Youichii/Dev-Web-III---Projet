import {useState} from "react" ;

const Panier = () => {

    const [aliments] = useState([{"id" : "A", "nom" : "poulet", "quantite" : 2, "prix_unite" : 5}, 
                                            {"id" : "B", "nom" : "viande", "quantite" : 7, "prix_unite" : 8}, 
                                            {"id" : "C", "nom" : "clem", "quantite" : 9, "prix_unite" : 260}]);

    const [heures, setHeures] = useState([]);

    const init_heures = () => {
        const intermediaire = [] ;
        let min = 1080 ; //18h
        let max = 1440 ; //00h

        for (var i = min; i < max; i+=15) {
            var minutes = i ;
            var nbHour = parseInt(minutes / 60);
            var nbminuteRestante = (minutes % 60);
            if(nbminuteRestante === 0){   
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
            
            <div className="row">
                <div className="col-7 col-s-3">
                    <div id="menu">
                        <table id="titre_aliments" width="800px">
                            <tr>
                                <td width="223px" onClick={init_heures}>Produit</td>
                                <td width="223px" id="titre_qtite">Quantité</td>
                                <td width="223px">Prix</td>
                            </tr>
                        </table>

                        <div id="info_aliments">
                            <table id="aliments">
                                {aliments.map(element => (
                                    <tr>
                                        <td width="290px" className="case_aliments">{element.nom}</td>
                                        <td className="case_aliment qtite_aliment">
                                            <input className="nombre_aliment" type="number" value={element.quantite} onChange={changer_prix(this, element.id)} min="0" max="100" />
                                        </td>
                                        <td id={element.id} className="case_aliment" width="250px">{element.prix_unite}*{element.quantite}{"€"}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        
                        <div id="total_prix"></div>
                    </div>
                </div>

                <div className="col-4 col-s-9">
                    <div id="informations">
                        <ul>
                            <div className="elem_liste" id="elem_heure">
                                <li>
                                    <label for="heure_livraison">Heure</label><br />
                                    <div id="heure_livraison">
                                        <select name="heures_reserv" id="heures_reserv">
                                            {heures.map(heure => (
                                                <option value={heure.h}>{heure.h}</option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                            </div>

                            <div className="elem_liste">
                                <li>
                                    <label for="adresse_livraison">Adresse de livraison</label><br />
                                    <input id="adresse_livraison" name="add_livraison" type="text" />
                                </li>
                            </div>
                            
                            <div className="elem_liste">
                                <li>
                                    <label for="moyen_reception">Moyen de réception</label><br />
                                    <input id="moyen_reception" name="moy_reception" type="text" />
                                </li>
                            </div>
                            
                            <div className="elem_liste">
                                <li>
                                    <label for="mode_payement">Mode de payement</label><br />
                                    <input id="mode_payement" name="moy_payement" type="text" />
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>

                <div className="col-6 col-s-9" id="elem_commentaire">
                    <label for="commentaire" id="titre_elem_commentaire">Commentaire</label><br />
                    <input id="commentaire" name="com" type="text" />
                </div>

                <div className="col-2 col-s-9" id="elem_bouton_envoyer">
                    <input id="bouton_envoyer" name="bout_envoyer" type="button" value="Envoyer" />
                </div>
                
                <div className="col-2 col-s-9" id="elem_bouton_annuler">
                    <input id="bouton_annuler" name="bout_annuler" type="button" value="Annuler" />
                </div>

            </div>

        </div>
    );
}

export default Panier;
