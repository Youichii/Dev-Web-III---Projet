import PropTypes from 'prop-types';

const BoutonCommunautee = ({ className, id, style, onClick, value }) => {
    return (
        <button className={className} data-testid='bouton_communautee_envoyer'
        id = {id} onClick={onClick} >{value}</button>
    )

}

BoutonCommunautee.propTypes = {
    className : PropTypes.string,
    id : PropTypes.string,
    style : PropTypes.string,
    value : PropTypes.string,
    onClick : PropTypes.func,
}

export default BoutonCommunautee;  