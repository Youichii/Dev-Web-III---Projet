import Axios from 'axios';

class Hours{
    api(){
        return Axios.get(`http://localhost:3001/apitest/hours`).then((response) => {
            return response;
        })
    }
}

export default Hours;