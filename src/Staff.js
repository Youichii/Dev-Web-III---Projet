const Staff = () => {
    return (
        <div className="home">
            <div>
                <table id="titre_colonne_afaire">
                    <tr>
                        <td width="60px">Heure</td>
                        <td width="90px">Nom</td>
                        <td width="90px">Contact</td>
                        <td width="180px">Adresse</td>
                        <td width="80px">Commande</td>
                        <td width="60px">Prix</td>
                        <td width="140px">Heure <br /> prévue</td>
                    </tr>
                </table>
                <div className="cadre" id="cadre_afaire"></div>
            </div>

            <div>
                <table id="titre_colonne_encours">
                    <tr>
                        <td width="60px">Heure</td>
                        <td width="90px">Nom</td>
                        <td width="90px">Contact</td>
                        <td width="180px">Adresse</td>
                        <td width="80px">Commande</td>
                        <td width="60px">Prix</td>
                        <td width="140px">Heure <br /> prévue</td>
                    </tr>
                </table>
                <div className="cadre" id="cadre_encours"></div>
            </div>

            <div>
                <table id="titre_colonne_envoye">
                    <tr>
                        <td width="60px">Heure</td>
                        <td width="90px">Nom</td>
                        <td width="90px">Contact</td>
                        <td width="180px">Adresse</td>
                        <td width="80px">Commande</td>
                        <td width="60px">Prix</td>
                        <td width="140px">Heure <br /> prévue</td>
                    </tr>
                </table>
                <div className="cadre" id="cadre_envoye"></div>
            </div>
        </div>
    );
}

export default Staff;
