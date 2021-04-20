const Connexion = () => {
    return (
        <div className="connexion">
            <div id="cadre_connexion">
                <div id="boutons_choix">
                    <span id="bouton_connexion">SE CONNECTER</span>
                    <span id="bouton_inscription"><a href="inscription.html">S'INSCRIRE</a></span>
                </div>
                
                <div>
                    <div id="titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>
                    
                    <form>
                        <div id="user">
                            <div className="div_user">ADRESSE E-MAIL</div>
                            <div className="div_text_user">
                                <input id="text_user" type="text" required maxlength="100" />
                            </div>
                        </div>
                        
                        <div id="pwd">
                            <div className="div_user">MOT DE PASSE</div>
                            <div className="div_text_user"><input id="text_mdp" type="password" required maxlength="100" /></div>
                        </div>
                        
                        <div id="connexion_envoi">
                            <input id="bouton_connexion_envoi" type="submit" value="CONNEXION"/>
                        </div>
                    </form>
                    
                    <div id ="pwd_oubli"><div>Mot de passe oublié ?</div></div>
                </div>

            </div>		
        </div>
    );
}

export default Connexion;
