import BarreLateraleGauche from "./BarreLateraleGauche";
import BarreLateraleDroite from "./BarreLateraleDroite";
import Carte from "./Carte";

const Menu = () => {
    require("./css/carte.css")
    
    return ( 
        <div className = "Menu"> 
            <BarreLateraleGauche/>
            <Carte />
            <BarreLateraleDroite />
        </div>
    )
}
export default Menu; 