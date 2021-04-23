const Connexion = () => {

	const recuperer_client = () => {
		let mail = document.getElementById("text_user").value ;
		let pwd = document.getElementById("text_mdp").value ;
		var myInit = { method: 'GET',
               headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:3001/api/users/${mail}/${pwd}`, myInit)
        .then(res => {
            return res.json();
        })
        .then(data => {
			if (data.length === 0) {
				console.log("data vide");
			}
			else {
				console.log("data ok");
			}
        })
    }

    return (
        <div className="connexion c_cadre">
            <div id="cadre_connexion" className="i_info_connexion c_info_connexion">
                <div className="i_bouton_connexion">CONNEXION</div>
				<div className="i_bouton_inscription">INSCRIPTION</div>
				<div className="i_titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>

                <div className="i_zones_info c_zones_info">
					<div className="i_titre_adresse">ADRESSE E-MAIL</div>
					<div className="i_champ_adresse">
						<input id="text_user" type="text" required maxLength="100" />
					</div>

					<div className="i_titre_mdp">MOT DE PASSE</div>
					<div className="i_champ_mdp">
						<input id="text_mdp" type="password" required maxLength="100" />
					</div>
					
					<div className="i_bouton_envoi">
						<input id="bouton_connexion_envoi" type="button" value="CONNEXION" onClick={recuperer_client} />
					</div>
					<div className="i_mdp_oubli" id ="pwd_oubli">Mot de passe oublié ?</div>
				</div>
            </div>		
        </div>
    );
}

export default Connexion;
