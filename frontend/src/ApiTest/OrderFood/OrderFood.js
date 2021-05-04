import Axios from 'axios';

class OrderFood{
    api(){
        const id_commande = '3';
        const id_produit = '3';
        const nouvelle_qtite = '3';
        return Axios.put(`http://localhost:3001/api/orders/foods`, { idCommande : id_commande, idProduit : id_produit, quantite : nouvelle_qtite}).then((response) => {
            return response.data;
        })
    }
}

export default OrderFood;