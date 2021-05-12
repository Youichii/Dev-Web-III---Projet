import PropTypes from 'prop-types'

const AdresseCommande = ({ className_div, form, Text, id, name, type, placeholder }) => {
    return (
        <div data-testid="adresse_commande" className={className_div}> 
            <label className="label_adresse" htmlFor={form}>{Text}</label><br /> 
            <input id={id} name={name} type={type} placeholder={placeholder} /> 
        </div>
    )

}

AdresseCommande.propTypes = {
    className_div : PropTypes.string,
    form : PropTypes.string,
    Text : PropTypes.string,
    id : PropTypes.string,
    name : PropTypes.string,
    type : PropTypes.string,
    placeholder : PropTypes.string,
}

export default AdresseCommande
