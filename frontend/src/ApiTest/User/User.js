import Axios from 'axios';

class User{
    api(){
        const identifiantClient = '3';
        return Axios.get(`http://localhost:3001/api/users/${identifiantClient}`).then((response) => {
            return response.data;
        })
    }
}

export default User;