const Cookie = () => {
	require('./cookie.css');

    return (
        <div className="grid_container">
            <div className="corps">
                coucou
                <div>ça va </div>
            </div>
            <div className="general"></div>
            <div className="cookie">
                <div className="croix">x</div>
                <div className="titre_cookie">Avis relatifs aux cookies </div>

                <div className="corps_cookie">
                Ce site utilise des cookies, notamment des cookies tiers. 
                L'utilisation de cookies nous permet de personnaliser votre expérience sur notre site et d'analyser notre trafic
                Consulter la <a href="https://www.privacypolicies.com/live/544cc1d9-8359-45cf-a543-ab63691364cf">Politique relative au cookies</a> pour en savoir plus, connaitre les cookies que nous utilisons et comment les désactiver et/ou retirer votre consentement.
                </div>

                <div className="prevention_cookie">En fermant cette bannière ou en cliquant sur "J'accepte", vous consentez à l'utilisation de cookies.</div>

                <input className="accepter_cookie" type="button" value="J'accepte"/>
            </div>
        </div>
    );
}

export default Cookie;
