const Connexion = () => {
    return (
        <div className="connexion c_cadre">
            <div id="cadre_connexion" className="i_info_connexion c_info_connexion">
                <div className="i_bouton_connexion">CONNEXION</div>
				<div className="i_bouton_inscription">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>

                <div class="i_zones_info c_zones_info">
					<div class="i_titre_adresse">ADRESSE E-MAIL</div>
					<div class="i_champ_adresse">
						<input id="text_user" type="text" required maxlength="100" />
					</div>
					<div class="i_titre_mdp">MOT DE PASSE</div>
					<div class="i_champ_mdp">
						<input id="text_mdp" type="password" required maxlength="100" />
					</div>
					<div class="i_bouton_envoi">
						<input id="bouton_connexion_envoi" type="submit" value="CONNEXION" />
					</div>
					<div class="i_mdp_oubli" id ="pwd_oubli">Mot de passe oublié ?</div>
				</div>
            </div>		
        </div>
    );
}

export default Connexion;
