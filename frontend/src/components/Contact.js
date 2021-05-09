const Contact = ( {Mon, Tue, Wen, Thu , Fri, Sat, Sun, mail, number, address} ) => {  
    return (   
        <div>
            <div className="schedule">
                <h2><u>Horaires</u></h2>
                <ul className="Days"> 
                    <li> Lundi :</li> 
                    <li> Mardi :</li> 
                    <li> Mercredi :</li> 
                    <li> Jeudi :</li> 
                    <li> Vendredi :</li> 
                    <li> Samedi :</li> 
                    <li> Dimanche :</li> 
                </ul> 
                <ul className="Hours">
                    <li>{ Mon }</li>
                    <li>{ Tue }</li>
                    <li>{ Wen }</li>
                    <li>{ Thu }</li>
                    <li>{ Fri }</li>
                    <li>{ Sat }</li>
                    <li>{ Sun }</li>
                </ul>
            </div>
                
            <div className="contact">
                <h2><u>Contact</u></h2><br></br>
                <p><i>Email</i> : {mail}</p>
                <p><i>Téléphone</i> : {number}</p> <br></br>
                <p>{ address }</p>
            </div>
        </div>

    )
}

Contact.defaultProps = {
    Mon : "Pas d'horaires",
    Tue : "Pas d'horaires",
    Wen : "Pas d'horaires",
    Thu : "Pas d'horaires",
    Fri : "Pas d'horaires",
    Sat : "Pas d'horaires",
    Sun : "Fermé",
    mail : "pas d'adresse mail",
    number : "Pas de téléphone",
    address : "Traverse d'Esope 4 , 1348 Louvain-la-Neuve, Belgique"

}

export default Contact