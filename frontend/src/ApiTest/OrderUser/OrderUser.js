import Axios from 'axios';

class OrderUser{
    api(){
        const identifiantClient = '5';
        return Axios.get(`http://localhost:3001/api/orders/users/${identifiantClient}`).then((response) => {
            return response.data;
        })
    }
}

export default OrderUser;