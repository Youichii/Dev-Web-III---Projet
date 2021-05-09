import Axios from 'axios';

class GenreGet{
    api(){
        return Axios.get(`http://localhost:3000/api/genre-stat`).then((response) => {
            return response;
        })
    }
}

export default GenreGet;