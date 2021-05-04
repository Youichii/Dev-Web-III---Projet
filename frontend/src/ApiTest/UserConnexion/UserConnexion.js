import Axios from 'axios';

class UserConnexion{
    api(){
        const mail = 'p.z@gmail.com' ;
        const pwd = 'rr' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response.data;
        })
    }
}

export default UserConnexion;