import logo from "./img/logo.jpg"
import { NavLink } from 'react-router-dom';
const BannerPatron = () => {
    require('./css/bannerPP.css')
    return(
        <nav className="navbar">                    
            <NavLink to='/stat'><li><a href="/" >Statistiques</a></li></NavLink>
            <NavLink to='/modification'><li><a href="/" id= "Inf">Modification</a></li></NavLink>
            <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
            <NavLink to='/Historique'><li><a href="/" id="Men">Historique</a></li></NavLink>
            <NavLink to='/Communaute'><li><a href="/" id="Pan">Communauté</a></li></NavLink>
        </nav>
    )
}
export default BannerPatron; 
            