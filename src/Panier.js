const Panier = () => {
    return (
        <div className="panier">
            
            <div className="row">
                <div className="col-7 col-s-3">
                    <div id="menu">
                        <table id="titre_aliments" width="800px">
                            <tr>
                                <td width="223px">Produit</td>
                                <td width="223px" id="titre_qtite">Quantité</td>
                                <td width="223px">Prix</td>
                            </tr>
                        </table>

                        <div id="info_aliments">
                            <table id="aliments">
                    
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
                                    <div id="heure_livraison"></div>
                                </li>
                            </div>

                            <div class="elem_liste">
                                <li>
                                    <label for="adresse_livraison">Adresse de livraison</label><br />
                                    <input id="adresse_livraison" name="add_livraison" type="text" />
                                </li>
                            </div>
                            
                            <div class="elem_liste">
                                <li>
                                    <label for="moyen_reception">Moyen de réception</label><br />
                                    <input id="moyen_reception" name="moy_reception" type="text" />
                                </li>
                            </div>
                            
                            <div class="elem_liste">
                                <li>
                                    <label for="mode_payement">Mode de payement</label><br />
                                    <input id="mode_payement" name="moy_payement" type="text" />
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>

                <div class="col-6 col-s-9" id="elem_commentaire">
                    <label for="commentaire" id="titre_elem_commentaire">Commentaire</label><br />
                    <input id="commentaire" name="com" type="text" />
                </div>

                <div class="col-2 col-s-9" id="elem_bouton_envoyer">
                    <input id="bouton_envoyer" name="bout_envoyer" type="button" value="Envoyer" />
                </div>
                
                <div class="col-2 col-s-9" id="elem_bouton_annuler">
                    <input id="bouton_annuler" name="bout_annuler" type="button" value="Annuler" />
                </div>

            </div>

        </div>
    );
}

export default Panier;
