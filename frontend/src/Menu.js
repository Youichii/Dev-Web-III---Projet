import Sidebareleft from "./Sidebareleft";
import Sidebareright from "./Sidebareright";
import Carte from "./Carte";
import CadrePanier from "./CadrePanier.js";

const Menu = () => {
    require("./carte.css")
    
    return ( 
        <div className = "Menu"> 
            <Sidebareleft/>
            <Carte />
            <CadrePanier/>
            <Sidebareright />
        </div>
    )
}
export default Menu; 