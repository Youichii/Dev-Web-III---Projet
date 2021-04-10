import picture from '../img/profile.jpg'

const Picture = ( { url, desc } ) => {
    return (
        <div className="picture">
            <img src= { url } alt= { desc }></img>
        </div>
    )
}

Picture.defaultProps = {
    url : picture,
    desc : "cat picture",
}

export default Picture