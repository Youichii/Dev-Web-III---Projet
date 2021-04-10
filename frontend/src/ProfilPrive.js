import Header from './components/Header'
import Picture from './components/Picture'


const ProfilPrive = () => {
    return (
        <div className="profilPrive">
            <Header title= { "Votre profil :" } headerclass="profilheader"  />
            
            <Picture /> 
            <div className="privateinfo">
                    
                <div className="gauche">
                    Aurélien
                </div>
                
                <div className="droite">
                    Chaumont-Gistoux
                </div>       
            </div>            
        </div>
    )
};

export default ProfilPrive