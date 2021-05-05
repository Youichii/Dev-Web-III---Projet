import PropTypes from 'prop-types'

const BoutonRadio = ({ className_div, id_div, name, value, form, text, isChecked, onClick }) => {
    return (
        <div data-testid="div_bouton_radio" className={className_div} id={id_div}>
            <input data-testid="input_bouton_radio" type="radio" name={name} value={value} id={form} defaultChecked onClick={onClick} readOnly/>
            <label data-testid="label_bouton_radio" htmlFor={form} className="label-info">{text}</label>
        </div>
    )
}

/*BoutonRadio.defaultProps = {
    checked: 'no'
}*/

BoutonRadio.defaultProps = {
    isChecked : "checked"
}

BoutonRadio.propTypes = {
    className : PropTypes.string,
    id_div : PropTypes.string,
    id_elem : PropTypes.string,
    name : PropTypes.string,
    value : PropTypes.string,
    onClick : PropTypes.func,
}

export default BoutonRadio
