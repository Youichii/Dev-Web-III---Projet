import Header from './components/Header'
import Picture from './components/Picture'

const ProfilPrive = () => {
    return (
        <div className="profilPrive">
            <Header title= { "Votre profil :" } headerclass="profilheader" />
            <Picture />
        </div>
    )
};

export default ProfilPrive