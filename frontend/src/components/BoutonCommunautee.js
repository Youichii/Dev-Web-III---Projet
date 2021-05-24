
const BoutonCommunautee = ({ className, id, style, onClick, value }) => {
    return (
        <button className={className} id = {id} onClick={onClick} style={style} >{value}</button>
    )

}

/*BoutonPanier.defaultProps = {
    color: 'steelblue',
    text : 'Hello'
}*/

// BoutonPanier.propTypes = {
//     className : PropTypes.string,
//     id_div : PropTypes.string,
//     id_elem : PropTypes.string,
//     name : PropTypes.string,
//     value : PropTypes.string,
//     onClick : PropTypes.func,
// }

export default BoutonCommunautee