import Axios from 'axios';

class PanierGet{
    test1(){
        const identifiantCommande = '5';
        return Axios.get(`http://localhost:3001/api/panier/${identifiantCommande}`).then((response) => {
            return response;
        })
    }

    test2(){
        const identifiantCommande = '10000000000';
        return Axios.get(`http://localhost:3001/api/panier/${identifiantCommande}`).then((response) => {
            return response;
        })
    }

    test3(){
        const identifiantCommande = '';
        return Axios.get(`http://localhost:3001/api/panier/${identifiantCommande}`).then((response) => {
            return response;
        })
    }
}

export default PanierGet;