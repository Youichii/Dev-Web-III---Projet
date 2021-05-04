import React from 'react';
import Axios from 'axios'

class ClientApi{
    api()
    {
        const clientName = '3'
        return Axios.get(`http://localhost:3001/api/get/${clientName}`).then((response) => {
            return response.data
        })
    }

}

export default ClientApi;