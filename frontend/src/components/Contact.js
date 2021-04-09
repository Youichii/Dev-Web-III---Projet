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
    Mon : "8h00 - 16h30",
    Tue : "8h00 - 16h30",
    Wen : "8h00 - 12h30",
    Thu : "8h00 - 16h30",
    Fri : "8h00 - 16h30",
    Sat : "8h00 - 16h30",
    Sun : "Fermé",
    mail : "pas d'adresse mail",
    number : "+32495757504",
    address : "Traverse d'Esope 4 , 1348 Louvain-la-Neuve, Belgique"

}

export default Contact