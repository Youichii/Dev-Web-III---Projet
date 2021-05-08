import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const BannerStaff = ({ onClick }) => {
    require('../bannerStaff.css');
    return (
        <nav className="navbar">                    
            <NavLink to='/home'>
                <li><a href="/" >Rien</a></li>
            </NavLink>
            <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
            <button onClick={onClick}>Déconnexion</button>
        </nav>
    )

}

/*BannerStaff.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BannerStaff.propTypes = {
    onClick : PropTypes.func
}

export default BannerStaff; 