import logo from "./img/logo.jpg"

const BannerPatron = () => {
    require('./css/bannerPP.css')
    return(
        <nav className="navbar">                    
            <li><a href="/" >Statistiques</a></li>
            <li><a href="/" id= "Inf">Modification</a></li>
            <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
            <li><a href="/" id="Men">Historique</a></li>
            <li><a href="/" id="Pan">Communauté</a></li>
        </nav>
    )
}
export default BannerPatron; 
            