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
						<input type="text" id="nom_user" required maxlength="100" />
					</div>
					
					<div className="i_titre_prenom pol">PRENOM</div>
					<div className="i_champ_prenom">
						<input type="text" id="prenom_user" required />
					</div>
				
					<div className="i_titre_adresse_insc pol">ADRESSE</div>
					<div className="i_champ_adresse_insc">
						<input type="text" id="adresse_user" required />
					</div>
				
					<div className="i_titre_anniversaire pol">DATE DE NAISSANCE</div>
					<div className="i_champ_anniversaire">
                    <select className="selec_jour">
							<option selected="selected" value="0">JJ</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="3">4</option>
							<option value="3">5</option>
							<option value="3">6</option>
							<option value="3">7</option>
							<option value="3">8</option>
							<option value="3">9</option>
							<option value="3">10</option>
							<option value="3">11</option>
							<option value="3">12</option>
							<option value="1">13</option>
							<option value="2">14</option>
							<option value="3">15</option>
							<option value="3">16</option>
							<option value="3">17</option>
							<option value="3">18</option>
							<option value="3">19</option>
							<option value="3">20</option>
							<option value="3">21</option>
							<option value="3">22</option>
							<option value="3">23</option>
							<option value="3">24</option>
							<option value="3">25</option>
							<option value="3">26</option>
							<option value="3">27</option>
							<option value="3">28</option>
							<option value="3">29</option>
							<option value="3">30</option>
							<option value="3">31</option>
						</select>
						
						<select className="selec_mois">
							<option selected="selected" value="0">Mois</option>
							<option value="Janvier">Janvier</option>
							<option value="Février">Février</option>
							<option value="Mars">Mars</option>
							<option value="Avril">Avril</option>
							<option value="Mai">Mai</option>
							<option value="Juin">Juin</option>
							<option value="Juillet">Juillet</option>
							<option value="Aout">Aout</option>
							<option value="Septembre">Septembre</option>
							<option value="Octobre">Octobre</option>
							<option value="Novembre">Novembre</option>
							<option value="Décembre">Décembre</option>
						</select>
						
						<select className="selec_annee">
							<option selected="selected" value="0">AAAA</option>
							<option value="2000">2000</option>
							<option value="2001">2001</option>
							<option value="2002">2002</option>
						</select>
					</div>
					
					<div className="i_titre_sexe pol">SEXE</div>
					<div className="i_champ_sexe">
                        <div id="radio_femme"><input type="radio" name="myradio" value="femme" id="sexef_user" /> FEMME</div>
						<div id="radio_homme"><input type="radio" name="myradio" value="homme" id="sexeh_user" /> HOMME</div>
					</div>
				
					<div className="i_titre_telephone pol">TELEPHONE</div>
					<div className="i_champ_telephone">
						<input type="text" id="telephone_user" required />
					</div>
				
					<div className="i_titre_mail pol">ADRESSE E-MAIL</div>
					<div className="i_champ_mail">
						<input type="text" id="mail_user" required />
					</div>
				
					<div className="i_titre_mdp_insc pol">MOT DE PASSE</div>
					<div className="i_champ_mdp_insc">
						<input type="password" id="mdp_user" required />
					</div>
				
					<div className="i_champ_newsletter">
						<input type="checkbox" id="newsletter_user" required /><span className="pol">Je souhaite m'abonner à la newsletter</span>
					</div>
				
					<div className="i_champ_politique">
						<input type="checkbox" id="politique_user" required /><span className="pol">J'accepte les termes et conditions & politique de confidentialité</span>
					</div>
				
					<div className="i_titre_captcha pol">CAPTCHA</div>
					<div className="i_champ_captcha">
						<input type="text" id="captcha_user" required />
					</div>
					
					<div className="i_bouton_envoi_insc">
						<input id="bouton_inscription_envoi" type="submit" value="S'INSCRIRE" onclick="inscription();" />
					</div>
				</div>
			</div>
        </div>
    );
}

export default Inscription;