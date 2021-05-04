import PropTypes from 'prop-types'

const RadioCommande = ({ className_div, id_div, name, value, id_input, form, text, checked, onClick }) => {
    return (
        <div className={className_div} id={id_div}>
            <input type="radio" name={name} value={value} id={id_input} checked={checked} onClick={onClick} />
            <label for={form} className="label-info">{text}</label>
        </div>
    )

}

/*RadioCommande.defaultProps = {
    checked: 'no'
}*/

RadioCommande.propTypes = {
    className : PropTypes.string,
    id_div : PropTypes.string,
    id_elem : PropTypes.string,
    name : PropTypes.string,
    value : PropTypes.string,
    onClick : PropTypes.func,
}

export default RadioCommande
