import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const BannierePatron = ({ onClick }) => {
    require('../css/bannierePatron.css');
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

/*BannierePatron.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BannierePatron.propTypes = {
    onClick : PropTypes.func
}

export default BannierePatron; 