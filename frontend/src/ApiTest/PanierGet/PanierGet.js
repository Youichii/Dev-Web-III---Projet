import Axios from 'axios';

class PanierGet{
    api(){
        const identifiantCommande = '5';
        return Axios.get(`http://localhost:3001/api/panier/${identifiantCommande}`).then((response) => {
            return response.data;
        })
    }
}

export default PanierGet;