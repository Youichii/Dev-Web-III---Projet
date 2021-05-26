import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../img/ChickNFishLogo.png"
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";
import { useEffect } from 'react';
import menu from "../img/menuLogo.png";
import croix from '../img/croixMenu.png';

const BannierePatron = ({ onClick, page }) => {
    require('../css/bannierePatron.css');

    const afficherMenuBP = () => {
        document.getElementsByClassName("navbar_bp")[0].className  = "navbar_bp menu_detailbp";
        document.getElementsByClassName("statistiques_bp")[0].style.display  = "initial";
        document.getElementsByClassName("modification_bp")[0].style.display  = "initial";
        document.getElementsByClassName("historique_bp")[0].style.display  = "initial";
        document.getElementsByClassName("communaute_bp")[0].style.display  = "initial";
        document.getElementsByClassName("newsletter_bp")[0].style.display  = "initial";
        document.getElementsByClassName("deconnexion_bp")[0].style.display  = "initial";
        document.getElementsByClassName("reseaux_sociaux_bp")[0].style.display  = "grid";
        document.getElementsByClassName("croix_menubp")[0].style.display  = "initial";
        document.getElementsByClassName("menu_imgbp")[0].style.display  = "none";
    }

    const cacherMenuBP = () => {
        document.getElementsByClassName("navbar_bp")[0].className  = "navbar_bp banniere_patron";
        document.getElementsByClassName("statistiques_bp")[0].style.display  = "none";
        document.getElementsByClassName("modification_bp")[0].style.display  = "none";
        document.getElementsByClassName("historique_bp")[0].style.display  = "none";
        document.getElementsByClassName("communaute_bp")[0].style.display  = "none";
        document.getElementsByClassName("newsletter_bp")[0].style.display  = "none";
        document.getElementsByClassName("deconnexion_bp")[0].style.display  = "none";
        document.getElementsByClassName("reseaux_sociaux_bp")[0].style.display  = "none";
        document.getElementsByClassName("croix_menubp")[0].style.display  = "none";
        document.getElementsByClassName("menu_imgbp")[0].style.display  = "initial";
    }

    useEffect(() => {
        function handleResize() {
            if (document.getElementsByClassName("navbar_bp")[0] !== undefined) {
                if (window.innerWidth > 740) {
                    document.getElementsByClassName("navbar_bp")[0].className  = "navbar_bp banniere_patron";
                    document.getElementsByClassName("statistiques_bp")[0].style.display  = "initial";
                    document.getElementsByClassName("modification_bp")[0].style.display  = "initial";
                    document.getElementsByClassName("historique_bp")[0].style.display  = "initial";
                    document.getElementsByClassName("communaute_bp")[0].style.display  = "initial";
                    document.getElementsByClassName("newsletter_bp")[0].style.display  = "initial";
                    document.getElementsByClassName("deconnexion_bp")[0].style.display  = "initial";
                    document.getElementsByClassName("reseaux_sociaux_bp")[0].style.display  = "grid";
                    document.getElementsByClassName("croix_menubp")[0].style.display  = "none";
                    document.getElementsByClassName("menu_imgbp")[0].style.display  = "none";
                }
                else {
                    document.getElementsByClassName("navbar_bp")[0].className  = "navbar_bp banniere_patron";
                    document.getElementsByClassName("statistiques_bp")[0].style.display  = "none";
                    document.getElementsByClassName("modification_bp")[0].style.display  = "none";
                    document.getElementsByClassName("historique_bp")[0].style.display  = "none";
                    document.getElementsByClassName("communaute_bp")[0].style.display  = "none";
                    document.getElementsByClassName("newsletter_bp")[0].style.display  = "none";
                    document.getElementsByClassName("deconnexion_bp")[0].style.display  = "none";
                    document.getElementsByClassName("reseaux_sociaux_bp")[0].style.display  = "none";
                    document.getElementsByClassName("croix_menubp")[0].style.display  = "none";
                    document.getElementsByClassName("menu_imgbp")[0].style.display  = "initial";
                }
            }
        }
        window.addEventListener('resize', handleResize)
    })

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
            <NavLink to='/newsletter' className="newsletter_bp"  style={(page === "formmail")?{color:"var(--survol_bouton)", borderBottom: "solid 1px var(--survol_bouton)"}:{}}>
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
            <li className="menu_imgbp"><img id="img_menu" src={menu} alt="Logo_Menu" onClick={afficherMenuBP}/></li> 
            <li className="croix_menubp"><img id="croix_menu" src={croix} alt="croix_menu" onClick={cacherMenuBP}/></li> 
        </nav>
    )

}

BannierePatron.propTypes = {
    onClick : PropTypes.func
}

export default BannierePatron; 