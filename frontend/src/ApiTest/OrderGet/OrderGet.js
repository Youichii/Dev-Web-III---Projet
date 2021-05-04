import Axios from 'axios';

class OrderGet{
    api(){
        return Axios.get(`http://localhost:3001/api/orders`).then((response) => {
            return response ;
        })
    }
    
}

export default OrderGet;