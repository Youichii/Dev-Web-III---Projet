import Axios from 'axios';

class OrderUser{
    test1(){
        const identifiantCommande = '5';
        return Axios.get(`http://localhost:3001/apitest/orders/${identifiantCommande}`).then((response) => {
            return response;
        })
    }

    test2() {
        const identifiantCommande = '1000000000000';
        return Axios.get(`http://localhost:3001/apitest/orders/${identifiantCommande}`).then((response) => {
            return response;
        })
    }

    test3() {
        const identifiantCommande = '';
        return Axios.get(`http://localhost:3001/apitest/orders/${identifiantCommande}`).then((response) => {
            return response;
        })
    }
}

export default OrderUser;