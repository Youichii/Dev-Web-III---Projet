import PropTypes from 'prop-types'

const BoutonPanier = ({ className, id_div, id_elem, name, value, onClick }) => {
    return (
        <div className={className} id={id_div}>
            <input id={id_elem} name={name} type="button" value={value} onClick={onClick} />
        </div>
    )

}

/*BoutonPanier.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

BoutonPanier.propTypes = {
    className : PropTypes.string,
    id_div : PropTypes.string,
    id_elem : PropTypes.string,
    name : PropTypes.string,
    value : PropTypes.string,
    onClick : PropTypes.func,
}

export default BoutonPanier

