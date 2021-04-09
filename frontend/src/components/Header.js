import PropTypes from 'prop-types'



const Header = ({title, headerclass}) => {  
    return (
        <header className={headerclass}>
            <h1>{title}</h1>            
        </header>
    )
}

Header.defaultProps = {
    title: 'Client Tracker',  //define a default title for the header
    headerclass : 'header'
}

Header.propTypes = {
   title: PropTypes.string.isRequired,  //force the type of the title to be a string and to be required
}

/* const headingStyle = {        //way to had CSS in js
    color : 'red', 
    backgroundColor : 'green',
} */

export default Header
