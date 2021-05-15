import CookieConsent from "react-cookie-consent";

const Cookie = () => {
	require('./css/cookie.css');

    return (
            <CookieConsent location="bottom" cookieName="cookieAcceuil" expires={1} style={{"background-color" : "#ff3e3e", fontFamily: "Lucida Sans, sans-serif", fontSize: "14px"}} overlay buttonText="J'ACCEPTE" buttonStyle={{fontWeight: "bolder", "background-color" : "white", "color":"#ff3e3e", padding:"9px 20px", borderRadius:"5px"}}>
                    <span className="lienPolitiqueCookie">En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de Cookies ou autres traceurs afin de réaliser des statistiques de visites. Consultez la <a className="lienPolitiqueCookie" href="https://www.privacypolicies.com/live/544cc1d9-8359-45cf-a543-ab63691364cf">Politique relative au cookies</a> pour en savoir plus et connaitre les cookies que nous utilisons.</span>

            </CookieConsent>
    );
}

export default Cookie;
