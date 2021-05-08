import logo from "../img/logo.jpg";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import BannerStaff from './BannerStaff.js';
import BannerPatron from './BannerPatron.js';
import BannerClient from './BannerClient.js';

const BannerConnect = ({onClick, client}) => {
    //require('../bannerConnect.css');
    if (client === 1) {
        return (
            <BannerPatron onClick={onClick}></BannerPatron>
        );
    }
    else if (client === 2) {
        return (
            <BannerStaff onClick={onClick}></BannerStaff>
        );
    }
    else {
        return (
            <BannerClient onClick={onClick}></BannerClient>
        );
    }

}

/*BannerConnect.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BannerConnect.propTypes = {
    onClick : PropTypes.func
}

export default BannerConnect; 