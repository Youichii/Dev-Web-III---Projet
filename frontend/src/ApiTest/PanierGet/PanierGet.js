import Axios from 'axios';

class PanierGet{
    test1(){
        const utilisateur = '10';
        return Axios.get(`http://localhost:3001/apitest/order/user/${utilisateur}`).then((response) => {
            return response;
        })
    }

    test2(){
        const utilisateur = '10000000000';
        return Axios.get(`http://localhost:3001/apitest/order/user/${utilisateur}`).then((response) => {
            return response;
        })
    }

    test3(){
        const utilisateur = '';
        return Axios.get(`http://localhost:3001/apitest/order/user/${utilisateur}`).then((response) => {
            return response;
        })
    }
}

export default PanierGet;