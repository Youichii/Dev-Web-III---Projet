import logo from "./img/logo_banner.jpg"

const Banner = () => {
    return(
        <nav className="navbar">                    
            <li><a href="/" >Accueil</a></li>
            <li><a href="/" id= "Inf">Informations</a></li>
            <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
            <li><a href="/" id="Men">Menu</a></li>
            <li><a href="/" id="Pan">Panier</a></li>
        </nav>
    )
}
export default Banner; 
            