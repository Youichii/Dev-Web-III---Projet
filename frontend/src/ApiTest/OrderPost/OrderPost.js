import Axios from 'axios';

class OrderPost{
    api(){
        const id_commande = '3';
        const typeCommande = '3';
        const commentaire_client = '3';
        const heure_selectionnee = '3';
        const rue = '3';
        const numero = '3';
        const postal = '3';
        const ville = '3';
        return Axios.post(`http://localhost:3001/api/orders`, {commande : id_commande, methode : typeCommande, commentaire : commentaire_client, hSelec : heure_selectionnee, rue : rue, numero : numero, postal : postal, ville : ville}).then((response) => {
            return response.data;
        })
    }
}

export default OrderPost;