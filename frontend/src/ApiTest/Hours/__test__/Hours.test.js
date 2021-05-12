import Hours from '../Hours';

it("test API Hours", async function () {
    const response = new Hours();
    var reponse = await response.api();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");
})
