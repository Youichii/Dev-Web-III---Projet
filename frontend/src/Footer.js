const Footer = () => {
	require('./footer.css')
	
    return (
        <div className="footer">
            <div className="regles_legales">
                <div className="titre_mention">Conditions et mentions légales</div>
                <a href="./MentionsLegales.html" className="mentions_legales">Mentions légales</a>
                <a href="https://www.privacypolicies.com/live/5b2841b7-4ad5-46a7-ac31-25ea7960e6f3" className="confidentialite">Politique de Confidentialité</a>
                <a href="https://www.privacypolicies.com/live/544cc1d9-8359-45cf-a543-ab63691364cf" className="cookies">Politique relative aux cookies</a>
                <a href="./CGU.html" className="cgu">Conditions générales d'utilisation</a>
            </div>
            <div className="aide">
                <div>Besoin d'aide ?</div>
                <a>Nous appeler</a>
            </div>
        </div>
    );
}

export default Footer;
