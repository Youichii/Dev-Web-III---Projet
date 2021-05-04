import PanierGet from '../PanierGet';

it("testing API PanierGet", async function () {
    const response = new PanierGet();
    var data = await response.api();

    expect(data).toEqual([{"IdCommande": 5,"IdProduit": 18,"Produit": "Filet de Merlu","Quantite": 1}]);
})