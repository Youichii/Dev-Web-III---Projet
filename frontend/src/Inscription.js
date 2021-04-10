const Inscription = () => {
    return (
        <div className="inscription grid_container">
            <div id="cadre_inscription" className="item1 grid_container2">			
				<div className="i_bouton_con">CONNEXION</div>
				<div className="i_bouton_insc">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>
				
				<div className="grid_container3 item2">
					<div className="item3 pol">NOM</div>
					<div className="item4">
						<input type="texte" id="nom_user" required maxlength="100" />
					</div>
					
					<div className="item5 pol">PRENOM</div>
					<div className="item6">
						<input type="texte" id="prenom_user" required />
					</div>
				
					<div className="item7 pol">ADRESSE</div>
					<div className="item8">
						<input type="texte" id="adresse_user" required />
					</div>
				
					<div className="item9 pol">DATE DE NAISSANCE</div>
					<div className="div_text_infos item10">
						<input type="texte" id="naissance_user" required />
					</div>
					
					<div className="item15 pol">SEXE</div>
					<div className="item16">
						<input type="texte" id="sexe_user" required />
					</div>
				
					<div className="item11 pol">TELEPHONE</div>
					<div className="item12">
						<input type="texte" id="telephone_user" required />
					</div>
				
					<div className="item13 pol">ADRESSE E-MAIL</div>
					<div className="item14">
						<input type="texte" id="mail_user" required />
					</div>
				
					<div className="item17 pol">MOT DE PASSE</div>
					<div className="item18">
						<input type="texte" id="mdp_user" required />
					</div>
				
					<div className="item19 pol">NEWSLETTER</div>
					<div className="item20">
						<input type="texte" id="newsletter_user" required />
					</div>
				
					<div className="item21 pol">POLITIQUE</div>
					<div className="item22">
						<input type="texte" id="politique_user" required />
					</div>
				
					<div className="item23 pol">CAPTCHA</div>
					<div className="item24">
						<input type="texte" id="captcha_user" required />
					</div>
					
					<div id="connexion_envoi" className="item25">
						<input id="bouton_connexion_envoi" type="submit" value="INSCRIPTION" onclick="inscription();" />
					</div>
				</div>
			</div>
        </div>
    );
}

export default Inscription;