const Inscription = () => {
    return (
        <div className="inscription">
            <div id="cadre_connexion">
                <div id="boutons_choix">
                    <span id="bouton_connexion"><a href="connexion.html">SE CONNECTER</a></span>
                    <span id="bouton_inscription">S'INSCRIRE</span>
                </div>
                
                <div>
                    <div id="titre_connexion">CONNEXION AVEC UNE ADRESSE E-MAIL</div>
                    
                    <form>
                        <div>
                            <div class="div_infos">NOM</div>
                            <div class="div_text_infos">
                                <input type="texte" id="nom_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">PRENOM</div>
                            <div class="div_text_infos">
                                <input type="texte" id="prenom_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">ADRESSE</div>
                            <div class="div_text_infos">
                                <input type="texte" id="adresse_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">DATE DE NAISSANCE</div>
                            <div class="div_text_infos">
                                <input type="texte" id="naissance_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">TELEPHONE</div>
                            <div class="div_text_infos">
                                <input type="texte" id="telephone_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">ADRESSE E-MAIL</div>
                            <div class="div_text_infos">
                                <input type="texte" id="mail_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">SEXE</div>
                            <div class="div_text_infos">
                                <input type="texte" id="sexe_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">MOT DE PASSE</div>
                            <div class="div_text_infos">
                                <input type="texte" id="mdp_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">NEWSLETTER</div>
                            <div class="div_text_infos">
                                <input type="texte" id="newsletter_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">POLITIQUE</div>
                            <div class="div_text_infos">
                                <input type="texte" id="politique_user" required />
                            </div>
                        </div>
                        
                        <div>
                            <div class="div_infos">CAPTCHA</div>
                            <div class="div_text_infos">
                                <input type="texte" id="captcha_user" required />
                            </div>
                        </div>
                        
                        <div id="connexion_envoi">
                            <input id="bouton_connexion_envoi" type="submit" value="CONNEXION" />
                        </div>
                    </form>
                    
                </div>

            </div>	
        </div>
    );
}

export default Inscription;