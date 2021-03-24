import PropTypes from 'prop-types'
import Button from './Button'



const Header = ({title, onAdd, showAdd}) => {  
    return (
        <header className='header'>
            <h1>{title}</h1> 
            <Button color={ showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />               
        </header>
    )
}

Header.defaultProps = {
    title: 'Client Tracker'  //define a default title for the header
}

Header.propTypes = {
   title: PropTypes.string.isRequired,  //force the type of the title to be a string and to be required
}

/* const headingStyle = {        //way to had CSS in js
    color : 'red', 
    backgroundColor : 'green',
} */

export default Header