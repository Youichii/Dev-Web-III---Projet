import Axios from 'axios';

class User{
    test1(){
        const identifiantClient = '3';
        return Axios.get(`http://localhost:3001/apitest/users/${identifiantClient}/address`).then((response) => {
            return response;
        })
    }

    test2(){
        const identifiantClient = '10000000000';
        return Axios.get(`http://localhost:3001/apitest/users/${identifiantClient}/address`).then((response) => {
            return response;
        })
    }

    test3(){
        const identifiantClient = '';
        return Axios.get(`http://localhost:3001/apitest/users/${identifiantClient}/address`).then((response) => {
            return response;
        })
    }
}

export default User;