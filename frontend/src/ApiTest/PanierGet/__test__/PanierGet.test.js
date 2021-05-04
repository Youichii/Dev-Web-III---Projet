import PanierGet from '../PanierGet';

it("test API PanierGet valeur existante", async function () {
    const response = new PanierGet();
    var reponse = await response.test1();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification contenu
    expect(data).toEqual([{"IdCommande": 5,"IdProduit": 18,"Produit": "Filet de Merlu","Quantite": 1}]);
})

it("test API PanierGet valeur inexistante", async function () {
    const response = new PanierGet();
    var reponse = await response.test2();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification du contenu
    expect(data.length).toEqual(0);
})

it("test API PanierGet valeur vide", async function () {
    const response = new PanierGet();
    var reponse = await response.test3()
    .catch(err => {
        //Vérification Status
        expect(err.response.status).toEqual(404);
    });
})