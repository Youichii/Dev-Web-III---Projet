//import logo from "../img/LogoD.png";
import logo from "../img/ChickNFishLogo.png"
import { NavLink } from 'react-router-dom';
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";

const BanniereBasique = ({page}) => {
    require('../css/banniereBasique.css');

    return(
        <nav className="navbar banniere_visiteur">          
            
            <li className="logo_bv"><img id="img" src={logo} alt="Logo_Bannière" /></li> 
            <NavLink to='/' className="accueil_bv" style={(page === "acceuil")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Accueil</li>
            </NavLink>
            <NavLink to='/informations' className="informations_bv"  style={(page === "informations")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Informations</li>
            </NavLink>
            <NavLink to='/Menu' className="menu_bv"  style={(page === "menu")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Menu</li>
            </NavLink>
            <NavLink to='/connexion' className="connexion_bv"  style={(page === "connexion")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Connexion</li>
            </NavLink>
            <NavLink to='/inscription' className="inscription_bv"  style={(page === "inscription")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Inscription</li>
            </NavLink>
            <div className="reseaux_sociaux">
                <div className="insta_bv"><a href="https://instagram.com/chicknfishlln?igshid=p8js0ke3rqbc"><img id="instagram" src={instagram} /></a></div>
                <div className="fb_bv"><a href="https://www.facebook.com/ChickNFishLLN/"><img id="facebook" src={facebook} /></a></div>
                <div className="tel_bv"> <NavLink to='/informations'><img id="telephone" src={telephone} /></NavLink></div>
            </div>
        </nav>
    )

}
export default BanniereBasique; 
            