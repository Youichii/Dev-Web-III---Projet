import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import BanniereStaff from './BanniereStaff.js';
import BannierePatron from './BannierePatron.js';
import BanniereClient from './BanniereClient.js';

const BanniereConnection = ({onClick, client}) => {
    //require('../css/banniereConnection.css');
    if (client === 1) {
        return (
            <BannierePatron onClick={onClick}></BannierePatron>
        );
    }
    else if (client === 2) {
        return (
            <BanniereStaff onClick={onClick}></BanniereStaff>
        );
    }
    else {
        return (
            <BanniereClient onClick={onClick}></BanniereClient>
        );
    }

}

/*BanniereConnection.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BanniereConnection.propTypes = {
    onClick : PropTypes.func
}

export default BanniereConnection; 