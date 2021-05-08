import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const BannerClient = ({ onClick }) => {
    require('../bannerClient.css');
    return (
        <nav className="c_barre_nav">                    
            <NavLink to='/home'>
                <li className="i_accueil"><a href="/" >Accueil</a></li>
            </NavLink>
            <NavLink to='/informations'>
                <li className="i_informations"><a href="/" id= "Inf">Informations</a></li>
            </NavLink>
            <li className="i_logo"><img id="img" src={logo} alt="Logo_Bannière" /></li>
            <NavLink to='/Menu'>
                <li className="i_menu"><a href="/" id="Men">Menu</a></li>
            </NavLink>
            <NavLink to='/panier'>
                <li className="i_panier"><a href="/" id="Pan">Panier</a></li>
            </NavLink>
            <li className="i_deconnexion">
                <button onClick={onClick}>Déconnexion</button>
            </li>
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