const Inscription = () => {
    return (
        <div className="inscription c_cadre_inscription">
            <div id="cadre_inscription" class="i_info_inscription c_info_inscription">			
				<div className="i_bouton_con">CONNEXION</div>
				<div className="i_bouton_insc">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>
				
				<div className="c_champs_informations i_champs_informations">
					<div className="i_titre_nom pol">NOM</div>
					<div className="i_champ_nom">
						<input type="texte" id="nom_user" required maxlength="100" />
					</div>
					
					<div className="i_titre_prenom pol">PRENOM</div>
					<div className="i_champ_prenom">
						<input type="texte" id="prenom_user" required />
					</div>
				
					<div className="i_titre_adresse_insc pol">ADRESSE</div>
					<div className="i_champ_adresse_insc">
						<input type="texte" id="adresse_user" required />
					</div>
				
					<div className="i_titre_anniversaire pol">DATE DE NAISSANCE</div>
					<div className="i_champ_anniversaire">
						<input type="texte" id="naissance_user" required />
					</div>
					
					<div className="i_titre_sexe pol">SEXE</div>
					<div className="i_champ_sexe">
						<input type="texte" id="sexe_user" required />
					</div>
				
					<div className="i_titre_telephone pol">TELEPHONE</div>
					<div className="i_champ_telephone">
						<input type="texte" id="telephone_user" required />
					</div>
				
					<div className="i_titre_mail pol">ADRESSE E-MAIL</div>
					<div className="i_champ_mail">
						<input type="texte" id="mail_user" required />
					</div>
				
					<div className="i_titre_mdp_insc pol">MOT DE PASSE</div>
					<div className="i_champ_mdp_insc">
						<input type="texte" id="mdp_user" required />
					</div>
				
					<div className="i_titre_newsletter pol">NEWSLETTER</div>
					<div className="i_champ_newsletter">
						<input type="texte" id="newsletter_user" required />
					</div>
				
					<div className="i_titre_politique pol">POLITIQUE</div>
					<div className="i_champ_politique">
						<input type="texte" id="politique_user" required />
					</div>
				
					<div className="i_titre_captcha pol">CAPTCHA</div>
					<div className="i_champ_captcha">
						<input type="texte" id="captcha_user" required />
					</div>
					
					<div id="connexion_envoi" className="i_bouton_envoi_insc">
						<input id="bouton_connexion_envoi" type="submit" value="INSCRIPTION" onclick="inscription();" />
					</div>
				</div>
			</div>
        </div>
    );
}

export default Inscription;