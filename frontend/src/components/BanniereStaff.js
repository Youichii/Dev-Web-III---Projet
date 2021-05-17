import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../img/ChickNFishLogo.png"
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";

const BanniereStaff = ({ onClick, page }) => {
    require('../css/banniereStaff.css');
    return (
        // <nav className="navbar">                    
        //     <NavLink to='/home'>
        //         <li><a href="/" >Rien</a></li>
        //     </NavLink>
        //     <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
        //     <button onClick={onClick}>Déconnexion</button>
        // </nav>

        <nav className="navbar_bs banniere_staff">          
            <li className="logo_bs"><img id="img_bs" src={logo} alt="Logo_Bannière" /></li> 
            <NavLink to='/staff' className="staff_bs"  style={(page === "staff")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Commandes</li>
            </NavLink>
            <NavLink to='/profil-prive' className="profilpv_bs"  style={(page === "profilprive")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Profil privé</li>
            </NavLink>
            <NavLink to='/' className="deconnexion_bs"  style={(page === "accueil")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li onClick={onClick}>Déconnexion</li>
            </NavLink>
            <div className="reseaux_sociaux_bs">
                <div className="insta_bs"><a href="https://instagram.com/chicknfishlln?igshid=p8js0ke3rqbc"><img id="instagram_bs" src={instagram} /></a></div>
                <div className="fb_bs"><a href="https://www.facebook.com/ChickNFishLLN/"><img id="facebook_bs" src={facebook} /></a></div>
                <div className="tel_bs"> <NavLink to='/informations'><img id="telephone_bs" src={telephone} /></NavLink></div>
            </div>
        </nav>
    )

}

/*BanniereStaff.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BanniereStaff.propTypes = {
    onClick : PropTypes.func
}

export default BanniereStaff; 