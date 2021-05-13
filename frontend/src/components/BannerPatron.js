import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const BannerPatron = ({ onClick }) => {
    require('../css/bannerPatron.css');
    return (
        <nav className="navbar">                    
            <li><a href="/" >Statistiques</a></li>
            <li><a href="/" id= "Inf">Modification</a></li>
            <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
            <li><a href="/" id="Men">Historique</a></li>
            <li><a href="/" id="Pan">Communauté</a></li>
            <button onClick={onClick}>Déconnexion</button>
        </nav>
    )

}

/*BannerPatron.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BannerPatron.propTypes = {
    onClick : PropTypes.func
}

export default BannerPatron; 