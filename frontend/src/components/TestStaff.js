import PropTypes from 'prop-types'

const TestStaff = ({ informations,type_couleur,bg_bouton, type_actuel, type_suivant, onMouseOver, onMouseLeave, onClick_panier, onClick_ok }) => {
    return (
        <div className="i_commande c_commande" id={informations.IdClient} onMouseOver={() => onMouseOver(informations.IdClient)} onMouseLeave={() => onMouseLeave(informations.IdClient, type_couleur)}>
                <div className="c_sans_bouton i_sans_bouton" onClick={() => onClick_panier(informations, type_actuel)}>
                    <div className={`i_nom ${type_couleur}`}>{informations.Prenom}</div> 
                    <div className={`i_contact ${type_couleur}`}>{informations.Gsm}</div> 
                    <div className={`i_prix_commande ${type_couleur}`}>{informations.Prix}</div> 
                    <div className={`i_heure_prevue ${type_couleur}`}>{informations.HLivree}</div>
                </div>
                <div className={`i_div_bouton ${bg_bouton}`}>
                    <button className="i_bouton_suivant" onClick={() => onClick_ok(informations.IdCommande, type_suivant)}>OK</button>
                </div> 
            </div>
    )
    /*return (
        <button data-testid="button" onClick={onClick} style= {{ backgroundColor : color, }} className='btn'>{text}</button>
    )*/
}

/*TestStaff.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

TestStaff.propTypes = {
    informations : PropTypes.string,
    type_couleur : PropTypes.string,
    bg_bouton : PropTypes.string,
    type_actuel : PropTypes.string,
    type_suivant : PropTypes.string,

    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick_panier: PropTypes.func,
    onClick_ok: PropTypes.func
}

export default TestStaff
