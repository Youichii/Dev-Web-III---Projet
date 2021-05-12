import Axios from 'axios';

class GenreGet{
    api(){
        return Axios.get(`http://localhost:3001/apitest/genre-stat`).then((response) => {
            return response;
        })
    }
}

export default GenreGet;