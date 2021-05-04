import OrderGet from '../OrderGet';

it("testing API OrderGet", async function () {
    const response = new OrderGet();
    var data = await response.api();

    expect(data[0]).toEqual({"Commentaire": null,"DateCom": "2021-05-04T09:47:07.000Z","Gsm": "+32468571325","HLivree": "18:00","IdClient": 7,"IdCommande": 1,
    "IdEtat": "PAN","IdMethode": "LIV","Numero": "63","Prenom": "Marie","Prix": 409.3,"Rue": "Rue amz","Ville": "Bruge","Zip": 1000});
})