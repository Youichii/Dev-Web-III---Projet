import Axios from 'axios';

class OrderPut{
    api(){
        const idCommande = '4';
        const type_commande = 'ENC';
        return Axios.put(`http://localhost:3001/api/orders`, {commande : idCommande, type: type_commande}).then((response) => {
            return response.data;
        })
    }
}

export default OrderPut;