import PropTypes from 'prop-types'

const BoutonRadio = ({ className_div, id_div, name, value, form, text, checked, onClick }) => {
    return (
        <div className={className_div} id={id_div}>
            <input type="radio" name={name} value={value} id={form} checked={checked} onClick={onClick} />
            <label for={form} className="label-info">{text}</label>
        </div>
    )

}

/*BoutonRadio.defaultProps = {
    checked: 'no'
}*/

BoutonRadio.propTypes = {
    className : PropTypes.string,
    id_div : PropTypes.string,
    id_elem : PropTypes.string,
    name : PropTypes.string,
    value : PropTypes.string,
    onClick : PropTypes.func,
}

export default BoutonRadio