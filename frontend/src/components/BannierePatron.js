import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../img/LogoD.png"
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";

const BannierePatron = ({ onClick, page }) => {
    require('../css/bannierePatron.css');
    return (
        <nav className="navbar_bp banniere_patron">          
            <li className="logo_bp"><img id="img_bp" src={logo} alt="Logo_Bannière" /></li> 
            <NavLink to='/stat' className="statistiques_bp" style={(page === "statistiques")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Statistiques</li>
            </NavLink>
            <NavLink to='/modification' className="modification_bp"  style={(page === "modification")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Modifications</li>
            </NavLink>
            <NavLink to='/historique' className="historique_bp"  style={(page === "historique")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Historique</li>
            </NavLink>
            <NavLink to='/communaute' className="communaute_bp"  style={(page === "communaute")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Communauté</li>
            </NavLink>
            <NavLink to='/FormMail' className="newsletter_bp"  style={(page === "formmail")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Newsletter</li>
            </NavLink>
            <NavLink to='/' className="deconnexion_bp"  style={(page === "accueil")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li onClick={onClick}>Déconnexion</li>
            </NavLink>
            <div className="reseaux_sociaux_bp">
                <div className="insta_bp"><a href="https://instagram.com/chicknfishlln?igshid=p8js0ke3rqbc"><img id="instagram_bp" src={instagram} alt="icone d'instagram"/></a></div>
                <div className="fb_bp"><a href="https://www.facebook.com/ChickNFishLLN/"><img id="facebook_bp" src={facebook} alt="icone de facebook" /></a></div>
                <div className="tel_bp"> <NavLink to='/informations'><img id="telephone_bp" src={telephone} alt="icone de téléphone" /></NavLink></div>
            </div>
        </nav>
    )

}

/*BannierePatron.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BannierePatron.propTypes = {
    onClick : PropTypes.func
}

export default BannierePatron; 