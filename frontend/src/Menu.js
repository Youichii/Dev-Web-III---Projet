import Sidebareleft from "./Sidebareleft";
import Sidebareright from "./Sidebareright";
import Carte from "./Carte";

const Menu = () => {
    require("./css/carte.css")
    
    return ( 
        <div className = "Menu"> 
            <Sidebareleft/>
            <Carte />
            <Sidebareright />
        </div>
    )
}
export default Menu; 