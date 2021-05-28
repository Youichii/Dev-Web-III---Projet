import PropTypes from 'prop-types'

const AdresseCommande = ({ className_div, form, Text, id, name, type, placeholder, readOnly }) => {
    if (readOnly) {
        return (
            <div className={className_div}> 
                <label className="label_adresse" for={form}>{Text}</label><br /> 
                <input id={id} name={name} type={type} value={placeholder} readOnly/> 
            </div>
        )
    }
    else {
        return (
            <div className={className_div}> 
                <label className="label_adresse" for={form}>{Text}</label><br /> 
                <input id={id} name={name} type={type} placeholder={placeholder} /> 
            </div>
        )
    }

}

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