import { NavLink } from 'react-router-dom';

const PiedPage = () => {
	require('./css/piedPage.css')
	
    return (
        <div className="footer">
            <div className="regles_legales">
                <div className="titre_mention">Conditions et mentions légales</div>
                <NavLink to='/mentionslegales' className="mentions_legales">Mentions légales</NavLink>
                <a href="https://www.privacypolicies.com/live/5b2841b7-4ad5-46a7-ac31-25ea7960e6f3" className="confidentialite">Politique de Confidentialité</a>
                <a href="https://www.privacypolicies.com/live/544cc1d9-8359-45cf-a543-ab63691364cf" className="cookies">Politique relative aux cookies</a>
                <NavLink to='/cgu' className="cgu">Conditions générales d'utilisation</NavLink>
            </div>
            <div className="aide">
                <div>Besoin d'aide ?</div>
                <a href="">Nous appeler</a>
            </div>
        </div>
    );
}

export default PiedPage;
