import Axios from 'axios';

class UserPost{
    api(){
         var myInit = {name : "nom_testAPI",
                    firstname : "prenom_testAPI",
                    birthday : "anniversaire_testAPI",
                    phone : "phone_testAPI",
                    mail : "mail_testAPI",
                    gender : "f",
                    pwd : "mdp_testAPI",
                    rue : "rue_testAPI",
                    numero : "numero_testAPI",
                    postal : "0000",
                    ville : "ville_testAPI",
                    nwsletter : "0"}

        return Axios.post(`http://localhost:3001/api/users`, myInit).then((response) => {
            return response.data;
        })
    }
}

export default UserPost;