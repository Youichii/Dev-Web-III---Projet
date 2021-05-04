const HalfDiv = ({divpos, link, title}) => {  
    return (
       
        <div data-testid="halfdiv" className={ divpos }> 
            {link}             
        </div>
    )
}

HalfDiv.defaultProps = {
    divpos: 'divleft',  //define a default title for the header
    link: '<div></div>'
}


export default HalfDiv

