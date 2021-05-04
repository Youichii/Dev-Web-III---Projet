import Axios from 'axios';

class OrderUser{
    test1(){
        const identifiantClient = '5';
        return Axios.get(`http://localhost:3001/api/orders/users/${identifiantClient}`).then((response) => {
            return response;
        })
    }

    test2() {
        const identifiantClient = '1000';
        return Axios.get(`http://localhost:3001/api/orders/users/${identifiantClient}`).then((response) => {
            return response;
        })
    }

    test3() {
        const identifiantClient = '';
        return Axios.get(`http://localhost:3001/api/orders/users/${identifiantClient}`).then((response) => {
            return response;
        })
    }
}

export default OrderUser;