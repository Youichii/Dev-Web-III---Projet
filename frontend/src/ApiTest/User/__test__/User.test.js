import User from '../User';

it("testing API User", async function () {
    const response = new User();
    var data = await response.api();

    expect(data).toEqual([{"Numero": "10","Rue": "Rue afz","Ville": "Bruxelles","Zip": 3000}]);
})