import Axios from 'axios';

class Hours{
    api(){
        return Axios.get(`http://localhost:3001/api/hours`).then((response) => {
            return response.data;
        })
    }
}

export default Hours;