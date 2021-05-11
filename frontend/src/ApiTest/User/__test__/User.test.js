import User from '../User';

it("test API User valeur existante", async function () {
    const response = new User();
    var reponse = await response.test1();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification contenu
    expect(data).toEqual([{"Numero": "10","Rue": "Rue afz","Ville": "Bruxelles","Zip": 3000}]);
})

it("test API User valeur inexistante", async function () {
    const response = new User();
    var reponse = await response.test2();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification du contenu
    expect(data.length).toEqual(0);
})

it("test API User valeur vide", async function () {
    const response = new User();
    var reponse = await response.test3()
    .catch(err => {
        //Vérification Status
        expect(err.response.status).toEqual(404);
    });
})