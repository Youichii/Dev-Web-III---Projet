import logo from "./img/logo.jpg"
import { NavLink } from 'react-router-dom';


const Banner = () => {
    require('./banner.css')
    
    return(
        <nav className="navbar">                    
            <NavLink to='/home'>
                <li>
                    <a href="/" >Accueil</a>
                </li>
            </NavLink>
            <NavLink to='/informations'>
                <li>
                    <a href="/" id= "Inf">Informations</a>
                </li>
            </NavLink>
            <li>
                <img id = "img" src={logo} alt="Logo_Bannière" />
            </li>
            <NavLink to='/Menu'>
                <li>
                    <a href="/" id="Men">Menu</a>
                </li>
            </NavLink>
            <NavLink to='/panier'>
                <li>
                    <a href="/" id="Pan">Panier</a>
                </li>
            </NavLink>
        </nav>
    )

}
export default Banner; 
            