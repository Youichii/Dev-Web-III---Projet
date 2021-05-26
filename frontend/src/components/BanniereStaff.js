import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../img/ChickNFishLogo.png"
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";
import { useEffect } from 'react';
import menu from "../img/menuLogo.png";
import croix from '../img/croixMenu.png';

const BanniereStaff = ({ onClick, page }) => {
    require('../css/banniereStaff.css');

    const afficherMenuBS = () => {
        document.getElementsByClassName("navbar_bs")[0].className  = "navbar_bs menu_detailbs";
        document.getElementsByClassName("staff_bs")[0].style.display  = "initial";
        document.getElementsByClassName("profilpv_bs")[0].style.display  = "initial";
        document.getElementsByClassName("deconnexion_bs")[0].style.display  = "initial";
        document.getElementsByClassName("reseaux_sociaux_bs")[0].style.display  = "grid";
        document.getElementsByClassName("croix_menubs")[0].style.display  = "initial";
        document.getElementsByClassName("menu_imgbs")[0].style.display  = "none";
    }

    const cacherMenuBS = () => {
        document.getElementsByClassName("navbar_bs")[0].className  = "navbar_bs banniere_staff";
        document.getElementsByClassName("staff_bs")[0].style.display  = "none";
        document.getElementsByClassName("profilpv_bs")[0].style.display  = "none";
        document.getElementsByClassName("deconnexion_bs")[0].style.display  = "none";
        document.getElementsByClassName("reseaux_sociaux_bs")[0].style.display  = "none";
        document.getElementsByClassName("croix_menubs")[0].style.display  = "none";
        document.getElementsByClassName("menu_imgbs")[0].style.display  = "initial";
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 550) {
                document.getElementsByClassName("navbar_bs")[0].className  = "navbar_bs banniere_staff";
                document.getElementsByClassName("staff_bs")[0].style.display  = "initial";
                document.getElementsByClassName("profilpv_bs")[0].style.display  = "initial";
                document.getElementsByClassName("deconnexion_bs")[0].style.display  = "initial";
                document.getElementsByClassName("reseaux_sociaux_bs")[0].style.display  = "grid";
                document.getElementsByClassName("croix_menubs")[0].style.display  = "none";
                document.getElementsByClassName("menu_imgbs")[0].style.display  = "none";
            }
            else {
                document.getElementsByClassName("navbar_bs")[0].className  = "navbar_bs banniere_staff";
                document.getElementsByClassName("staff_bs")[0].style.display  = "none";
                document.getElementsByClassName("profilpv_bs")[0].style.display  = "none";
                document.getElementsByClassName("deconnexion_bs")[0].style.display  = "none";
                document.getElementsByClassName("reseaux_sociaux_bs")[0].style.display  = "none";
                document.getElementsByClassName("croix_menubs")[0].style.display  = "none";
                document.getElementsByClassName("menu_imgbs")[0].style.display  = "initial";
            }
        }
        window.addEventListener('resize', handleResize)
    })


    return (
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
            <li className="menu_imgbs"><img id="img_menu" src={menu} alt="Logo_Menu" onClick={afficherMenuBS}/></li> 
            <li className="croix_menubs"><img id="croix_menu" src={croix} alt="croix_menu" onClick={cacherMenuBS}/></li> 
        </nav>
    )

}


BanniereStaff.propTypes = {
    onClick : PropTypes.func
}

export default BanniereStaff; 