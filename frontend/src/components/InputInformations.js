import PropTypes from 'prop-types'

const InputInformations = ({ className_div, type, id_input, maxLenght, className_span, id_span }) => {
    return (
        <div className={className_div}>
            <input type={type} id={id_input} required maxLength={maxLenght} /> 
            <span className="message_erreur" id={id_span}></span>
        </div>
    )

}

InputInformations.defaultProps = {
    type: 'text'
}

InputInformations.propTypes = {
    informations : PropTypes.string,
    type_couleur : PropTypes.string
}

export default InputInformations