import logo from "./img/logo.jpg"
import { NavLink } from 'react-router-dom';
import instagram from "./img/Instagram.png";
import facebook from "./img/Facebook.png";
import twitter from "./img/Twitter.png";

const Banner = () => {
    require('./css/banniereBasique.css');
    
    return(
        <nav className="navbar banniere_visiteur">          
            <li className="logo_bv"><img id="img" src={logo} alt="Logo_Bannière" /></li> 
            <div className="reseaux_sociaux">
                <div className="insta_bv"><img id="instagram" src={instagram} /></div>
                <div className="fb_bv"><img id="facebook" src={facebook} /></div>
                <div className="twi_bv"><img id="twitter" src={twitter} /></div>
            </div>
            <NavLink to='/home' className="accueil_bv">
                <li>Accueil</li>
            </NavLink>
            <NavLink to='/informations' className="informations_bv">
                <li>Informations</li>
            </NavLink>
            <NavLink to='/Menu' className="test_bv">
                <li>Test</li>
            </NavLink>
            <NavLink to='/Menu' className="menu_bv">
                <li>Menu</li>
            </NavLink>
            <NavLink to='/panier' className="panier_bv">
                <li>Panier</li>
            </NavLink>
        </nav>
    )

}
export default Banner; 
            