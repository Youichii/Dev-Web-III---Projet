import Button from './Button'


const Picture = ( { url, desc } ) => {
    return (
        <div className="profilepicture">
            <div  className="picture">
                <img src= 'https://images.creativemarket.com/0.1.0/ps/6716324/580/387/m2/fpnw/wm0/logo-file-40-.jpg?1563763079&s=f60e3be158acc07526fe13b3862e6751' alt="logo"></img>
            </div>
        </div>
    )
}

export default Picture

//<Button color= { "grey" } text= { "Téléchargez une nouvelle photo" } onClick= { () => { window.prompt('Ajoutez votre url de photo') }}/>