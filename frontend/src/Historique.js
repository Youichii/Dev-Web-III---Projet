const Historique = () => {
    let commande = [
        {name:"ClemAntine.S" , article:"Tenders x 2", prix:5.00, date:"12/01/2021"},
        {name:"Orélien.B" , article:"Nuggets x 5", prix:15.55, date:"04/03/2022"},
        {name:"NoL.K" , article:"Chick N Fish", prix:12.55, date:"12/01/2021"},
        {name:"Cécile", article:"Frites", prix:12.50, date:"13/10/2030" }];

    let tableMois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]
    let mois = []
    let annee = []
    return (
        <div>
            {commande.map(panier => 
                
                
            )}
            
                <fieldset className="annee" >
                    <details>
                        <summary id={(panier.date).slice(6,10)}>{panier.date.slice(6,10)}</summary>
                            <details>
                                <summary id={panier.date.slice(3,5)}>{panier.date.slice(3,5)}</summary>
                            </details>
                    </details>
                    
                </fieldset>   
            
            
        </div>


    )


}
export default Historique;