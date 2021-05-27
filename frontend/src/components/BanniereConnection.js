import PropTypes from 'prop-types';
import BanniereStaff from './BanniereStaff.js';
import BannierePatron from './BannierePatron.js';
import BanniereClient from './BanniereClient.js';

const BanniereConnection = ({onClick, client, page}) => {

    if (client === 1) {
        return (
            <BannierePatron page={page} onClick={onClick}></BannierePatron>
        );
    }
    else if (client === 2) {
        return (
            <BanniereStaff page={page} onClick={onClick}></BanniereStaff>
        );
    }
    else {
        return (
            <BanniereClient page={page} onClick={onClick}></BanniereClient>
        );
    }

}

BanniereConnection.propTypes = {
    onClick : PropTypes.func
}

export default BanniereConnection; 