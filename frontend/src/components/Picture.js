import picture from '../img/profile.jpg'
import Button from './Button'


const Picture = ( { url, desc } ) => {
    return (
        <div className="profilepicture">
            <div className="picture">
                <img src= { url } alt= { desc }></img>
            </div>
            <div className="picbutton">
                <Button color= { "grey" } text= { "Téléchargez une nouvelle photo" } onClick= { () => { window.prompt('Ajoutez votre url de photo') }}/>
            </div>
        </div>
    )
}

Picture.defaultProps = {
    url : picture,
    desc : "cat picture",
}

export default Picture