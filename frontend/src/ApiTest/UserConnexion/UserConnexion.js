import Axios from 'axios';

class UserConnexion{
    test1(){
        const mail = 'p.z@gmail.com' ;
        const pwd = 'rr' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response;
        })
    }

    test2(){
        const mail = 'test' ;
        const pwd = 'rr' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response;
        })
    }

    test3(){
        const mail = 'p.z@gmail.com' ;
        const pwd = 'test' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response;
        })
    }

    test4(){
        const mail = '' ;
        const pwd = 'test' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response;
        })
    }

    test5(){
        const mail = 'test' ;
        const pwd = '' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response;
        })
    }

    test6(){
        const mail = '' ;
        const pwd = '' ;
        return Axios.get(`http://localhost:3001/api/users/${mail}/${pwd}`).then((response) => {
            return response;
        })
    }
}

export default UserConnexion;