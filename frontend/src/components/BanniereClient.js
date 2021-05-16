import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../img/LogoD.png"
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";


const BanniereClient = ({ onClick, page }) => {
    require('../css/banniereClient.css');
    return (
        // <nav className="c_barre_nav">                    
        //     <NavLink to='/home'>
        //         <li className="i_accueil"><a href="/" >Accueil</a></li>
        //     </NavLink>
        //     <NavLink to='/informations'>
        //         <li className="i_informations"><a href="/" id= "Inf">Informations</a></li>
        //     </NavLink>
        //     <li className="i_logo"><img id="img" src={logo} alt="Logo_Bannière" /></li>
        //     <NavLink to='/Menu'>
        //         <li className="i_menu"><a href="/" id="Men">Menu</a></li>
        //     </NavLink>
        //     <NavLink to='/panier'>
        //         <li className="i_panier"><a href="/" id="Pan">Panier</a></li>
        //     </NavLink>
        //     <li className="i_deconnexion">
        //         <button onClick={onClick}>Déconnexion</button>
        //     </li>
        // </nav>


        <nav className="c_barre_nav banniere_connecte">          
            
            <li className="logo_bc"><img id="img_bc" src={logo} alt="Logo_Bannière" /></li> 
            <NavLink to='/' className="accueil_bc" style={(page === "acceuil")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Accueil</li>
            </NavLink>
            <NavLink to='/informations' className="informations_bc"  style={(page === "informations")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Informations</li>
            </NavLink>
            <NavLink to='/Menu' className="menu_bc"  style={(page === "menu")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Menu</li>
            </NavLink>
            <NavLink to='/profil-prive' className="profilpv_bc"  style={(page === "profilprive")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li>Profil privé</li>
            </NavLink>
            <NavLink to='/' className="deconnexion_bc"  style={(page === "accueil")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
                <li onClick={onClick}>Déconnexion</li>
            </NavLink>
            <div className="reseaux_sociaux_bc">
                <div className="insta_bc"><a href="https://instagram.com/chicknfishlln?igshid=p8js0ke3rqbc"><img id="instagram_bc" src={instagram} /></a></div>
                <div className="fb_bc"><a href="https://www.facebook.com/ChickNFishLLN/"><img id="facebook_bc" src={facebook} /></a></div>
                <div className="tel_bc"> <NavLink to='/informations'><img id="telephone_bc" src={telephone} /></NavLink></div>
            </div>
        </nav>
    )

}

/*BanniereClient.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BanniereClient.propTypes = {
    onClick : PropTypes.func
}

export default BanniereClient; 