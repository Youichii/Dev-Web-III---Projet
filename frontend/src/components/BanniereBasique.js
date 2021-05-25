//import logo from "../img/LogoD.png";
import logo from "../img/ChickNFishLogo.png"
import { NavLink } from 'react-router-dom';
import instagram from "../img/Instagram.png";
import facebook from "../img/Facebook.png";
import telephone from "../img/Telephone.png";
import { useEffect } from 'react';

const BanniereBasique = ({page}) => {
    require('../css/banniereBasique.css');

    const pages = ["accueil_bv", "informations_bv", "menu_bv", "connexion_bv", "inscription_bv"];
    let  niveau = 0 ;

    const glisserGaucheBV = () => {
        document.getElementsByClassName(pages[niveau])[0].style.display = "none";
        document.getElementsByClassName("rondBV" + (niveau + 1))[0].style.backgroundColor = "var(--vide)";
        if (niveau === 0) {
            niveau = 4;
        }
        else {
            niveau -= 1 ;
        }
        document.getElementsByClassName(pages[niveau])[0].style.display = "initial";
        document.getElementsByClassName("rondBV" + (niveau + 1))[0].style.backgroundColor = "var(--rempli)";
    }
    const glisserDroiteBV = () => {
        document.getElementsByClassName(pages[niveau])[0].style.display = "none";
        document.getElementsByClassName("rondBV" + (niveau + 1))[0].style.backgroundColor = "var(--vide)";
        if (niveau === 4) {
            niveau = 0;
        }
        else {
            niveau += 1;
        }
        document.getElementsByClassName(pages[niveau])[0].style.display = "initial";
        document.getElementsByClassName("rondBV" + (niveau + 1))[0].style.backgroundColor = "var(--rempli)";
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 900) {
                document.getElementsByClassName(pages[0])[0].style.display = "initial";
                document.getElementsByClassName(pages[1])[0].style.display = "initial";
                document.getElementsByClassName(pages[2])[0].style.display = "initial";
                document.getElementsByClassName(pages[3])[0].style.display = "initial";
                document.getElementsByClassName(pages[4])[0].style.display = "initial";
            }
            else {
                for (let i = 0 ; i < pages.length ; i++) {
                    if (i === niveau) {
                        document.getElementsByClassName(pages[i])[0].style.display = "initial";
                    }
                    else {
                        document.getElementsByClassName(pages[i])[0].style.display = "none";
                    }
                }
            }
        }
        window.addEventListener('resize', handleResize)
    })

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
            <div className="bouton_gauche"><input type="button" value="‹" onClick={glisserGaucheBV} /></div>
                <div className="bouton_droite"><input type="button" value="›" onClick={glisserDroiteBV} /></div>
            <div className="avancement">
                    <div className="rondBV1"></div>
                    <div className="rondBV2"></div>
                    <div className="rondBV3"></div>
                    <div className="rondBV4"></div>
                    <div className="rondBV5"></div>
                </div>
        </nav>
    )

}
export default BanniereBasique; 
            