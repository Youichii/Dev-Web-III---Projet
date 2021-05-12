import OrderUser from '../OrderUser';

it("test API OrderUser valeur existante", async function () {
    const response = new OrderUser();
    var reponse = await response.test1();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification contenu
    expect(data[0]).toEqual({"IdCommande": 5,"IdProduit": 18,"Prix": 10.9,"Produit": "Filet de Merlu","Quantite": 1});
})

it("test API OrderUser valeur inexistante", async function () {
    const response = new OrderUser();
    var reponse = await response.test2();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification contenu
    expect(data).toEqual([]);
})

it("test API OrderUser valeur vide", async function () {
    const response = new OrderUser();
    var reponse = await response.test3()
    .catch(err => {
        //Vérification Status
        expect(err.response.status).toEqual(404);
    });
})