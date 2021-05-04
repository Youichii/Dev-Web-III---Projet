import PropTypes from 'prop-types'

const AdresseCommande = ({ className_div, className_label, form, Text, id, name, type, placeholder }) => {
    return (
        <div className={className_div}> 
            <label className="label_adresse" htmlFor={form}>{Text}</label><br /> 
            <input id={id} name={name} type={type} placeholder={placeholder} /> 
        </div>
    )

}

/*AdresseCommande.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

AdresseCommande.propTypes = {
    informations : PropTypes.string,
    type_couleur : PropTypes.string,
    bg_bouton : PropTypes.string,

    className_div : PropTypes.string,
    className_label : PropTypes.string,
    form : PropTypes.string,
    Text : PropTypes.string,
    id : PropTypes.string,
    name : PropTypes.string,
    type : PropTypes.string,
    placeholder : PropTypes.string,
}

export default AdresseCommande
