import Axios from 'axios';

class OrderDelete{
    api(){
        const id_commande = '3';
        return Axios.delete(`http://localhost:3001/api/orders`, {commande : id_commande}).then((response) => {
            return response.data;
        })
    }
}

export default OrderDelete;