import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../img/ChickNFishLogo.png"
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";
import { useEffect } from 'react';
import menu from "../img/menuLogo.png";
import croix from '../img/croixMenu.png';

const BanniereClient = ({ onClick, page }) => {
    require('../css/banniereClient.css');

    const afficherMenuBC = () => {
        document.getElementsByClassName("c_barre_nav")[0].className  = "c_barre_nav menu_detailbc";
        document.getElementsByClassName("accueil_bc")[0].style.display  = "initial";
        document.getElementsByClassName("informations_bc")[0].style.display  = "initial";
        document.getElementsByClassName("menu_bc")[0].style.display  = "initial";
        document.getElementsByClassName("profilpv_bc")[0].style.display  = "initial";
        document.getElementsByClassName("deconnexion_bc")[0].style.display  = "initial";
        document.getElementsByClassName("reseaux_sociaux_bc")[0].style.display  = "grid";
        document.getElementsByClassName("croix_menubc")[0].style.display  = "initial";
        document.getElementsByClassName("menu_imgbc")[0].style.display  = "none";
    }

    const cacherMenuBC = () => {
        document.getElementsByClassName("c_barre_nav")[0].className  = "c_barre_nav banniere_connecte";
        document.getElementsByClassName("accueil_bc")[0].style.display  = "none";
        document.getElementsByClassName("informations_bc")[0].style.display  = "none";
        document.getElementsByClassName("menu_bc")[0].style.display  = "none";
        document.getElementsByClassName("profilpv_bc")[0].style.display  = "none";
        document.getElementsByClassName("deconnexion_bc")[0].style.display  = "none";
        document.getElementsByClassName("reseaux_sociaux_bc")[0].style.display  = "none";
        document.getElementsByClassName("croix_menubc")[0].style.display  = "none";
        document.getElementsByClassName("menu_imgbc")[0].style.display  = "initial";
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 495) {
                document.getElementsByClassName("c_barre_nav")[0].className  = "c_barre_nav banniere_connecte";
                document.getElementsByClassName("accueil_bc")[0].style.display  = "initial";
                document.getElementsByClassName("informations_bc")[0].style.display  = "initial";
                document.getElementsByClassName("menu_bc")[0].style.display  = "initial";
                document.getElementsByClassName("profilpv_bc")[0].style.display  = "initial";
                document.getElementsByClassName("deconnexion_bc")[0].style.display  = "initial";
                document.getElementsByClassName("reseaux_sociaux_bc")[0].style.display  = "grid";
                document.getElementsByClassName("croix_menubc")[0].style.display  = "none";
                document.getElementsByClassName("menu_imgbc")[0].style.display  = "none";
            }
            else {
                document.getElementsByClassName("c_barre_nav")[0].className  = "c_barre_nav banniere_connecte";
                document.getElementsByClassName("accueil_bc")[0].style.display  = "none";
                document.getElementsByClassName("informations_bc")[0].style.display  = "none";
                document.getElementsByClassName("menu_bc")[0].style.display  = "none";
                document.getElementsByClassName("profilpv_bc")[0].style.display  = "none";
                document.getElementsByClassName("deconnexion_bc")[0].style.display  = "none";
                document.getElementsByClassName("reseaux_sociaux_bc")[0].style.display  = "none";
                document.getElementsByClassName("croix_menubc")[0].style.display  = "none";
                document.getElementsByClassName("menu_imgbc")[0].style.display  = "initial";
            }
        }
        window.addEventListener('resize', handleResize)
    })

    return (
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
            <li className="menu_imgbc"><img id="img_menu" src={menu} alt="Logo_Menu" onClick={afficherMenuBC}/></li> 
            <li className="croix_menubc"><img id="croix_menu" src={croix} alt="croix_menu" onClick={cacherMenuBC}/></li> 
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