import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const BannerClient = ({ onClick }) => {
    require('../bannerClient.css');
    return (
        <nav className="navbar">                    
            <NavLink to='/home'>
                <li><a href="/" >Accueil</a></li>
            </NavLink>
            <NavLink to='/informations'>
            <li><a href="/" id= "Inf">Informations</a></li>
            </NavLink>
                <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
            <NavLink to='/Menu'>
                <li><a href="/" id="Men">Menu</a></li>
            </NavLink>
            <NavLink to='/panier'>
                <li><a href="/" id="Pan">Panier</a></li>
            </NavLink>
            <button onClick={onClick}>Déconnexion</button>
        </nav>
    )

}

/*BannerClient.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BannerClient.propTypes = {
    onClick : PropTypes.func
}

export default BannerClient; 