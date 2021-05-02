import Button from './Button'


const Picture = ( { url, desc } ) => {
    return (
        <div className="profilepicture">
            <div  className="picture">
                <img src= "https://stickeramoi.com/15518-large_default/sticker-toilette-homme.jpg" alt="logo homme"></img>
            </div>
        </div>
    )
}

export default Picture

//<Button color= { "grey" } text= { "Téléchargez une nouvelle photo" } onClick= { () => { window.prompt('Ajoutez votre url de photo') }}/>