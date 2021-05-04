import OrderUser from '../OrderUser';

it("testing API OrderUser", async function () {
    const response = new OrderUser();
    var data = await response.api();

    expect(data).toEqual([{"IdCommande": 5,"IdProduit": 18,"Prix": 10.9,"Produit": "Filet de Merlu","Quantite": 1}]);
})